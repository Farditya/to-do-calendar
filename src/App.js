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
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">To-do List</h1>
        <TaskForm onAddTask={addTask} />
        <TaskList 
          tasks={tasks.filter(task => !task.date)} 
          onDragStart={(e, task)=> e.dataTransfer.setData("task", JSON.stringify(task))}
          onDelete={deleteTask}
        /> 
      </div>
      
      <div className="w-3/4 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Calendar</h2>
        <Calendar 
          tasks={tasks} 
          onDropTask={onDropTask} 
          onToggleComplete={ToggleComplete} 
        />
      </div>
    </div>
  );
}

export default App;