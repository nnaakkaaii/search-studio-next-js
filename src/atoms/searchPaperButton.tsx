import React from 'react';
import { styled } from '@mui/system';
import {Button} from "@mui/material";

const MyButton = styled(Button)({
    borderColor: '#D7D2C8',
    color: '#9B8C7D',
    backgroundColor: '#fff',
    margin: '0 2%',
    width: '96%',
    '&:hover': {
        borderColor: '#9B8C7D',
        backgroundColor: '#fff',
    }
})

const ChipWrapDiv = styled('div')({
    overflow: 'scroll',
    display: 'flex',
    padding: 4
})

interface SearchCardButtonProps {
    dialogOpen: () => void;
    label: string;
    chipDisplay: boolean;
    children: React.ReactNode;
}

export default function SearchPaperButton(props: SearchCardButtonProps) {
    return (
        <MyButton variant="outlined" sx={props.chipDisplay ? {justifyContent: 'start', p: '0 4px'} : {}}
                onClick={props.dialogOpen}>
            {
                props.chipDisplay ?
                    <ChipWrapDiv>{props.children}</ChipWrapDiv>
                    : props.label + 'を選択'
            }
        </MyButton>
    );
}