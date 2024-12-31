import React, { FC, useState } from "react";

interface UpdateModelProps {
    onConfirm: (value:string) => void
     onCancel:() => void
     initialValue:string
}
const UpdateModel:FC<UpdateModelProps> = ({ onConfirm, onCancel, initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

  const handleConfirm = () => {
    if (onConfirm) onConfirm(value);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[300px] shadow-md">
        <h3 className="text-lg font-semibold mb-4">Enter Value</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
          placeholder="Type here..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModel;
