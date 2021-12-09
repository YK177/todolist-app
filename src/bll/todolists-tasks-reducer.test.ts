import {TasksType} from './task-reducer'
import {TodolistType, addTodolist, todolistReducer} from './todolist-reducer'
import {taskReducer} from './task-reducer'

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: TodolistType[] = []

    const action = addTodolist('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolistID)
    expect(idFromTodolists).toBe(action.newTodolistID)
})