import React, { useState } from 'react';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import "../App.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDragStart = (event, subheading) => {
    event.dataTransfer.setData('text/plain', subheading);
  };

  return (
    <aside className="sidebar">
      <h2 className="Macroeconomic Table">
        <button className="collapsible-button" onClick={toggleCollapse}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleDown />}
        </button>
        Macroeconomic Table
      </h2>
      <ul className={`subheadings ${isCollapsed ? 'collapsed' : ''}`}>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          GDP Growth Rage
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 2')}
          className="draggable-subheading"
        >
          GDP Current USD
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 3')}
          className="draggable-subheading"
        >
          Current Account Balance (% of GDP)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 4')}
          className="draggable-subheading"
        >
          Foreign direct investment, net (BoP, current US$)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 5')}
          className="draggable-subheading"
        >
         Foreign direct investment, net outflows (BoP, current US$) 
         </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 6')}
          className="draggable-subheading"
        >
          Foreign direct investment, net inflows (% of GDP)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 7')}
          className="draggable-subheading"
        >
          FDI-NetOutflows(%ofGDP)
        </li>
        {/* Add more draggable subheadings here */}
      </ul>
      <h2 className="Agricultural Table">
        <button className="collapsible-button" onClick={toggleCollapse}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleDown />}
        </button>
        Agricultural Table
      </h2>
      <ul className={`subheadings ${isCollapsed ? 'collapsed' : ''}`}>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Agricultural Contribution (% GDP)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Manufacturing(%GDP)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Agriculture, forestry, and fishing, value added (annual % growth)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Fertilizer consumption (kilograms per hectare of arable land)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Fertilizer consumption (% of fertilizer production)
        </li>


        </ul>
        <h2 className="Debt Table">
        <button className="collapsible-button" onClick={toggleCollapse}>
          {isCollapsed ? <FaAngleRight /> : <FaAngleDown />}
        </button>
        Debt Table
      </h2>
      <ul className={`subheadings ${isCollapsed ? 'collapsed' : ''}`}>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Total reserves in months of imports
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Total reserves (includes gold, current US$)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Total reserves (% of total external debt)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Debt service
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          Total debt service (% of GNI)
        </li>
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, 'Subheading 1')}
          className="draggable-subheading"
        >
          DGNI (current US$)
        </li>
        </ul>
        
      

      
    </aside>
  );
};

export default Sidebar;
