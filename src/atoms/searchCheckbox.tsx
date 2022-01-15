import React, {useEffect, useState} from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {styled} from "@mui/system";

const MyFormControlLabel = styled(FormControlLabel)({
    margin: 0,
    padding: 0,
    '& .MuiFormControlLabel-label': {
        color: '#5A4628',
        fontSize: 14
    }
})

function count (str:string) {
    let count:number = 0
    for (let i = 0, len = str.length; i < len; i++){
        let c = str.charCodeAt(i)
        if (c >= 0x0 && c <= 0x7f) { // 全角半角判定
            count += 0.5
        } else {
            count += 1
        }
    }
    return count
}

interface SearchCheckboxProps{
    item: any;
    itemName: string;
    parent?: boolean;
    child?: boolean;
    open?: boolean;
    checked: boolean;
    itemChecked: (value: any) => void;
    itemUnChecked: (value: any) => void;
}

export default function SearchCheckbox(props: SearchCheckboxProps) {
    const {item, itemName, parent, child, checked: checkedProp, itemChecked, itemUnChecked} = props;
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(checkedProp)
    }, [checkedProp]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked( event.target.checked );
        event.target.checked ? itemChecked(item) : itemUnChecked(item)
    };

    return (
        <MyFormControlLabel
            onClick={parent ? (event) => event.stopPropagation() : ()=>{}}
            onFocus={parent ? (event) => event.stopPropagation() : ()=>{}}
            style={
                parent ? {} : (child && count(itemName) < 5) ? {width: 100}
                    : (count(itemName) < 8 ? {width: 140} : {width: 280})
            }
            control={
                <Checkbox sx={{p: '4px'}} size='small' checked={checked}
                          onChange={handleChange} value={item} color="primary"/>
            }
            label={itemName}/>
    );
}
