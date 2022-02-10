import React from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/system";

export const MyBlueButton = styled(Button)({
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
