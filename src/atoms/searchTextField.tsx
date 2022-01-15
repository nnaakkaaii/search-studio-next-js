import React from 'react';
import TextField from '@mui/material/TextField';
import {styled} from "@mui/system";

const MyTextField = styled(TextField)({
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
})

interface SearchTextFieldProps {
    label: string;
    value: string;
    onChange: (event: any) => void;
}

export default function SearchTextField(props: SearchTextFieldProps) {
    return (
        <>
            <MyTextField variant="outlined"
                          inputProps={
                              !props.value ?
                                  {style: {color: '#5A4628', fontSize: 14, padding: 10, textAlign: 'center'}}
                                  : {style: {color: '#5A4628', fontSize: 14, padding: 10, textAlign: 'start'}}
                          }
                          placeholder={props.label} onChange={props.onChange} value={props.value}/>
        </>
    );
}
