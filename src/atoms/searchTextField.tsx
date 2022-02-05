import React from 'react';
import TextField from '@mui/material/TextField';
import {styled} from "@mui/system";

export const MyTextField = styled(TextField)({
    height: 36,
    margin: '0 2%',
    width: '96%',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#D7D2C8',
        },
        '&:hover fieldset': {
            borderColor: '#9B8C7D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#9B8C7D',
        },
    },
    '& .MuiOutlinedInput-input': {
        color: '#5A4628',
        fontSize: 14,
        padding: '8px 12px',
    },
})

interface SearchTextFieldProps {
    label: string;
    value: string;
    onChange: (event: any) => void;
}

export default function SearchTextField(props: SearchTextFieldProps) {
    return (
        <>
            <MyTextField inputProps={!props.value ? {style: {textAlign: 'center'}} : {}}
                         placeholder={props.label} onChange={props.onChange} value={props.value}/>
        </>
    );
}
