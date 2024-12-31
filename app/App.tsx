import React from "react";
import ToDoTitle from "./components/ToDoTitle";
import AddTaskbar from "./components/AddTaskbar";
import TodoLists from "./components/TodoLists";
import Footer from "./components/Footer";
import connectToDB from "./libs/mongodb";

const App = () => {
  connectToDB()
  return (
    <div className="w-[90%] sm:w-[90%] md:w-[70%] lg:w-[35%] h-[70%] bg-white p-4 rounded-xl">
      <ToDoTitle />
      <AddTaskbar />
      <TodoLists />
      <Footer />
    </div>
  );
};

export default App;
