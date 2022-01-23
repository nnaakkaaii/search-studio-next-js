import React from "react";
import {Paper, Typography} from "@mui/material";
import Link from "next/link";
import BlueButton from "../atoms/blueButton";
import BoldTypography from "../atoms/boldTypography";
import DateConvert from "../dateConvert";
import {useRecoilState, useRecoilValue} from "recoil";
import {reserveDataState, reserveDateState, reservePriceState, reserveTimeState} from "../atom";

export default function ConfirmPaper() {
    const date = useRecoilValue<Date>(reserveDateState)
    const price = useRecoilValue<number>(reservePriceState)
    const reserveData = useRecoilValue<{room: string, startTime: string, endTime: string}|null>(reserveDataState)

    return (
        <Paper elevation={0} sx={{m: '12px 0', p: '16px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BoldTypography>予約内容&nbsp;:&nbsp;</BoldTypography>
                {
                    reserveData &&
                    <Typography>
                        {reserveData.room} {DateConvert(date)} {reserveData.startTime}~{reserveData.endTime}
                    </Typography>
                }
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BoldTypography>合計&nbsp;:&nbsp;</BoldTypography>
                <Typography> {price}円</Typography>
            </div>
            上記内容で予約します
            <Link href={'/reserve/done'}>
                <BlueButton padding={'4px 16px'} margin={'0 auto'} fontSize={16}>決&nbsp;定</BlueButton>
            </Link>
        </Paper>
    );
}