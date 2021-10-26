import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type PropsType = {
    tasks: TaskType[]
    addTask: (newTitle: string) => void
    deleteTask: (taskID: string) => void
    changeTasksStatus: (taskID: string, isDone: boolean) => void
    changeFilter: (filterValue: FilterValueType) => void
}

export const Todolist = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

    const mappedTasks = props.tasks.map(task => {
        const onClickHandler = () => props.deleteTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTasksStatus(task.id, e.currentTarget.checked)
        }
        return (
            <li key={task.id}>
                <input onChange={onChangeHandler} type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }

    const addTask = () => {
        if (newTitle === '') {
            setError('Field is required!')
        } else {
            props.addTask(newTitle.trim())
        }
        setNewTitle('')
    }

    const onClickHandlerForAddTask = () => {
        addTask()
    }

    const onEnterPressHandlerForAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue)
    }

    return (
        <div className="App">
            <h3>What to learn</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    onKeyPress={onEnterPressHandlerForAddTask}
                    value={newTitle}
                    type="text"
                />
                {error && <span>{error}</span>}
                <button onClick={onClickHandlerForAddTask}>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    )
}