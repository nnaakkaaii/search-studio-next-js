import React from "react";
import StudioResultCardTop from "../molecules/studioResultCardTop";
import RoomTop from "../molecules/roomTop";
import Link from 'next/link';
import {StudioType} from "../seachResultType";
import ImgCarousel from "../atoms/imgCarousel";
import SlotTable from "../molecules/slotTable";
import StudioResultCardDetail from "../atoms/studioResultCardDetail";
import SlotTime from "../molecules/slotTime";
import SmallTypography from "../atoms/smallTypography";
import {styled} from "@mui/system";
import {Card, CardActionArea, CardContent} from "@mui/material";

const MyCardContent = styled(CardContent)({
    color: "#5A4628",
    padding: '12px 20px',
    '&:last-child': {
        paddingBottom: 12
    }
})

interface StudioResultCardProps {
    studio: StudioType,
    search: string,
    isWide: boolean
}

export default function StudioResultCard(props: StudioResultCardProps) {
    const {studio} = props;
    const restRoom = studio.room_count - studio.rooms.length;

    return (
        <Card style={props.isWide ? {boxShadow: 'none', minWidth: 420, maxWidth: 800, margin: '12px auto'} : {boxShadow: 'none', minWidth: 250, maxWidth: 600, margin: '12px auto'}}>
            <Link href={`/studios/${studio.studio_id}${props.search}`} passHref>
                <CardActionArea>
                    <MyCardContent>
                        <StudioResultCardTop studio={studio.studio_name} station={studio.address.station.name}
                                             exit={studio.address.exit.name} fromStation={studio.address.minutes_from_station}/>
                        {
                            studio.rooms.map((room, index) =>
                                <div key={index} style={{padding: '8px 0'}}>
                                    <RoomTop room={room.room_name} floorArea={room.floor_area}/>
                                    <ImgCarousel img={room.room_img} indicators/>
                                    <SlotTable slots={room.slots}/>
                                    <SlotTime minutes={room.min_reserve_minutes}/>
                                </div>
                            )
                        }
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <SmallTypography bold>{restRoom > 0 ? `他${restRoom}部屋` : null}</SmallTypography>
                            <StudioResultCardDetail/>
                        </div>
                    </MyCardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
}