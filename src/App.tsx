import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    const deleteTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeTasksStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskID ? {...task, isDone} : task))
    }

    const changeFilter = (filterValue: FilterValueType) => {
        setFilter(filterValue)
    }

    const addTask = (newTitle: string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <Todolist
            tasks={filteredTasks}
            addTask={addTask}
            deleteTask={deleteTask}
            changeTasksStatus={changeTasksStatus}
            changeFilter={changeFilter}
        />
    );
}

export default App;

