import React, {ChangeEvent, FC, memo, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {deleteTask, updateTaskStatus, updateTaskTitle} from './bll/task-reducer'
import {EditableSpan} from './EditableSpan'
import {Checkbox, Grid, IconButton} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {TaskStatuses, TaskType} from './api/task-api'

type TaskPropsType = {
    todolistID: string
    task: TaskType
}

export const Task: FC<TaskPropsType> = memo((
    {
        todolistID,
        task
    }) => {

    const dispatch = useDispatch()

    const handleTaskRemove = useCallback(() => {
        dispatch(deleteTask(todolistID, task.id))
    }, [dispatch, todolistID, task.id])

    const handleTaskStatusChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newTaskStatus = e.currentTarget.checked
        dispatch(updateTaskStatus(todolistID, task.id, newTaskStatus ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todolistID, task.id])

    const changeTaskTitleCallback = useCallback((newTitle: string) => {
        dispatch(updateTaskTitle(todolistID, task.id, newTitle))
    }, [dispatch, todolistID, task.id])

    return (
        <li style={{padding: '5px 0'}}>
            <Grid container>
                <Grid item xs={2}>
                    <Checkbox color={'success'}
                              checked={task.status === TaskStatuses.Completed}
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