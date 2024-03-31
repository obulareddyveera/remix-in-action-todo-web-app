import fetch from "node-fetch";

export type ToDoItem = {
  createdAt: Date;
  name: string;
  avatar: string;
  description: string;
  status: string;
  updatedAt: Date;
  id: string;
};

interface InsDictionary {
  [key: string]: ToDoItem[];
}

export interface GlobalInst extends NodeJS.Global {
  ins: InsDictionary;
}
declare const global: GlobalInst;

export function singleton(key: string, data: Promise<ToDoItem[]>) {
  global.ins = global.ins ? global.ins : {};
  if (!global.ins[key]) {
    global.ins[key] = JSON.parse(JSON.stringify(data));
  }
  return global.ins[key];
}

export const todoAPIBaseURL =
  "https://6601e7009d7276a755525d97.mockapi.io/api/agent/v1/todo";

export async function getTodoOfId(id: string): Promise<ToDoItem[]> {
  return fetch(`${todoAPIBaseURL}/${id}`).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const dataSet = response.json() as Promise<ToDoItem[]>;
    return dataSet;
  });
}

export async function getData(): Promise<ToDoItem[]> {
  return fetch(todoAPIBaseURL).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const dataSet = response.json() as Promise<ToDoItem[]>;
    singleton("todos", dataSet);
    return dataSet;
  });
}

export interface UpdateDataParam {
  [key: string]: string;
}

export async function deleteRecord(data: UpdateDataParam) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  return fetch(`${todoAPIBaseURL}/${data.id}`, requestOptions).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataSet = response.json() as Promise<ToDoItem[]>;
      singleton("todos", dataSet);
      return dataSet;
    }
  );
}
export async function updateStatus(data: UpdateDataParam) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: data.status }),
  };

  return fetch(`${todoAPIBaseURL}/${data.id}`, requestOptions).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataSet = response.json() as Promise<ToDoItem[]>;
      singleton("todos", dataSet);
      return dataSet;
    }
  );
}
export async function updateRecord(data: UpdateDataParam) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data.name, description: data.description }),
  };

  return fetch(`${todoAPIBaseURL}/${data.id}`, requestOptions).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataSet = response.json() as Promise<ToDoItem[]>;
      singleton("todos", dataSet);
      return dataSet;
    }
  );
}

export async function addRecord(data: UpdateDataParam) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      status: "NEW",
    }),
  };

  return fetch(todoAPIBaseURL, requestOptions).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const dataSet = response.json() as Promise<ToDoItem[]>;
    return dataSet;
  });
}

/**
 *
 * https://stackblitz.com/edit/remix-run-remix-acm3aq?file=app%2Fdb%2Fdata.server.ts
 */
