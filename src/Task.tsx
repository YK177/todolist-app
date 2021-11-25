import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from './bll/task-reducer'
import {EditableSpan} from './EditableSpan'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import {Checkbox, IconButton} from '@mui/material'

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task: React.FC<TaskPropsType> = React.memo(({todolistID, task}) => {

    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(removeTaskAC(todolistID, task.id))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todolistID, task.id, newTaskStatus))
    }

    const changeTaskTitleCallback = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, task.id, newTitle))
    }, [dispatch, todolistID, task.id])

    return (
        <li>
            <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
            <EditableSpan title={task.title} callback={changeTaskTitleCallback}/>
            <IconButton onClick={onClickHandler}>
                <DeleteForeverOutlinedIcon/>
            </IconButton>
        </li>
    )
})