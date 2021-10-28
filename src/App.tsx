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

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Beer', isDone: false}
        ],

    })

    //tasks reducers
    const deleteTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)})
    }

    const addTask = (todolistID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: newTitle, isDone: false}, ...tasks[todolistID]]})
    }

    const changeTasksStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, isDone} : task)})
    }

    const changeFilter = (todolistID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {
            ...todolist,
            filter: filterValue
        } : todolist))
    }

    //todolist reducers
    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        delete tasks[todolistID]
    }

    const mappedTodolists = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.id]
        if (todolist.filter === 'active') {
            filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
            filteredTasks = tasks[todolist.id].filter(task => task.isDone)
        }
        return (
            <Todolist
                key={todolist.id}
                id={todolist.id}
                title={todolist.title}
                tasks={filteredTasks}
                addTask={addTask}
                deleteTask={deleteTask}
                changeTasksStatus={changeTasksStatus}
                changeFilter={changeFilter}
                deleteTodolist={deleteTodolist}
            />
        )
    })

    return (
        <>
            {mappedTodolists}
        </>
    );
}

export default App;