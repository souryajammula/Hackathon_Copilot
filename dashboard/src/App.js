import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Graph from './components/Graph'; // Import the Graph component
import "./App.css";
import ChatGPT from './components/chatGPT';

function App() {
  const [draggedSubheading, setDraggedSubheading] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const subheading = event.dataTransfer.getData('text/plain');
    setDraggedSubheading(subheading);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const [visible, setVisible] = React.useState(false);
  function click(e) { e.preventDefault(); setVisible(true); }
//hi just commenting
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content"
          onDrop={handleDrop}
          onDragOver={allowDrop}
        >
          {draggedSubheading && <Graph subheading={draggedSubheading} />}
        </div>
      </div>
      <footer className="footer">
      {visible && (<ChatGPT />) } <img className="gpt" onClick={(event) => { click(event) }} src="C:\Users\soury\OneDrive\Desktop\dashboard\public\gpt1.png" alt="gpt"/>
      </footer>
    </div>
  );
}

export default App;
