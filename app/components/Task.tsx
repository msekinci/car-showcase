"use client"

import { ITask } from "@/types/type";
import React, { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, updateTodo } from "@/apis/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [textTodo, setTextTodo] = useState(task.text);
  const router = useRouter();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateTodo({
      id: task.id,
      text: textTodo,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleSubmitDeleteTodo = async (id: string) => {
    await deleteTodo(task.id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>
            <div className="modal-action">
              <input
                value={textTodo}
                onChange={(e) => setTextTodo(e.target.value)}
                type="text"
                className="input input-bordered w-full"
                placeholder="Type here"
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={25} />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">Are you sure, you want to delete this task?</h3>
            <div className="modal-action">
              <button onClick={() => handleSubmitDeleteTodo(task.id)} className="btn btn-danger">
                Yes
              </button>
            </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
