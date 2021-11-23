import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {TaskType} from './bll/task-reducer';
import {FilterValueType} from './bll/todolist-reducer';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {Button, Checkbox, IconButton} from '@mui/material';

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
    tasks: TaskType[]
    addTask: (todolistID: string, title: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {
        id,
        title,
        filter,
        removeTodolist,
        tasks,
        addTask,
        changeTodolistTitle,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,
        changeFilter,
    } = props

    //Todolist callbacks
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        changeTodolistTitle(id, newTitle)
    }

    //Tasks callbacks
    const addTaskCallback = (title: string) => {
        addTask(id, title)
    }

    //Change filter handlers
    const setAllTasksHandler = () => {
        changeFilter(id, 'all')
    }
    const setActiveTasksHandler = () => {
        changeFilter(id, 'active')
    }
    const setCompletedTasksHandler = () => {
        changeFilter(id, 'completed')
    }

    return (
        <>
            <div>
                <EditableSpan callback={changeTodolistTitleHandler} title={title}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteForeverOutlinedIcon/>
                </IconButton>
            </div>
            <AddItemForm callback={addTaskCallback}/>
            <ul>
                {
                    tasks.map(t => {

                        const onClickHandler = () => {
                            removeTask(id, t.id)
                        }

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(id, t.id, e.currentTarget.checked)
                        }

                        const changeTaskTitleHandler = (newTitle: string) => {
                            changeTaskTitle(id, t.id, newTitle)
                        }

                        return (
                            <li key={t.id}>
                                <Checkbox checked={t.isDone} onChange={onChangeHandler}/>
                                <EditableSpan title={t.title} callback={changeTaskTitleHandler}/>
                                <IconButton onClick={onClickHandler}>
                                    <DeleteForeverOutlinedIcon/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={setAllTasksHandler}
                    size={'small'}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={setActiveTasksHandler}
                    size={'small'}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={setCompletedTasksHandler}
                    size={'small'}
                >
                    Completed
                </Button>
            </div>
        </>
    )
}