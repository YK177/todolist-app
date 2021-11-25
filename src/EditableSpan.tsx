import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from '@mui/material'

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(({title, callback}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const [error, setError] = useState<boolean>(false)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }

    const addNewTitle = () => {
        if (value.trim() === '') {
            setError(true)
        } else {
            callback(value.trim())
            setEditMode(false)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTitle()
        }
    }

    return (
        <>
            {
                editMode
                    ? (
                        <TextField
                            size="small"
                            variant="outlined"
                            label={error && 'Error'}
                            error={error}
                            helperText={error && 'Incorrect entry!'}
                            autoFocus
                            type={'text'}
                            value={value}
                            onChange={onChangeHandler}
                            onBlur={addNewTitle}
                            onKeyPress={onKeyPressHandler}
                        />
                    ) : (
                        <span onDoubleClick={onDoubleClickHandler}>{title}</span>
                    )
            }
        </>
    )
})