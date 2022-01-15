import React from "react";
import RangeLabel from "../rangeLabel";
import BoldTypography from "../atoms/boldTypography";
import {Typography} from "@mui/material";
import {styled} from "@mui/system";
import {People} from "@mui/icons-material";

const FloorWrapper = styled('div')({
    border: '1px solid #D7D2C8',
    borderRadius: 2,
    fontSize: 12,
    padding: '2px 3px',
    margin: '0 8px'
})

interface VacantRoomTopProps {
    name: string;
    area: number;
    minPeople: number;
    maxPeople: number;
    floor: string;
}

export default function VacantRoomTop(props: VacantRoomTopProps) {
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <BoldTypography>{props.name}</BoldTypography>
            <Typography variant='body2' m='0px 8px'>⊿ {props.area}m²</Typography>
            {
                (props.minPeople > 0 || props.maxPeople > 0) &&
                <Typography variant='body2' align='center' m='0px 8px' display='flex'>
                    <People fontSize={'small'}/>
                    {RangeLabel({min: props.minPeople, max: props.maxPeople, unit: '人'})}
                </Typography>
            }
            <FloorWrapper>{props.floor}</FloorWrapper>
        </div>
    );
}