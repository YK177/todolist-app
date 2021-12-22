import {applyMiddleware, combineReducers, createStore} from 'redux'
import {todolistReducer} from './todolist-reducer'
import {taskReducer} from './task-reducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))