import React from 'react';

const Header = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 400,
      background: '#111',
      fontSize: '5vw',
    }}
  >
    <span
      style={{
        color: '#999',
        borderRadius: 10,
        background: '#151515',
        display: 'block',
        padding: '10px 20px',
      }}
    >
      <i style={{ color: '#555', position: 'relative', bottom: '1px' }}>const </i>
      <span style={{ color: '#F50057' }}>ReactReadProgress </span>
      <span style={{ color: '#FFD54F' }}>=</span> () <span style={{ color: '#FFD54F' }}>=> </span>
      {'{ }'};
    </span>
  </div>
);

export default Header;
