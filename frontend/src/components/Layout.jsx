import React from 'react';
import Navbar from './ui/Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <Navbar />
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">{children}</main>
    <Footer />
  </div>
);

export default Layout; 