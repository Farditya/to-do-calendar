const TaskList = ({tasks}) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} className="border p-2 rounded-lg bg-gray-400">{task.name} - {task.date}</li>
            ))}
        </ul>
    );
}

export default TaskList;