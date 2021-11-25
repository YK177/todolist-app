import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Task} from './Task'
import {addTaskAC, TaskType} from './bll/task-reducer'
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC, TodolistType} from './bll/todolist-reducer'
import {Button, Divider, Grid, IconButton, Stack} from '@mui/material'
import {AppRootStateType} from './bll/store'
import {Delete} from '@mui/icons-material'

type TodolistPropsType = {
    todolist: TodolistType
}

export const Todolist: React.FC<TodolistPropsType> = ({todolist,}) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    const dispatch = useDispatch()

    //Todolist callbacks
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const changeTodolistTitleCallback = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }, [dispatch, todolist.id])

    //Tasks callbacks
    const addTaskCallback = useCallback((title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }, [dispatch, todolist.id])

    //Filter
    let filteredTasks = tasks
    if (todolist.filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (todolist.filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    //Change filter handlers
    const setAllTasksCallback = useCallback(() => {
        dispatch(changeFilterAC(todolist.id, 'all'))
    }, [dispatch, todolist.id])

    const setActiveTasksCallback = useCallback(() => {
        dispatch(changeFilterAC(todolist.id, 'active'))
    }, [dispatch, todolist.id])

    const setCompletedTasksCallback = useCallback(() => {
        dispatch(changeFilterAC(todolist.id, 'completed'))
    }, [dispatch, todolist.id])

    return (
        <>
            <Grid container style={{padding: '10px 0'}}>
                <Grid alignItems={'center'} item xs={10}>
                    <EditableSpan spanClassName={'todolistTitle'}
                                  callback={changeTodolistTitleCallback}
                                  title={todolist.title}/>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={removeTodolist}>
                        <Delete color={'error'}/>
                    </IconButton>
                </Grid>
            </Grid>
            <AddItemForm callback={addTaskCallback}/>
            <ul>
                <Stack style={{padding: '10px 0'}} direction={'column'}
                       divider={<Divider orientation={'horizontal'} flexItem/>}>
                    {
                        filteredTasks.map(t => {
                            return <Task key={t.id} todolistID={todolist.id} task={t}/>
                        })
                    }
                </Stack>
            </ul>
            <Grid container spacing={1} style={{paddingTop: '10px'}}>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'all' ? 'success' : 'primary'}
                        variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={setAllTasksCallback}
                        size={'small'}
                    > All</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'active' ? 'success' : 'primary'}
                        variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={setActiveTasksCallback}
                        size={'small'}>Active</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'completed' ? 'success' : 'primary'}
                        variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={setCompletedTasksCallback}
                        size={'small'}>Completed</Button>
                </Grid>
            </Grid>
        </>
    )
}