import React from "react";
import { styled } from '@mui/system';
import StudioSearchButton from "../atoms/studioSearchButton";
import StudioPlace from "../molecules/studioPlace";
import StudioSpace from "../molecules/studioSpace";
import StudioDetail from "../molecules/studioDetail";
import {Paper} from "@mui/material";
import PlaceDialog from "./placeDialog";
import SpaceDialog from "./spaceDialog";
import DetailDialog from "./detailDialog";

const MyPaper = styled(Paper)({
    color: "#5A4628",
    boxShadow:'4px 4px 4px #F9F5F0',
    margin: 'auto',
    minWidth: 240,
    padding: '16px 16px 20px'
})

export default function StudioSearchPaper(props: {isWide?: boolean}) {
    const {isWide} = props;

    return (
        <MyPaper sx={isWide ? {maxWidth: 700} : {maxWidth: 400}}>
            <div style={isWide ? {display: 'flex'} : {}}>
                <div style={isWide ? {width: '50%'} : {}}>
                    <StudioPlace/>
                </div>
                <div style={isWide ? {width: '50%'} : {}}>
                    <StudioSpace/>
                    <StudioDetail/>
                </div>
            </div>
            <StudioSearchButton/>
            <PlaceDialog/>
            <SpaceDialog/>
            <DetailDialog/>
        </MyPaper>
    );
}