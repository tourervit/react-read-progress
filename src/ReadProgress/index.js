import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const ReadProgress = ({ children }) => {
  const [width, setWidth] = useState(0);
  const [toScroll, setToScroll] = useState(null);
  const kef = 100 / toScroll;

  const measuredRef = useCallback(node => {
    if (node != null) {
      const nodeCoords = node.getBoundingClientRect();
      setToScroll(nodeCoords.height - window.innerHeight + node.offsetTop);
    }
  });

  const handleScroll = () => {
    setWidth(Math.min(Math.floor(window.scrollY * kef), 100));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div ref={measuredRef}>
      <ProgressBar width={width} />
      {children}
    </div>
  );
};

export default ReadProgress;

const ProgressBar = styled.div`
  transition: all 0.3s linear;
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
