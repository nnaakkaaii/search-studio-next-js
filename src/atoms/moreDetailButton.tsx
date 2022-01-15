import React from 'react';
import {Button} from "@mui/material";

export default function MoreDetailButton(props: {onClick: () => void}) {
    return (
        <Button sx={{color: "#5A4628", p: '0 6px'}} onClick={props.onClick}>
            もっとしぼり込む {'>'}
        </Button>
    );
}