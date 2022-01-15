import {Typography} from "@mui/material";

interface BoldTypographyProps {
    children: any,
    sub?: boolean,
    margin?: any,
    center?: boolean
}

export default function BoldTypography(props: BoldTypographyProps) {
    return (
        <Typography variant={props.sub ? 'subtitle2' : 'subtitle1'}
                    align={props.center ? 'center' : 'left'}
                    sx={{color: "#5A4628", fontWeight: 'bold', m: props.margin}}>
            {props.children}
        </Typography>
    );
}