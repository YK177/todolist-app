import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react'
import {TextField} from '@mui/material'

type EditableSpanPropsType = {
    title: string
    spanClassName: string
    onTitleChange: (newTitle: string) => void
}
export const EditableSpan: FC<EditableSpanPropsType> = memo((
    {
        title,
        spanClassName,
        onTitleChange
    }) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const [error, setError] = useState<boolean>(false)

    const handleDoubleClick = () => {
        setEditMode(true)
    }

    const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }, [setValue, setError])

    const handleNewTitleAdd = useCallback(() => {
        if (value.trim() === '') {
            setError(true)
        } else {
            onTitleChange(value.trim())
            setEditMode(false)
        }
    }, [value, setError, onTitleChange, setEditMode])

    const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNewTitleAdd()
        }
    }, [handleNewTitleAdd])

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
                            onChange={handleValueChange}
                            onBlur={handleNewTitleAdd}
                            onKeyPress={handleKeyPress}
                        />
                    ) : (
                        <span className={spanClassName}
                              onDoubleClick={handleDoubleClick}
                        >
                            {title}
                        </span>
                    )
            }
        </>
    )
})