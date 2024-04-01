import { ActionFunctionArgs } from "@remix-run/node";
import { Link, json, redirect, useFetcher } from "@remix-run/react";
import { FormEvent, useCallback } from "react";
import TodoFormComponent from "~/components/todo.form";
import todoAPIServiceLeaf, { UpdateDataParam } from "~/api/todo.server";

export const loader = async () => {
  return json({ todo: {} });
};
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const payload: UpdateDataParam = {};
  Object.keys(data).forEach((item) => {
    payload[item] = data[item] as string;
  });
  await todoAPIServiceLeaf.addTodoItem(payload);
  return redirect("/todos");
}

export default function AddNewTodo() {
  const fetcher = useFetcher();
  const handler = useCallback(
    (e: FormEvent) => {
      fetcher.submit(e.currentTarget as HTMLFormElement);
    },
    [fetcher]
  );
  return (
    <>
      <article>
        <div className="card w-full bg-base-100 shadow-xl m-4">
          <div className="card-body h-[75vh]">
            <h2 className="card-title text-[#192F01]">
              Add a New TODO, THINGS ...!
            </h2>
            <div className="flex justify-end border-b-2 p-2">
              <div className="card-actions justify-end">
                <Link to="/todos">
                  <button className="btn">Cancel</button>
                </Link>
                <button className="btn bg-[#E0475B] hover:border-none hover:bg-[#E1689B] text-white">
                  Save
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <fetcher.Form method="post" onSubmit={handler}>
                <input type="hidden" name="intent" value={"add"} />
                <TodoFormComponent action="add" todo={{}} />
              </fetcher.Form>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
