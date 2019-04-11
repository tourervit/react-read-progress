import React from 'react';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import RP from '../ReadProgress/RP';

const App = () => (
  <>
    <Header />
    <RP>
      <Content />
    </RP>
    <Footer />
  </>
);

export default App;
