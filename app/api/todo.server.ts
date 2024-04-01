import fetch from "node-fetch";

const todoAPIBaseURL =
  "https://6601e7009d7276a755525d97.mockapi.io/api/agent/v1/todo";

export type ToDoItem = {
  createdAt: Date;
  name: string;
  avatar: string;
  description: string;
  status: string;
  updatedAt: Date;
  id: string;
};

export interface UpdateDataParam {
  [key: string]: string;
}

const todoAPIServiceLeaf = {
  getAllTodoItems: (): Promise<ToDoItem[]> => {
    return fetch(todoAPIBaseURL).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataSet = response.json() as Promise<ToDoItem[]>;
      return dataSet;
    });
  },
  getTodoItem: (id: string): Promise<ToDoItem[]> => {
    return fetch(`${todoAPIBaseURL}/${id}`).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataSet = response.json() as Promise<ToDoItem[]>;
      return dataSet;
    });
  },
  addTodoItem: async (data: UpdateDataParam) => {
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
  },
  deleteTodoItem: async (data: UpdateDataParam) => {
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
        return dataSet;
      }
    );
  },
  updateTodoItem: async (data: UpdateDataParam) => {
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
        return dataSet;
      }
    );
  },
  updateTodoStatus: async (data: UpdateDataParam) => {
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
        return dataSet;
      }
    );
  },
};

export default todoAPIServiceLeaf