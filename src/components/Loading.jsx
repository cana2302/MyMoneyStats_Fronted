import React, { useState, useEffect } from 'react';

const LoadingDots = ({ isLoading }) => {
  const [dots, setDots] = useState(0);
  
  useEffect(() => {
  if (isLoading) {
  const interval = setInterval(() => {
  setDots((prevDots) => (prevDots + 1) % 4);
  }, 500); // 0.5 segundos por punto
  return () => clearInterval(interval);
  }
}, [isLoading]);

if (!isLoading) return null;

return (
  <div style={{textAlign: 'center'}}>
    <h3>Loading{'.'.repeat(dots)}</h3>
  </div>
);

};

export default LoadingDots;

/*
fontWeight: 'bold'
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)'
*/