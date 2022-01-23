import React, {useEffect} from "react";
import {Paper, Typography} from "@mui/material";
import ReserveSlotTable from "../molecules/reserveSlotTable";
import SearchDatePicker from "../atoms/searchDatePicker";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {reserveDataState, reserveDateState, reservePriceState, reserveTimeState} from "../atom";
import DateConvert from "../dateConvert";
import BlueButton from "../atoms/blueButton";
import BoldTypography from "../atoms/boldTypography";
import Link from "next/link"

export default function ReservePaper() {
    const [date, setDate] = useRecoilState<Date>(reserveDateState)
    const select = useRecoilValue<{roomIndex: number, startIndex: number, endIndex: number}|null>(reserveTimeState)
    const [price, setPrice] = useRecoilState<number>(reservePriceState)
    const [reserveData, setReserveData] = useRecoilState<{room: string, startTime: string, endTime: string}|null>(reserveDataState)

    const roomSlot: {roomName: string, slots: any[]}[] = [
        {
            roomName: 'A1',
            slots: [{workload: 1, time_begin: '0:00', time_end: '0:30', price: 1000, count: 0},
                {workload: 1, time_begin: '0:30', time_end: '1:00', price: 1000, count: 1},
                {workload: 1, time_begin: '1:00', time_end: '1:30', price: 1000, count: 1}]
        },
        {
            roomName: 'A2',
            slots: [{workload: 1, time_begin: '0:00', time_end: '0:30', price: 1000, count: 1},
                {workload: 1, time_begin: '0:30', time_end: '1:00', price: 1000, count: 1},
                {workload: 1, time_begin: '1:00', time_end: '1:30', price: 1000, count: 1},
                {workload: 1, time_begin: '1:30', time_end: '2:00', price: 1000, count: 1}]
        },
    ]

    const changeDate = (newDate: Date) => {
        setDate(newDate)
    }

    useEffect(() => {

    }, [date])

    useEffect(() => {
        setPrice(0)
        if (select) {
            for (let i = select.startIndex; i <= select.endIndex; i++) {
                setPrice(prevState => prevState + roomSlot[select.roomIndex].slots[i].price)
            }
            setReserveData({
                room: roomSlot[select.roomIndex].roomName,
                startTime: roomSlot[select.roomIndex].slots[select.startIndex].time_begin,
                endTime: roomSlot[select.roomIndex].slots[select.endIndex].time_end
            })
        } else {
            setReserveData(null)
        }
    }, [select])



    return (
        <Paper elevation={0} sx={{m: '12px 0', p: '16px'}}>
            <SearchDatePicker value={date} changeDate={changeDate}/>
            <ReserveSlotTable roomSlot={roomSlot}/>

            <div style={{color: '#5A4628',margin: '12px 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <div style={{display: 'block'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                           <BoldTypography>選択内容&nbsp;:&nbsp;</BoldTypography>
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
               </div>
                <Link href={'/reserve/privacy'}>
                    <BlueButton padding={'4px 16px'} fontSize={16} disabled={!select}>決&nbsp;定</BlueButton>
                </Link>
            </div>
        </Paper>
    );
}