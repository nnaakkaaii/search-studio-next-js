import DateConvert from "../dateConvert";
import SearchChip from "../atoms/searchChip";
import {styled} from "@mui/system";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const TimeTableCell = styled(TableCell)({
    color: '#5A4628',
    fontSize: 8,
    padding: 0
})

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

const PriceTableCell = styled(TableCell)({
    minWidth: 20,
    width: 20,
    zIndex: 100,
    color: '#5A4628',
    padding: 0,
    borderRight: '1px solid #D7D2C8',
    '&:last-child': {
        paddingRight: 0
    }
})


const MyTableRow = styled(TableRow)({
    height: 28,
    border: '1px solid #D7D2C8'
})

const ChipCellWrapper = styled('div')({
    position: 'relative',
    width: 20,
    zIndex: 10
})

const NormalCellWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%'
})

const times = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' 10', '11'
]

interface SlotTableProps {
   slots: {
        workload: number,
        time_begin: number,
        time_end: number,
        price: number,
        count: number,
    }[];
}

export default function SlotTable(props: SlotTableProps) {
    return (
        <TableContainer sx={{m: 4, overflow: 'scroll'}}>
            <Table>
                <TableHead>
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
                </TableHead>
                <TableBody>
                    <MyTableRow>
                        <DateTableCell size='small'>
                            {DateConvert(props.slots[0].time_begin * 1000)}
                        </DateTableCell>
                        {
                            props.slots.map((slot, index, array) =>
                                <PriceTableCell key={index} size='small'>
                                {
                                    (!array[index-1] || slot.price !== array[index-1].price) ?
                                        <ChipCellWrapper>
                                            <SearchChip key={index} label={slot.price} after={'円'}/>
                                        </ChipCellWrapper>
                                        :
                                        <NormalCellWrapper>
                                            <hr color='#5A4628' style={{width: '100%', zIndex: 1}}/>
                                            {
                                                (!array[index+1] || slot.price !== array[index+1].price) &&
                                                <div style={{marginLeft: -4}}>▶︎</div>
                                            }
                                        </NormalCellWrapper>
                                }
                                </PriceTableCell>
                            )
                        }
                    </MyTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}