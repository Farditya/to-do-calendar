import { useState } from "react";

const TaskForm = ({onAddTask}) => {
    const [name, setName] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && time){
            onAddTask({
                id:Date.now(),name, time, date:null, completed:false
            });
            setName("");
            setTime("");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="mb-4 space-y-4 bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Task Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
                type="time"
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
                Add Task
            </button>
        </form>
    )
}

export default TaskForm;