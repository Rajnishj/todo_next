import { DeleteIcon, PencilIcon, TriangleAlert } from "lucide-react";
import React, { FC, RefObject, useState } from "react";
import { Todo } from "../utils/interface";
import toast from "react-hot-toast";
import { useTodoContext } from "../context/GlobalContent";
import UpdateModel from "./UpdateModel";
interface DropdownPropsType {
  ref: RefObject<HTMLDivElement | null>;
  item: Todo;
  onClose: () => void;
}
const Dropdown: FC<DropdownPropsType> = ({ ref, item, onClose }) => {
  const { todos, setTodos } = useTodoContext();
  const [showModel, setShowModel] = useState(false);

  const deleteTodoModel = () => {
    onClose();
    toast(
      (t: { id: string | undefined }) => (
        <div className="flex flex-col items-center mt-3 ml-3">
          <p>
            Are you sure you want to delete <strong>{item.text}</strong> todo?
          </p>
          <div className="mt-4 mb-3">
            <button
              onClick={() => {
                deleteTodo(item._id);
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

  const deleteTodo = async (id: string) => {
    const filterItem = todos.filter((item) => item._id !== id);
    try {
      const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.message) {
        setTodos(filterItem);
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
  const handleConfirm = async (value: string) => {
    onClose();
    if (value.length < 3) {
      toast.error("Please enter at least 3 characters to add the todo.", {
        duration: 2000,
        position: "top-center",
      });
    } else {
      try {
        const updatedItem = { ...item, text: value,completed:true };
        const res = await fetch(
          `http://localhost:3000/api/tasks?id=${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: value }),
          }
        );
        const data = await res.json();
        if (data.message) {
          const updatedTodos = todos.map((todo) =>
            todo._id === item._id ? updatedItem : todo
          );
          setTodos(updatedTodos);
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
      } finally {
        setShowModel(false);
      }
    }
  };

  const handleCancel = () => {
    onClose()
    setShowModel(false);
  };
  const handleEdit = () => {
    setShowModel(true);
  };
  return (
    <div
      ref={ref}
      className="absolute right-[27px] z-10 pt-3 pb-3 top-[25px] rounded-md w-[200px] bg-slate-300">
      <div
        onClick={handleEdit}
        className="flex items-center cursor-pointer  p-2 hover:bg-purple-300">
        <PencilIcon className="ml-4" />
        <p className="ml-4">Edit</p>
      </div>
      <div
        onClick={deleteTodoModel}
        className="flex items-center cursor-pointer p-2 hover:bg-purple-300">
        <DeleteIcon className="ml-4" />
        <p className="ml-4">Delete</p>
      </div>
      {showModel && (
        <UpdateModel
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          initialValue={item.text}
        />
      )}
    </div>
  );
};

export default Dropdown;
