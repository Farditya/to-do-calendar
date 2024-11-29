const Calendar = ({tasks=[], onDropTask, onToggleComplete}) => {
    const currentYear = new Date().getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const handleDrop = (e, date) => {
        e.preventDefault();
        try {
            const taskData = e.dataTransfer.getData("task");
            if (taskData) {
                const task = JSON.parse(taskData);
                onDropTask(task, date);
            }
        } catch (error) {
            console.error("Failed to drop task:", error);
        }
    };
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="grid grid-cols-3 gap-4">
                {months.map((month, index) => (
                    <div key={month} className="p-4 border rounded shadow-sm">
                        <h3 className="text-lg font-bold">{month}</h3>
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {Array.from({ length: getDaysInMonth(index, currentYear) }, (_, day) => {
                        const date = `${currentYear}-${String(index + 1).padStart(2, "0")}-${String(day + 1).padStart(2, "0")}`;
                        return (
                            <div
                            key={day}
                            className="p-1 border rounded hover:bg-gray-200"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, date)}
                            >
                            {day + 1}
                            {tasks.filter(task => task.date === date).map(task => (
                                <div key={task.id} className="flex justify-between items-center">
                                    <span className={`block text-xs ${task.completed ? "line-through text-gray-500" : "text-blue-500"}`}>
                                    {task.time} - {task.name}
                                    </span>
                                    <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => onToggleComplete(task.id)}
                                    className="ml-2"
                                    />
                                </div>
                                ))}
                            </div>
                        );
                        })}
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar;