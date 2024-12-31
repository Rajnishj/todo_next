import React from "react";

const TodoShimmer = () => {
  return Array.from({ length: 7 }, (_,i) => (
    <li key={i} className="p-3 relative rounded-md border mb-4 border-gray-300 flex justify-between items-center">
      <div  className="flex items-center">
      <div className="h-4 w-6 bg-gray-300 shimmer rounded-md"></div>
        {/* Shimmer effect for text */}
        <div className="ml-4 h-4 w-52 bg-gray-300 shimmer  rounded-md"></div>
      </div>
      {/* Shimmer effect for the ellipsis */}
      <div className="h-4 w-6 bg-gray-300 shimmer rounded-md"></div>
    </li>
  ));
};

export default TodoShimmer;
