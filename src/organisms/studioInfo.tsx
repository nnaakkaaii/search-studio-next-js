import React from "react";
import BoldTypography from "../atoms/boldTypography";
import {Typography} from "@mui/material";

export interface StudioInfoProps {
    intro: string,
    facilities: { "name": string, "count": number, "price": number }[],
    address: {
        "address": string,
        "prefecture": { "id": string, "name": string },
        "city": { "id": string, "name": string },
        "line": { "id": string, "name": string },
        "station": { "id": string, "name": string },
        "exit": { "id": string, "name": string },
        "minutes_from_station": number
    },
    precaution: string,
    url: string
}

function ContentTypography(props: {children: any}) {
    return <Typography variant={'body2'} sx={{pl: 12}}>
        {props.children}
    </Typography>
}

export default function StudioInfo(props: StudioInfoProps) {
    return (
        <div style={{padding: 24, color: '#5A4628'}}>
            <Typography variant={'body2'}>{props.intro}</Typography>
            <BoldTypography sub margin={'16px 0 0'}>スタジオ設備</BoldTypography>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                    props.facilities.map((facility) => (
                        <ContentTypography key={facility.name}>{facility.name}</ContentTypography>
                    ))
                }
            </div>
            <BoldTypography sub margin={'16px 0 0'}>アクセス</BoldTypography>
            <ContentTypography>{props.address.address}</ContentTypography>
            <ContentTypography>
                {props.address.station.name}{props.address.exit.name}{props.address.minutes_from_station}分
            </ContentTypography>
            <BoldTypography sub margin={'16px 0 0'}>注意事項</BoldTypography>
            <ContentTypography>{props.precaution}</ContentTypography>
            <BoldTypography sub margin={'16px 0 0'}>ホームページ</BoldTypography>
            <link href={props.url}/>
        </div>
    );
}