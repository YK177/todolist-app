import React from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm'
import {AppRootStateType} from './bll/store'
import {useDispatch, useSelector} from 'react-redux'
import {addTodolistAC, TodolistType} from './bll/todolist-reducer'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'

export const App = () => {

    const dispatch = useDispatch()

    //Todolists
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
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
                    <Grid item xs={12}>
                        <AddItemForm callback={addTodolist}/>
                    </Grid>
                    {
                        todolists.map(tl => {
                            return (
                                <Grid item xs={3} key={tl.id}>
                                    <Paper elevation={6}>
                                        <Todolist todolist={tl}/>
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </>
    )
}