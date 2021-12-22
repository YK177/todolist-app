import {FC, memo, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Task} from './Task'
import {createTask, fetchTasks} from './bll/task-reducer'
import {changeFilter, deleteTodolist, TodolistDomainType, updateTodolistTitle} from './bll/todolist-reducer'
import {Button, Divider, Grid, IconButton, Stack} from '@mui/material'
import {AppRootStateType} from './bll/store'
import {Delete} from '@mui/icons-material'
import {TaskStatuses, TaskType} from './api/task-api'

type TodolistPropsType = {
    todolist: TodolistDomainType
}

export const Todolist: FC<TodolistPropsType> = memo(({todolist}) => {

    const dispatch = useDispatch()

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    useEffect(() => {
        dispatch(fetchTasks(todolist.id))
    }, [dispatch, todolist.id])

    //Todolist callbacks
    const handleTodolistRemove = useCallback(() => {
        dispatch(deleteTodolist(todolist.id))
    }, [dispatch, todolist.id])

    const handleTodolistTitleChange = useCallback((title: string) => {
        dispatch(updateTodolistTitle(todolist.id, title))
    }, [dispatch, todolist.id])

    //Tasks callbacks
    const handleTaskAdd = useCallback((title: string) => {
        dispatch(createTask(todolist.id, title))
    }, [dispatch, todolist.id])

    //Filter
    let filteredTasks = tasks
    if (todolist.filter === 'completed') {
        filteredTasks = tasks.filter(({status}) => status === TaskStatuses.Completed)
    }
    if (todolist.filter === 'active') {
        filteredTasks = tasks.filter(({status}) => status === TaskStatuses.New)
    }

    //Change filter handlers
    const onAllTasksClick = useCallback(() => {
        dispatch(changeFilter(todolist.id, 'all'))
    }, [dispatch, todolist.id])

    const onActiveTasksClick = useCallback(() => {
        dispatch(changeFilter(todolist.id, 'active'))
    }, [dispatch, todolist.id])

    const onCompletedTasksClick = useCallback(() => {
        dispatch(changeFilter(todolist.id, 'completed'))
    }, [dispatch, todolist.id])

    return (
        <>
            <Grid container style={{padding: '10px 0'}}>
                <Grid alignItems={'center'} item xs={10}>
                    <EditableSpan spanClassName={'todolistTitle'}
                                  onTitleChange={handleTodolistTitleChange}
                                  title={todolist.title}/>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={handleTodolistRemove}>
                        <Delete color={'error'}/>
                    </IconButton>
                </Grid>
            </Grid>
            <AddItemForm onAddItem={handleTaskAdd}/>
            <ul>
                <Stack style={{padding: '10px 0'}} direction={'column'}
                       divider={<Divider orientation={'horizontal'} flexItem/>}>
                    {
                        filteredTasks.map(t => {
                            return <Task key={t.id}
                                         todolistID={todolist.id}
                                         task={t}
                            />
                        })
                    }
                </Stack>
            </ul>
            <Grid container spacing={1} style={{paddingTop: '10px'}}>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'all' ? 'success' : 'primary'}
                        variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
                        onClick={onAllTasksClick}
                        size={'small'}
                    > All</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'active' ? 'success' : 'primary'}
                        variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
                        onClick={onActiveTasksClick}
                        size={'small'}>Active</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        color={todolist.filter === 'completed' ? 'success' : 'primary'}
                        variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
                        onClick={onCompletedTasksClick}
                        size={'small'}>Completed</Button>
                </Grid>
            </Grid>
        </>
    )
})