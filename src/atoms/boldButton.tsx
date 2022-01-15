import React from 'react';
import {Button }from "@mui/material";
import {styled} from "@mui/system";

const MyButton = styled(Button)({
    color: '#5A4628',
    fontWeight: 'bold',
    minWidth: 20,
    padding: '0 6px'
})

export default function BoldButton(props: {label: any, onClick: () => void}) {
    return (
        <MyButton onClick={props.onClick}>
            {props.label}
        </MyButton>
    )
}