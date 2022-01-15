import {Typography} from "@mui/material";

interface PageTitleProps {
    children: any,
    margin?: any,
    center?: boolean
}

export default function PageTitle(props: PageTitleProps) {
    return (
        <Typography variant={'h6'}　
                    align={props.center ? 'center' : 'left'}
                    sx={{fontWeight: 'bold', m: props.margin}}>
            {props.children}
        </Typography>
    );
}