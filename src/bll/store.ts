import {combineReducers, createStore} from 'redux';
import {todolistReducer} from './todolist-reducer';
import {taskReducer} from './task-reducer';

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)