import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Grid, IconButton, TextField} from '@mui/material'
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
        <Grid container>
            <Grid item xs={10}>
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    color={'primary'}
                    type="text"
                    label={error ? 'Error' : 'Title'}
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={error}
                    helperText={error && 'Incorrect entry!'}
                />
            </Grid>
            <Grid item xs={2}>
                <IconButton color={'primary'} onClick={addItemHandler}>
                    <AddIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
})