const TaskForm = ({onAddTask}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            id: Date.now(),
            name: event.target.taskName.value,
            date: event.target.taskDate.value,
        };
        onAddTask(task);
        event.target.reset();
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="taskName" placeholder="Enter Task" required className="border p-2 w-full rounded-md" />
            <input type="date" name="taskDate" placeholder="Enter Date" required className="border p-2 w-full rounded-md"/>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">Add Task</button>
        </form>
    );
}

export default TaskForm;