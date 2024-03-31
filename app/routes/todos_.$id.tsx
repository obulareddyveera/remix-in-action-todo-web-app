import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { FormEvent, useCallback } from "react";
import TodoFormComponent from "~/components/todo.form";
import {
  ToDoItem,
  UpdateDataParam,
  getTodoOfId,
  updateRecord,
} from "~/api/todo.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const todo = await getTodoOfId(params.id as string);
  return json({ todo });
};
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  const payload: UpdateDataParam = {};
  Object.keys(data).forEach((item) => {
    payload[item] = data[item] as string;
  });
  await updateRecord(payload);
  return redirect("/todos");
}

export default function AddNewTodo() {
  const params = useParams();
  const data = useLoaderData<typeof loader>();
  const todoEntity: ToDoItem = JSON.parse(JSON.stringify(data.todo));

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
              Edit MY TODO, THING ...!
            </h2>
            <div className="overflow-x-auto">
              <fetcher.Form method="post" onSubmit={handler}>
                <input type="hidden" name="intent" value={"edit"} />
                <input type="hidden" name="id" value={params.id} />
                <TodoFormComponent action="edit" todo={todoEntity} />
              </fetcher.Form>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
