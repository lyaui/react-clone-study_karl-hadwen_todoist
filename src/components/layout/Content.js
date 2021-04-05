import React from 'react';
import Sidebar from './SideBar';
import Tasks from '../Tasks';

export const Content = () => {
  return (
    <section>
      <Sidebar></Sidebar>
      <Tasks></Tasks>
    </section>
  );
};
