import React, {ChangeEvent, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from './bll/task-reducer'
import {EditableSpan} from './EditableSpan'
import {Checkbox, Grid, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'

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
        <li style={{padding: '5px 0'}}>
            <Grid container>
                <Grid item xs={2}>
                    <Checkbox color={'success'} checked={task.isDone} onChange={onChangeHandler}/>
                </Grid>
                <Grid item xs={8}>
                    <EditableSpan spanClassName={'taskTitle'} title={task.title} callback={changeTaskTitleCallback}/>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={onClickHandler}>
                        <Delete color={'error'}/>
                    </IconButton>
                </Grid>
            </Grid>
        </li>
    )
})