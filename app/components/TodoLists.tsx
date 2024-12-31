"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTodoContext } from "../context/GlobalContent";
import {
  EllipsisVertical,
  Square,
  SquareCheck,
} from "lucide-react";
import Dropdown from "./Dropdown";
import TodoShimmer from "./TodoShimmer";

const TodoLists = () => {
  const { todos,loading } = useTodoContext();
  const [openIndex, setOpenIndex] = useState<null | string>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleOpen = (id: string) => {
  
    const findItem = todos.find((item) => item._id === id);
    if (findItem?._id === id) {
      setOpenIndex(openIndex === id ? null : id);
    }
  };
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpenIndex(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleClose = () => {
    setOpenIndex(null)
  }
  return (
    <ul className="mt-3 p-3 h-[400px] overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200 rounded-md">
      {
     loading  ? <TodoShimmer /> : todos.length > 0 ? (
        <>
          {todos.map((item) => (
            <li
              key={item._id}
              className={`p-3 relative rounded-md border mb-4 border-gray-300 flex justify-between items-center ${
                item.completed
                  ? "line-through text-gray-400 pointer-events-none"
                  : ""
              }`}>
              <div className="flex items-center cursor-pointer">
                {item.completed ? (
                  <SquareCheck strokeWidth={2} className="text-purple-400" />
                ) : (
                  <Square strokeWidth={2} className="text-purple-400" />
                )}
                <p className="ml-4">{item.text}</p>
              </div>
              <EllipsisVertical
                onClick={() => handleOpen(item._id)}
                className="cursor-pointer"
              />
              {openIndex === item._id && (
                <Dropdown ref={dropdownRef} item={item} onClose={ handleClose}  />
              )}
            </li>
          ))}
        </>
      ) : (
        <p className="mt-3 text-2xl">No task list found</p>
      )}
    </ul>
  );
};

export default TodoLists;
