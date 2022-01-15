import {Typography} from "@mui/material";

interface SmallTypographyProps {
    children: any,
    bold?: boolean,
    margin?: any,
    center?: boolean
}

export default function SmallTypography(props: SmallTypographyProps) {
    return (
        <Typography variant={'caption'}
                    align={props.center ? 'center' : 'left'}
                    sx={
                        props.bold ? {color: "#5A4628", fontWeight: 'bold', m: props.margin}
                            : {color: "#5A4628", m: props.margin}
                    }>
            {props.children}
        </Typography>
    );
}