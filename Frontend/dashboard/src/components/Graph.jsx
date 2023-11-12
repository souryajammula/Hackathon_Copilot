import React from 'react';
import "../App.css"
const Graph = ({ subheading }) => {
  // Implement your graph rendering logic here based on the subheading.
  // For now, display a placeholder image.
  return (
    <div className="graph">
      <img
        src="path_to_dummy_graph.png"
        alt={`Graph for ${subheading}`}
      />
    </div>
  );
};

export default Graph;
