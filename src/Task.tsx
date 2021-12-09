import React, {ChangeEvent, FC, memo, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {changeTaskStatus, changeTaskTitle, removeTask, TaskType} from './bll/task-reducer'
import {EditableSpan} from './EditableSpan'
import {Checkbox, Grid, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task: FC<TaskPropsType> = memo(({todolistID, task}) => {

    const dispatch = useDispatch()

    const handleTaskRemove = useCallback(() => {
        dispatch(removeTask(todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    const handleTaskStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked
        dispatch(changeTaskStatus(todolistID, task.id, newTaskStatus))
    }, [dispatch, todolistID, task.id])

    const changeTaskTitleCallback = useCallback((newTitle: string) => {
        dispatch(changeTaskTitle(todolistID, task.id, newTitle))
    }, [dispatch, todolistID, task.id])

    return (
        <li style={{padding: '5px 0'}}>
            <Grid container>
                <Grid item xs={2}>
                    <Checkbox color={'success'}
                              checked={task.isDone}
                              onChange={handleTaskStatusChange}
                    />
                </Grid>
                <Grid item xs={8}>
                    <EditableSpan spanClassName={'taskTitle'}
                                  title={task.title}
                                  onTitleChange={changeTaskTitleCallback}
                    />
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={handleTaskRemove}>
                        <Delete color={'error'}/>
                    </IconButton>
                </Grid>
            </Grid>
        </li>
    )
})