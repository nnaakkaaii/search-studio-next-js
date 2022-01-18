import React from "react";
import ImgCarousel from "../atoms/imgCarousel";
import SlotTable from "../molecules/slotTable";
import SlotTime from "../molecules/slotTime";
import VacantRoomTop from "../molecules/vacantRoomTop";
import StudioReserveButton from "../atoms/studioReserveButton";
import SearchChip from "../atoms/searchChip";
import Image from "next/image";

type Room = {
            "room_name": string,
            "floor_area": number,
            "mirror_length": number,
            "min_people": number,
            "max_people": number,
            "room_img": {
                    "name": string,
                    "description": string,
                    "path": string
                }[],
            "free_cancel": boolean,
            "reservation": string[],
            "room_facilities": {
                    "name": string,
                    "count": number,
                    "price": number
                }[],
            "amenities": {
                    "name": string,
                    "count": number,
                    "price": number
                }[],
            "floor_material": string,
            "slots": {
                    "workload": number,
                    "time_begin": number,
                    "time_end": number,
                    "price": number,
                    "count": number
                }[],
            "min_reserve_minutes": number,
            "reserve_url": string
        }

export default function VacantRoom(props: {room: Room}) {
    const {room} = props;
    const items = [...room.room_facilities, ...room.amenities];

    return (
        <div style={{padding: '24px', color: '#5A4628', zIndex: 1}}>
            <VacantRoomTop name={room.room_name} area={room.floor_area}
                           minPeople={room.min_people} maxPeople={room.max_people} floor={room.floor_material}/>
            <div style={{display: 'flex', marginBottom: 4}}>
                {
                    items.map((item, index) => <SearchChip key={index} label={item.name}/>)
                }
            </div>
            <ImgCarousel img={room.room_img}/>
            <SlotTable slots={room.slots}/>
            <SlotTime minutes={room.min_reserve_minutes}/>
            <div style={{display: 'flex'}}>
                <StudioReserveButton/>
            </div>
        </div>
    );
}