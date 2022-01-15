import React from "react";
import { styled } from '@mui/system';
import StudioSearchButton from "../atoms/studioSearchButton";
import StudioPlace from "../molecules/studioPlace";
import StudioSpace from "../molecules/studioSpace";
import StudioDate from "../molecules/studioDate";
import StudioDetail from "../molecules/studioDetail";
import {Paper} from "@mui/material";
import PlaceDialog from "./placeDialog";
import SpaceDialog from "./spaceDialog";
import DateDialog from "./dateDialog";
import DetailDialog from "./detailDialog";

const MyPaper = styled(Paper)({
    color: "#5A4628",
    boxShadow:'4px 4px 4px #F9F5F0',
    margin: 'auto'
})

export default function StudioSearchPaper(props: {isWide?: boolean}) {
    const {isWide} = props;

    return (
        <MyPaper elevation={0}
                 sx={isWide ? {minWidth: 520, maxWidth: 800, p: '20px 24px 24px'}
                     : { minWidth: 200, maxWidth: 400, p: '16px 16px 20px'}}>
            <StudioPlace isWide={isWide}/>
            <div style={isWide ? {display: 'flex', marginBottom: 8} : {}}>
                <StudioSpace isWide={isWide}/>
                <StudioDate isWide={isWide}/>
            </div>
            <StudioDetail isWide={isWide}/>
            <StudioSearchButton/>
            <PlaceDialog/>
            <SpaceDialog/>
            <DateDialog/>
            <DetailDialog/>
        </MyPaper>
    );
}