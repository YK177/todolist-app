import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTaskAC,
    addTasksForNewTodolistAC,
    changeTasksStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    TasksReducer
} from './reducers/TasksReducer';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    TodolistReducer
} from './reducers/TodolistReducer';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    //initial state
    const [todolists, todolistDispatch] = useReducer(TodolistReducer, [
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, taskDispatch] = useReducer(TasksReducer, {
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
        taskDispatch(deleteTaskAC(todolistID, taskID))
    }
    const addTask = (todolistID: string, newTitle: string) => {
        taskDispatch(addTaskAC(todolistID, newTitle))
    }
    const changeTasksStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        taskDispatch(changeTasksStatusAC(todolistID, taskID, isDone))
    }
    const changeTaskTitle = (taskID: string, newTitle: string, todolistID: string) => {
        taskDispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }

    //todolist reducers
    const deleteTodolist = (todolistID: string) => {
        todolistDispatch(deleteTodolistAC(todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (newTitle: string) => {
        const newTodolistID = v1();
        todolistDispatch(addTodolistAC(newTodolistID, newTitle, 'all'))
        taskDispatch(addTasksForNewTodolistAC(newTodolistID))
    }
    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        todolistDispatch(changeTodolistTitleAC(todolistID, newTitle))
    }
    const changeFilter = (todolistID: string, filterValue: FilterValueType) => {
        todolistDispatch(changeFilterAC(todolistID, filterValue))
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
                changeTaskTitle={changeTaskTitle}
                changeFilter={changeFilter}
                deleteTodolist={deleteTodolist}
                changeTodolistTitle={changeTodolistTitle}
            />
        )
    })

    return (
        <>
            <AddItemForm callback={addTodolist}/>
            {mappedTodolists}
        </>
    )
}