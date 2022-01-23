import {styled} from "@mui/system";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const TimeTableCell = styled(TableCell)({
    color: '#5A4628',
    fontSize: 8,
    padding: 0
})

export default function SlotTableTime() {
    const times = []
    for (let i = 0; i<25; i++) {
        times.push(i)
    }

    return (
        <TableRow>
            <TableCell size='small'> </TableCell>
            {
                times.map((time) =>
                    <TimeTableCell key={time} colSpan={2} align='left' size='small'>
                        {time}
                    </TimeTableCell>
                )
            }
        </TableRow>
    )
}