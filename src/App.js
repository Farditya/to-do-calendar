import React, {useState} from "react";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">To do list with calendar</h1>
      <TaskForm onAddTask={addTask} />
    </div>
  );
}
export default App;