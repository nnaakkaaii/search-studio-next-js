import DateConvert from "../dateConvert";
import SearchChip from "../atoms/searchChip";
import {styled} from "@mui/system";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import SlotTableTime from "../atoms/slotTableTime";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {reserveTimeState} from "../atom";

const DateTableCell = styled(TableCell)({
    fontSize: 12,
    textAlign: 'center',
    minWidth: 60,
    width: 60,
    maxWidth: 60,
    color: '#5A4628',
    padding: 4,
    borderRight: '1px solid #D7D2C8'
})

const MyTableCell = styled(TableCell)({
    minWidth: 20,
    width: 20,
    zIndex: 100,
    padding: 0,
    textAlign: 'center',
    fontSize: 16,
    borderRight: '1px solid #D7D2C8',
    '&:last-child': {
        paddingRight: 0
    }
})

const MyTableRow = styled(TableRow)({
    height: 28,
    border: '1px solid #D7D2C8'
})

interface ReserveSlotTableProps {
    roomSlot: {
        roomName: string,
        slots: {
            workload: number,
            time_begin: string,
            time_end: string,
            price: number,
            count: number,
        }[]
    }[];
}

export default function ReserveSlotTable(props: ReserveSlotTableProps) {
    const [select, setSelect] = useRecoilState<{roomIndex: number, startIndex: number, endIndex: number}|null>(reserveTimeState)

    const changeColored = (newSelect: {roomIndex: number, slotIndex: number}) => () => {
        if (select && select.startIndex === select.endIndex) {//選択枠1つ
            setSelect(null)
        } else if (select && select.startIndex === newSelect.slotIndex) {//選択枠先頭
            setSelect(prevState => ({roomIndex: prevState.roomIndex, startIndex: newSelect.slotIndex + 1, endIndex: prevState.endIndex}))
        } else　{//選択枠先頭以外
            setSelect(prevState => ({roomIndex: prevState.roomIndex, startIndex: prevState.startIndex, endIndex: newSelect.slotIndex - 1}))
        }　
    }

    const changeUncolored = (newSelect: {roomIndex: number, slotIndex: number}) => () => {
        if (!select || select.roomIndex !== newSelect.roomIndex) {//選択枠がなしor選択枠のroomと違う
            setSelect({roomIndex: newSelect.roomIndex, startIndex: newSelect.slotIndex, endIndex: newSelect.slotIndex})
        } else if (select.startIndex < newSelect.slotIndex) {//選択枠より後ろ
            setSelect(prevState => ({roomIndex: prevState.roomIndex, startIndex: prevState.startIndex, endIndex: newSelect.slotIndex}))
        } else {//選択枠より前
            setSelect(prevState => ({roomIndex: prevState.roomIndex, startIndex: newSelect.slotIndex, endIndex: prevState.endIndex}))
        }
    }

    return (
        <TableContainer sx={{overflow: 'scroll'}}>
            <Table>
                <TableHead>
                    <SlotTableTime/>
                </TableHead>
                <TableBody>
                    {
                        props.roomSlot.map((room, index) =>
                            <MyTableRow key={index}>
                                <DateTableCell size='small'>
                                    {room.roomName}
                                </DateTableCell>
                                {
                                    room.slots.map((slot, idx) =>
                                        slot.count === 0 ?
                                            <MyTableCell key={idx} size='small' sx={{bgcolor: '#D7D2C8', color: '#5A4628'}}>
                                                ×
                                            </MyTableCell>
                                            : (select && index === select.roomIndex && idx >= select.startIndex && idx <= select.endIndex) ?
                                                <MyTableCell sx={{bgcolor: '#1D356A', color: 'white'}}
                                                             onClick={changeColored({roomIndex: index, slotIndex: idx})}
                                                             key={idx} size='small'>
                                                    ○
                                                </MyTableCell>
                                                :
                                                <MyTableCell sx={{color: '#5A4628'}} onClick={changeUncolored({roomIndex: index, slotIndex: idx})} key={idx} size='small'>
                                                    ○
                                                </MyTableCell>
                                    )
                                }
                            </MyTableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}