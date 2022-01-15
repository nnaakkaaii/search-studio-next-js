import 'date-fns';
import React from 'react';
import {styled} from "@mui/system";
import DatePicker from '@mui/lab/DatePicker';
import {Button, TextField} from "@mui/material";
import {CalendarPicker, LocalizationProvider, MobileDatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ja from "date-fns/locale/ja";
import DateConvert from "../dateConvert";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const MyButton = styled(Button)({
    color: "#5A4628",
    borderBottom: '1px solid #5A4628',
    borderRadius: 0,
    margin: '0 4px 8px',
    padding: '4px 8px',
})

const MyCalendarPicker = styled(CalendarPicker)({
    maxHeight: 330,
    width: 280,
    marginTop: -20,
})

interface SearchDatePickerProps {
    value: any;
    changeDate: (value: Date|null) => void;
}

export default function SearchDatePicker(props: SearchDatePickerProps) {
    const [open, setOpen] = React.useState(false)

    const onChange = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ja}>
            <MyButton onClick={onChange}>
                { props.value !== null ? DateConvert(props.value) : '日付を選択' }
                { open ? <ExpandLess sx={{ml: '12px'}}/> : <ExpandMore sx={{ml: '12px'}}/> }
            </MyButton>
            <div style={open ? {} : {display: 'none'}}>
                <MyCalendarPicker
                    views={['day']}
                    minDate={new Date()}
                    maxDate={new Date().setMonth(new Date().getMonth() + 2)}
                    date={props.value} onChange={props.changeDate} />
            </div>
        </LocalizationProvider>
    );
}