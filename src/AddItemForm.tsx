import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react'
import {Grid, IconButton, TextField} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

type AddItemFormPropsType = {
    onAddItem: (newTitle: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo(({onAddItem}) => {

    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(false)
    }

    const handleClick = () => {
        if (newTitle.trim() === '') {
            setError(true)
        } else {
            onAddItem(newTitle.trim())
            setNewTitle('')
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick()
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
                    onChange={handleValueChange}
                    onKeyPress={handleKeyPress}
                    error={error}
                    helperText={error && 'Incorrect entry!'}
                />
            </Grid>
            <Grid item xs={2}>
                <IconButton color={'primary'} onClick={handleClick}>
                    <AddIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
})