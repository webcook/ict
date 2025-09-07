import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MainContent from '../MainContent/MainContent';
import CreateNoteModal from '../Modals/CreateNoteModal';
import TagModal from '../Modals/TagModal';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Sidebar />
      <MainContent />
      <CreateNoteModal />
      <TagModal />
    </div>
  );
};

export default Layout;
