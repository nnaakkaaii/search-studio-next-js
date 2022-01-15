import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {styled} from "@mui/system";

const MySelect = styled(Select)({
    color: "#5A4628",
    fontSize: 14,
    padding: '2px 7px',
})

interface SelectOptionProps {
    label?: any,
    options: any[],
    nullIndex: number,
    unit?: string;
    value: any|null,
    min?: boolean,
    max?: boolean,
    anotherValue?: any,
    onChange: (event: any) => void;
}

export default function SelectOption(props: SelectOptionProps) {
    const {label, options, nullIndex, unit, value, min, max, anotherValue, onChange} = props;

    return (
        <FormControl variant='standard' sx={{m: '0 4px', minWidth: 120}}>
            {
                label && <InputLabel shrink sx={{color: '#5A4628'}}>{label}</InputLabel>
            }
            <MySelect
                value={value ? value : options[nullIndex]}
                onChange={onChange} displayEmpty
                MenuProps={{ PaperProps: { style: {maxHeight: 300} } }}
            >
                {
                    options.map((option: any, index) =>
                        <MenuItem value={option} key={index} sx={{fontSize: 14, color: '#5A4628'}}
                                  disabled={
                                      index !== nullIndex && anotherValue &&
                                      min  ? option >= anotherValue
                                          : max && option <= anotherValue
                                  }>
                            {option}{unit && index !== nullIndex && unit}
                        </MenuItem>
                    )
                }
            </MySelect>
        </FormControl>
    );
}