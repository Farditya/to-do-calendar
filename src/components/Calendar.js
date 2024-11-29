import React, { useState } from 'react';

const Calendar = ({tasks=[], onDropTask, onToggleComplete, onDeleteTask}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

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

    const changeMonth = (delta) => {
        setCurrentMonth((prevMonth) => {
            let newMonth = prevMonth + delta;
            let newYear = currentYear;
            
            if (newMonth > 11) {
                newMonth = 0;
                newYear += 1;
            } else if (newMonth < 0) {
                newMonth = 11;
                newYear -= 1;
            }
            
            setCurrentYear(newYear);
            return newMonth;
        });
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="px-4 py-2 bg-blue-500 text-white rounded">Previous</button>
                <h2 className="text-2xl font-bold">{months[currentMonth]} {currentYear}</h2>
                <button onClick={() => changeMonth(1)} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
            </div>
            <div className="flex-grow grid grid-cols-7 gap-1">
                {['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div key={day} className="text-center font-bold p-2">{day}</div>
                ))}
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                    <div key={`empty-${index}`} className="p-2"></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const dayTasks = tasks
                        .filter(task => task.date === date)
                        .sort((a, b) => a.time.localeCompare(b.time));

                    return (
                        <div
                            key={day}
                            className="p-2 border rounded hover:bg-gray-100 overflow-y-auto"
                            style={{minHeight: '100px'}}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, date)}
                        >
                            <div className="font-bold">{day}</div>
                            {dayTasks.map(task => (
                                <div key={task.id} className={`text-sm mt-1 flex justify-between items-center px-4 py-2 outline outline-1 outline-gray-300 rounded-sm ${task.completed ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    <span className={task.completed ? "line-through text-gray-500" : "text-blue-500"}>
                                        {task.time}  {task.name}
                                    </span>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => onToggleComplete(task.id)}
                                            className="mr-2"
                                        />
                                        <button
                                            onClick={() => onDeleteTask(task.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;