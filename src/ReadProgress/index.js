import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const ReadProgress = ({
  children,
  colors = {
    startColor: '#64B5F6',
    endColor: '#2196F3',
    startColorComplete: '#4CAF50',
    endColorComplete: '#00E676',
  },
  height = 3,
}) => {
  const [width, setWidth] = useState(0);
  const [toScroll, setToScroll] = useState(null);
  const kef = Math.round((100 / toScroll) * 100) / 100;

  const measuredRef = useCallback(node => {
    if (node != null) {
      const nodeCoords = node.getBoundingClientRect();
      setToScroll(nodeCoords.height - window.innerHeight + node.offsetTop);
    }
  }, []);

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
      <ProgressBar width={width} colors={colors} height={height} />
      {children}
    </div>
  );
};

export default ReadProgress;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => props.height}px;
  width: ${props => props.width}%;
  background: ${({ colors }) =>
    `linear-gradient(to right, ${colors.startColor}, ${colors.endColor})`};
  transition: all 0.3s linear;

  ::before {
    display: block;
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    height: ${props => props.height}px;
    width: 100%;
    opacity: ${props => (props.width === 100 ? 1 : 0)};
    background: ${({ colors }) =>
      `linear-gradient(to right, ${colors.startColorComplete}, ${colors.endColorComplete})`};
    transition: opacity 0.8s;
  }
`;
