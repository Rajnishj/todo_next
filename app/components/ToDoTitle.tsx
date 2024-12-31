import { Pencil } from "lucide-react";

function ToDoTitle() {
    return (
      <div className="p-3 flex items-center gap-3">
        <div className="w-12 text-white text-2xl rounded-md p-3 bg-blue-600">
          <Pencil />
        </div>
  
        <div className="font-bold text-4xl flex gap-1">
          <div className="text-blue-600">Task</div>
          <div>Master</div>
        </div>
      </div>
    );
  }
  
  export default ToDoTitle