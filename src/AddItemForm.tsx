import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {IconButton, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type AddItemFormPropsType = {
    callback: (newTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({callback}) => {

    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(false)
    }

    const addItemHandler = () => {
        if (newTitle.trim() === '') {
            setError(true)
        } else {
            callback(newTitle.trim())
            setNewTitle('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                size="small"
                variant="outlined"
                type="text"
                label={error && 'Error'}
                value={newTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={error}
                helperText={error && 'Incorrect entry!'}
            />
            <IconButton onClick={addItemHandler}>
                <AddIcon/>
            </IconButton>
        </div>
    )
})