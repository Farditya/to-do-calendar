import React, {useState} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">To do list with calendar</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />  
    </div>
  );
}
export default App;