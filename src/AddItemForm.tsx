import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }

    const addItem = () => {
        newTitle === ''
            ? setError('Field is required!')
            : props.callback(newTitle)
        setNewTitle('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addItem()
    }

    return (
        <div>
            <input
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                value={newTitle}
                type="text"
            />
            {error && <span>{error}</span>}
            <button onClick={addItem}>+</button>
        </div>
    )
}