import React from 'react';
import {Button} from "@mui/material";
import {styled} from "@mui/system";

const MyButton = styled(Button)({
    borderColor: '#D7D2C8',
    color: '#5A4628',
    padding: 0,
    margin: 4
})

interface SearchOutlineButtonProps {
    children: string;
    onClick: () => void;
    disabled?: boolean
}

export default function OutlineButton(props: SearchOutlineButtonProps) {
    return (
        <MyButton onClick={props.onClick} disabled={props.disabled} variant="outlined">
            {props.children}
        </MyButton>
    )
}