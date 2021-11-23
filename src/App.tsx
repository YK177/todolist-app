import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './bll/store';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    FilterValueType,
    removeTodolistAC,
    TodolistType
} from './bll/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from './bll/task-reducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';


export const App = () => {

    const dispatch = useDispatch()

    //Todolists
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        dispatch(changeFilterAC(todolistID, value))
    }

    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }

    //Tasks
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    const addTask = (todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container spacing={3}>
                    <Grid item xs={12}><AddItemForm callback={addTodolist}/></Grid>
                    {
                        todolists.map(tl => {
                            let filteredTasks = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                filteredTasks = tasks[tl.id].filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                            }
                            return (
                                <Grid item xs={3} key={tl.id}>
                                    <Paper elevation={6}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                            tasks={filteredTasks}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeTaskStatus={changeTaskStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeFilter={changeFilter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </>
    );
}