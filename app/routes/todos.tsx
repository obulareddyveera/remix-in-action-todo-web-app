import { ActionFunctionArgs, json } from "@remix-run/node";
import { Link, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import { FormEvent, ReactNode, useCallback } from "react";
import todoAPIServiceLeaf, {
  ToDoItem,
  UpdateDataParam,
} from "~/api/todo.server";

interface StatusBadgeType {
  status: string;
  style: string;
  [key: string]: string;
}

export const loader = async () => {
  try {
    const todos = await todoAPIServiceLeaf.getAllTodoItems();
    return json({ todos });
  } catch (error) {
    return redirect("/error");
  }
};
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const payload: UpdateDataParam = {};
  Object.keys(data).forEach((item) => {
    payload[item] = data[item] as string;
  });
  switch (data["intent"]) {
    case "status":
      await todoAPIServiceLeaf.updateTodoStatus(payload);
      break;
    case "delete":
      await todoAPIServiceLeaf.deleteTodoItem(payload);
      break;
    default:
      throw new Response("Bad Request", { status: 400 });
  }
  return json({ success: true });
}

export default function Component() {
  const data = useLoaderData<{ todos: ToDoItem[] }>();
  const todos: ToDoItem[] = JSON.parse(JSON.stringify(data.todos));
  const statusBadge: StatusBadgeType[] = [
    { status: "NEW", style: "badge bg-[#FA64B5] badge-lg text-white" },
    { status: "START", style: "badge bg-[#F3D849] badge-lg text-white" },
    { status: "PROGRESS", style: "badge bg-[#2D3E4E] badge-lg text-white" },
    { status: "STOP", style: "badge bg-[#F26659] badge-lg text-white" },
    { status: "DONE", style: "badge bg-[#5A8100] badge-lg text-white" },
  ];

  return (
    <>
      <article>
        <div className="card w-full bg-base-100 shadow-xl m-4">
          <div className="card-body h-[75vh]">
            <h2 className="card-title text-[#192F01]">
              MY TODO, THINGS FOUND ...!
            </h2>
            <div className="flex justify-end border-b-2 p-2">
              <div className="card-actions w-full">
                <div className=" flex justify-between w-full">
                <div>
                <Link to="/">
                  <button className="btn btn-md">Cancel</button>
                </Link>
                </div>
                <div>
                <Link to="new">
                  <button className="btn btn-md bg-[#E0475B] hover:border-none hover:bg-[#E1689B] text-white">
                    Add NEW TODO!
                  </button>
                </Link>
                </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {todos &&
                    todos.map((todo: ToDoItem, index: number) => {
                      const bradgeIndex = statusBadge.findIndex(
                        (item) => item.status === todo.status
                      );
                      return (
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div className="btn btn-link">
                                <Link to={`${todo.id}`}>{todo.name}</Link>
                              </div>
                            </td>
                            <td>
                              <div className={statusBadge[bradgeIndex]?.style}>
                                {todo.status}
                              </div>
                            </td>
                            <td>{todo.description}</td>
                            <td>
                              <FetcherCell id={todo.id} intent="status">
                                <select
                                  name="status"
                                  defaultValue={todo.status}
                                >
                                  {statusBadge.map((opt) => (
                                    <option
                                      selected={opt.status === todo.status}
                                      key={opt.status}
                                      value={opt.status}
                                    >
                                      {opt.status}
                                    </option>
                                  ))}
                                </select>
                              </FetcherCell>
                            </td>
                            <td>
                              <FetcherCell id={todo.id} intent="delete">
                                <button className="btn btn-sm">Delete</button>
                              </FetcherCell>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

type FetcherCellProps = {
  id: string;
  intent: string;
  children: ReactNode;
};

function FetcherCell({ id, intent, children }: FetcherCellProps) {
  const fetcher = useFetcher();
  const handler = useCallback(
    (e: FormEvent) => {
      fetcher.submit(e.currentTarget as HTMLFormElement);
    },
    [fetcher]
  );
  return (
    <fetcher.Form method="post" onChange={handler}>
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="id" value={id} />
      {children}
    </fetcher.Form>
  );
}
