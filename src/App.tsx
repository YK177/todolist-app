import React from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {AddItemForm} from './AddItemForm'
import {AppRootStateType} from './bll/store'
import {useDispatch, useSelector} from 'react-redux'
import {addTodolistAC, TodolistType} from './bll/todolist-reducer'
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material'
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
            <AppBar position="static" color={'primary'}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist App
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container maxWidth={'325px'} style={{padding: '20px 0'}}>
                    <Box padding={'10px'} width={'100%'} style={{backgroundColor:'#fff'}}>
                        <AddItemForm callback={addTodolist}/>
                    </Box>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return (
                                <Grid minWidth={'350px'} item key={tl.id}>
                                    <Paper elevation={6} style={{padding: '10px'}}>
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