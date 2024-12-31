"use client";
import React from "react";
import { useTodoContext } from "../context/GlobalContent";
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

const Footer = () => {
  const { count, setTodos } = useTodoContext();
  const deleteTodoModel = () => {
    toast(
      (t: { id: string | undefined }) => (
        <div className="flex flex-col items-center mt-3 ml-3">
          <p>
            Are you sure you want to delete <strong>All</strong> todos?
          </p>
          <div className="mt-4 mb-3">
            <button
              onClick={() => {
                deleteTodo();
                toast.dismiss(t.id);
              }}
              className="p-3 mr-3 bg-purple-300 w-[100px] rounded-md">
              Yes
            </button>
            <button
              className="p-3 mr-3 bg-red-300 w-[100px] rounded-md"
              onClick={() => toast.dismiss(t.id)}>
              No
            </button>
          </div>
        </div>
      ),
      {
        icon: (
          <TriangleAlert
            strokeWidth={2}
            className="text-3xl ml-3 text-orange-600"
          />
        ),
        duration: 10000,
      }
    );
  };
  const deleteTodo = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks?all=true`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message) {
        setTodos([]);
        toast.success(data.message, {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error(data.error, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        duration: 2000,
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex items-center justify-between p-3 mt-8">
      <p>
        <strong className="text-purple-500 mr-2">{count}</strong>
        {`Task${count > 1 ? "(s)" : ""} Left`}
      </p>
      <button
        onClick={deleteTodoModel}
        disabled={count === 0}
        className={`bg-transparent  ${
          count === 0 ? "text-purple-300" : "text-purple-800"
        }`}>
        Clear All Tasks
      </button>
    </div>
  );
};

export default Footer;
