import React from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/system";

interface BlueButtonProps{
    children: any,
    fontSize?: number,
    padding?: any,
    margin?: any,
    onClick?: () => void,
    disabled?: boolean,
}

export default function BlueButton(props: BlueButtonProps) {
    const MyButton = styled(Button)({
            fontSize: props.fontSize,
            padding: props.padding,
            margin: props.margin,
            minWidth: 48,
            width: 'fit-content',
            display: 'flex',
            fontWeight: 'bold',
            color: '#F9F5F0',
            backgroundColor: '#1D356A',
            '&.Mui-disabled': {
                color: '#F9F5F0',
                opacity: .6
            },
            '&:hover': {
                color: '#F9F5F0',
                backgroundColor: '#1D356A',
                opacity: .8
            }
        })

    return (
        <MyButton onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </MyButton>
    );
}