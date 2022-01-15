import React from "react";
import {Typography} from "@mui/material";
import {styled} from "@mui/system";

const MyTypography = styled(Typography)({
    color: '#5A4628',
    fontSize: 12,
    padding: '0px',
    margin: 0,
    fontWeight: 'bold',
    '&:hover': {
        borderBottom: '1px solid #5A4628'
    }
})

export default function StudioResultCardDetail() {
    return (
        <MyTypography>詳細を見る {'>'}</MyTypography>
    );
}