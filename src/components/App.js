import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddProgressBar from '../ReadProgress';

const colors = {
  startColor: '#F48FB1',
  endColor: '#D81B60',
  startColorComplete: '#EEFF41',
  endColorComplete: '#B2FF59',
};

const height = 5;

const App = () => (
  <>
    <Header />
    <AddProgressBar colors={colors} height={height}>
      <Content />
    </AddProgressBar>
    <Footer />
  </>
);

export default App;
