import {addTaskAC, deleteTaskAC, tasksReducer} from './tasksReducer';

test('task should be removed', () => {
    const startState = {
        'todolistID_1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: true},
        ],
        'todolistID_2': [
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Beer', isDone: false}
        ],
    }

    const endState = tasksReducer(startState, deleteTaskAC('todolistID_1', '2'))

    expect(endState['todolistID_1'].length).toBe(2)
    expect(endState['todolistID_1'].every(t => t.id !== '2')).toBeTruthy()
})
test('new task should be added', () => {
    const startState = {
        'todolistID_1': [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: true},
        ],
        'todolistID_2': [
            {id: '1', title: 'Bread', isDone: true},
            {id: '2', title: 'Milk', isDone: true},
            {id: '3', title: 'Beer', isDone: false}
        ],
    }

    const newTitle = 'GraphQL'

    const endState = tasksReducer(startState, addTaskAC('todolistID_1', newTitle))

    expect(endState['todolistID_1'][0].title).toBe(newTitle)
    expect(endState['todolistID_1'].length).toBe(4)
})