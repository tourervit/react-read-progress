import React from 'react';

export const withReadProgress = WrappedComponent => {
  return class extends React.Component {
    state = {
      width: 0,
    };

    debounce = (func, wait, immediate) => {
      let timeout;
      return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    handleScroll = e => {
      const scrollablePart =
        this.component.clientHeight + this.component.offsetTop - window.innerHeight;
      const kef = 100 / scrollablePart;
      const width =
        (window.scrollY +
          window.innerHeight -
          (this.component.clientHeight + this.component.offsetTop) +
          scrollablePart) *
        kef;
      this.setState({ width });
    };
    componentDidMount() {
      window.addEventListener('scroll', this.debounce(this.handleScroll, 20));
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
      const { color, ...props } = this.props;
      return (
        <div
          ref={outer => {
            this.component = outer;
          }}
        >
          <div
            style={{
              transition: 'all .5s ease',
              position: 'fixed',
              top: 0,
              left: 0,

              width: `${this.state.width}%`,
              height: '4px',
              background:
                this.state.width === 100
                  ? 'linear-gradient(to right, white, white)'
                  : 'linear-gradient(to right, pink, magenta)',
            }}
          />
          <WrappedComponent {...props} />
        </div>
      );
    }
  };
};
