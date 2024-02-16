import React from 'react';
import Header from './Header';
import Nav from './Nav';
function Layout({children}) {
  return (
    <>
      <Header/>
      <Nav/>
      {children}
    </>
  );
}

export default Layout;