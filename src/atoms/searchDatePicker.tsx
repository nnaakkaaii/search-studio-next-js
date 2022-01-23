import 'date-fns';
import React from 'react';
import {styled} from "@mui/system";
import DatePicker from '@mui/lab/DatePicker';
import {Button, Popover, TextField} from "@mui/material";
import {CalendarPicker, LocalizationProvider, MobileDatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ja from "date-fns/locale/ja";
import DateConvert from "../dateConvert";
import {CalendarToday, ExpandLess, ExpandMore} from "@mui/icons-material";

const MyButton = styled(Button)({
    color: "#5A4628",
    borderBottom: '1px solid #5A4628',
    borderRadius: 0,
    margin: '0 4px 8px',
    padding: '4px 8px',
    width: 140,
    justifyContent: 'space-between'
})

const MyCalendarPicker = styled(CalendarPicker)({
    maxHeight: 330,
    overflow: 'hidden'
})

interface SearchDatePickerProps {
    value: any;
    changeDate: (value: Date|null) => void;
}

export default function SearchDatePicker(props: SearchDatePickerProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <MyButton onClick={handleClick}>
                { props.value !== null ? DateConvert(props.value) : '日付を選択' }
                <CalendarToday/>
            </MyButton>
            <Popover open={open}
                     anchorEl={anchorEl}
                     onClick={handleClose}
                     anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <div onClick={(e) => {e.stopPropagation()}}>
                    <MyCalendarPicker
                        views={['day']}
                        minDate={new Date()}
                        maxDate={new Date().setMonth(new Date().getMonth() + 2)}
                        date={props.value} onChange={props.changeDate} />
                </div>
                <Button sx={{width: '100%'}}>閉じる</Button>
            </Popover>
        </LocalizationProvider>
    );
}