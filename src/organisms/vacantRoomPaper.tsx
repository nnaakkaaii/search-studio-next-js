import React from "react";
import VacantRoom from "../organisms/vacantRoom";
import {Paper} from "@mui/material";
import BoldTypography from "../atoms/boldTypography";
import {Room} from "../seachResultType";

export default function VacantRoomPaper(props: {rooms: Room[], height: number}) {
    return (
        <Paper elevation={0} sx={{flexGrow: 1, minWidth: '50%', m: '0 12px 12px'}}>
            <div style={{margin: '8px 0', overflow: 'scroll', height: props.height - 160}}>
                <BoldTypography center margin={4}>?</BoldTypography>
                {
                    props.rooms.map((room,index) =>
                        <VacantRoom room={room} key={index}/>
                    )
                }
            </div>
        </Paper>
    );
}