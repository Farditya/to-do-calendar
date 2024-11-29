import React, {useState} from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Calendar from "./components/Calendar";

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const onDropTask = (task, date) => {
    setTasks(tasks.map(t => t.id === task.id? {...t, date} : t));
  }
  const ToggleComplete = id =>{
    setTasks(tasks.map(task => task.id === id? {...task, completed:!task.completed} : task));
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">To do list with calendar</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks.filter(task => !task.date)} 
      onDragStart={(e, task)=> e.dataTransfer.setData("task", JSON.stringify(task))}
      onDelete={deleteTask}
      /> 
      <Calendar tasks={tasks} onDropTask={onDropTask} onToggleComplete={ToggleComplete} />
    </div>
  );
}
export default App;