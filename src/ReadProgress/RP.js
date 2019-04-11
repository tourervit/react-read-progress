import React from 'react';
import styled from 'styled-components';
import throttle from 'lodash.throttle';

class RP extends React.Component {
  state = {
    width: 0,
  };
  component = React.createRef();

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 200));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { component } = this;
    const scrollablePart = component.clientHeight + component.offsetTop - window.innerHeight;
    const kef = 100 / scrollablePart;
    const width =
      (window.scrollY +
        window.innerHeight -
        (component.clientHeight + component.offsetTop) +
        scrollablePart) *
      kef;
    this.setState({ width: Math.floor(width) });
  };

  render() {
    const { width } = this.state;
    return (
      <div ref={current => (this.component = current)}>
        <ProgressBar width={width} />
        {this.props.children}
      </div>
    );
  }
}
export default RP;

const ProgressBar = styled.div`
  transition: all 0.4s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: ${props => props.width}%;
  background: linear-gradient(to right, pink, magenta);

  ::before {
    display: block;
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    transition: opacity 0.8s;
    opacity: ${props => (props.width >= 100 ? 1 : 0)};
    background: linear-gradient(to right, pink, greenyellow);
  }
`;
