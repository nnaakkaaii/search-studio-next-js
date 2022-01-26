import React from 'react';
import {MyTextField} from "./searchTextField";
import {ControllerRenderProps, useController, UseControllerProps, useForm} from "react-hook-form";

interface InputTextFieldProps {
    name?: string,
    placeholder: string;
    field?: ControllerRenderProps
}

export default function InputTextField(props: InputTextFieldProps) {
    const { register } = useForm()
    const {placeholder, ...others} = props;

    return (
        <>
            <MyTextField {...props.field}
                         inputProps={{style: {color: '#5A4628', fontSize: 14, padding: 10, textAlign: 'start'}}}
                         placeholder={props.placeholder}/>
        </>
    );
}
