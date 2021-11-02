import {v1} from 'uuid';
import {FilterValueType, TodolistType} from '../App';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todolistReducer
} from './todolistReducer';

test('todolist should be removed', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const startState: TodolistType[] = [
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, deleteTodolistAC(todolistID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID_2)
})

test('todolist should be added', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newTodolistID = 'asdfkjfg-1234'
    const newTodolistTitle = 'New todolist'

    const startState: TodolistType[] = [
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, addTodolistAC(newTodolistID, newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New todolist')
    expect(endState[0].filter).toBe('all')
    expect(endState[0].id).toBe('asdfkjfg-1234')
})

test('todolist name should be changed', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newTodolistTitle = 'New todolist'

    const startState: TodolistType[] = [
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID_2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('filter should be changed', () => {
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const newFilter: FilterValueType = 'completed'

    const startState: TodolistType[] = [
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeFilterAC(todolistID_2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})