import StudioReserve from "../../templates/studioReserve";
import SearchDatePicker from "../../atoms/searchDatePicker";
import ReserveSlotTable from "../../molecules/reserveSlotTable";
import Link from "next/link";
import BlueButton from "../../atoms/blueButton";
import React, {useEffect} from "react";
import {useRecoilState, useSetRecoilState, useRecoilValue} from "recoil";
import {reserveDataState, reserveDateState, reservePriceState, reserveTimeState} from "../../atom";
import ReserveData from "../../molecules/reserveData";
import {useRouter} from "next/router";

export default function Home() {
    const query = useRouter().query;
    const [date, setDate] = useRecoilState(reserveDateState)
    const select = useRecoilValue(reserveTimeState)
    const setPrice = useSetRecoilState(reservePriceState)
    const setReserveData = useSetRecoilState(reserveDataState)

    const roomSlot = [//仮
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

    const changeDate = (newDate) => {
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
        <StudioReserve step={0}>
            <SearchDatePicker value={date} changeDate={changeDate}/>
            <ReserveSlotTable roomSlot={roomSlot}/>
            <div style={{margin: '12px 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <ReserveData select/>
                <Link href={{pathname: '/reserve/privacy', query: query}} passHref>
                    <BlueButton padding={'4px 16px'} fontSize={16} disabled={!select}>決&nbsp;定</BlueButton>
                </Link>
            </div>
        </StudioReserve>
    )
}
