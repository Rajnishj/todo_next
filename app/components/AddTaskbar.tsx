"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTodoContext } from "../context/GlobalContent";
import toast from "react-hot-toast";

const AddTaskbar = () => {
  const [inputText, setInputText] = useState("");
  const { todos, setTodos } = useTodoContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputText.length < 3) {
      toast.error("Please enter at least 3 characters to add the todo.", {
        duration: 2000,
        position: "top-center",
      });
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputText }),
        });
        const data = await res.json();
        if (data.message) {
          setTodos([
            ...todos,
            data.todo,
          ]);
          setInputText("");
          inputRef?.current?.focus();
          toast.success(data.message, {
            duration: 2000,
            position: "top-center",
          });
        }else{
          toast.error(data.error, {
            duration: 2000,
            position: "top-center",
          });
          setInputText("");
          inputRef?.current?.focus();
        }
      } catch (error: any) {
        toast.error(error.message, {
          duration: 2000,
          position: "top-center",
        });
      }
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <form onSubmit={handleSubmit} className="mt-3 mb-3">
      <input
        ref={inputRef}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-[65%] sm:w-[65%] md:w-[60%] lg:w-[75%] border border-gray-300 rounded-full p-4"
        placeholder="Choose a name..."
      />
      <button
        type="submit"
        className="w-[30%] sm:w-[30%] md:w-[20%] lg:w-[20%] text-white rounded-full ml-3 bg-blue-600 p-4">
        Add a Task
      </button>
    </form>
  );
};

export default AddTaskbar;
