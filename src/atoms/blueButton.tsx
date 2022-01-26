import React from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/system";

interface BlueButtonProps {
    children: any,
    fontSize?: number,
    padding?: any,
    margin?: any,
    onClick?: () => void,
    disabled?: boolean,
}


const BlueButton = React.forwardRef<HTMLButtonElement, BlueButtonProps>((props, ref) => {
    const MyButton = styled(Button)({
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
        <MyButton onClick={props.onClick} sx={{fontSize: props.fontSize, p: props.padding, m: props.margin}}
                  disabled={props.disabled} ref={ref}>
            {props.children}
        </MyButton>
    );
})

export default BlueButton;