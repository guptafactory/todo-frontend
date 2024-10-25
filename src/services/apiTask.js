import axios from "axios";
import { SERVER } from "../utils/constants";

export async function createTask(title, description) {
  const { data } = await axios.post(
    `${SERVER}/task/new`,
    { title, description },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return data;
}

export async function getAllTasks() {
  const { data } = await axios.get(`${SERVER}/task/all`, {
    withCredentials: true,
  });

  return data;
}

export async function changeTaskStatus(taskId) {
  const data = await axios.put(
    `${SERVER}/task/changeStatus/${taskId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return data.data;
}

export async function deleteTask(taskId) {
  const { data } = await axios.get(`${SERVER}/task/remove/${taskId}`, {
    withCredentials: true,
  });

  return data;
}
