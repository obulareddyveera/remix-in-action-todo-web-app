import { useState } from "react";
import { Link } from "react-router-dom";

type ToDoEntity = {
  createdAt?: Date;
  name?: string;
  avatar?: string;
  description?: string;
  status?: string;
  updatedAt?: Date;
  id?: string;
};
export interface ToDoFormProps {
  todo: ToDoEntity;
  action: string;
}

const TodoFormComponent = (props: ToDoFormProps) => {
  const [state, setState] = useState<ToDoFormProps>(props);
  const todo = state.todo || { name: "", description: "" };
  const handleOnChange = (key: string, val: string) => {
    setState((prevState) => {
      return {
        ...prevState,
        todo: {
          ...prevState.todo,
          [key]: val,
        },
      };
    });
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
            <span className="label-text-alt">*</span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Give a name for your TODO thing!"
            className="input input-bordered w-full"
            value={todo.name}
            onChange={(e) => handleOnChange("name", e.target.value)}
          />
          <div className="label">
            <span className="label-text-alt text-red-500">Required!</span>
          </div>
        </div>
        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
            <span className="label-text-alt">*</span>
          </div>
          <textarea
            id="description"
            name="description"
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
            value={todo.description}
            onChange={(e) => handleOnChange("description", e.target.value)}
          ></textarea>
          <div className="label">
            <span className="label-text-alt text-red-500">Required!</span>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Link to="/todos">
            <button className="btn btn-md m-2">Cancel</button>
          </Link>
          <button
            type="submit"
            className="btn btn-md bg-[#E0475B] hover:border-none hover:bg-[#E1689B] text-white m-2"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoFormComponent;
