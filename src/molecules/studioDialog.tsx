import React from 'react';
import {Dialog, DialogActions, DialogContent} from "@mui/material";
import {Close} from "@mui/icons-material";
import BoldButton from "../atoms/boldButton";
import {styled} from "@mui/system";

const MyDialogActions = styled(DialogActions)({
    backgroundColor: '#F9F5F0',
    padding: '4px 8px',
    display: 'flex',
    justifyContent: 'space-between'
})

interface StudioDialogProps {
    open: boolean;
    handleCancel: () => void;
    handleOk: () => void;
    padding: any;
    children: React.ReactNode;
}

export default function StudioDialog(props: StudioDialogProps) {
    return (
        <Dialog PaperProps={{style: {minWidth: 300, maxWidth: 480}}} keepMounted open={props.open} aria-labelledby="studioDialog">
            <MyDialogActions>
                <BoldButton label={<Close fontSize='small'/>} onClick={props.handleCancel}/>
                <BoldButton label={'決定'} onClick={props.handleOk}/>
            </MyDialogActions>
            <DialogContent sx={{p: props.padding}}>
                {props.children}
            </DialogContent>
        </Dialog>
    );
}