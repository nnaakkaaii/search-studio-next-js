import React from "react";
import {Typography} from "@mui/material";
import StudioSpaceButton from "./studioSpaceButton";

export default function StudioSpace(props: {isWide?: boolean}) {
    const {isWide} = props;

    return (
        <div style={isWide ? {width: '50%'} : {marginBottom: 8}}>
            <Typography>広さ</Typography>
            <StudioSpaceButton/>
        </div>
    );
}