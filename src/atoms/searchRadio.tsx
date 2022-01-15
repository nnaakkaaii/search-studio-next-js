import {styled} from "@mui/system";
import {FormControl, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";


const RadioDiv = styled('div')({
    color: "#5A4628",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
})

const MyFormControlLabel = styled(FormControlLabel)({
    margin: '0 4px',
    '&.MuiTypography': {
        fontSize: 10
    }
})

interface SearchRadioProps {
    beforeTyp?: string,
    afterTyp?: string,
    value: any,
    options: string[],
    handleChange: (event: any) => void
}

export default function SearchRadio(props: SearchRadioProps) {
    return (
        <RadioDiv>
            {
                props.beforeTyp && <Typography variant={'caption'}>{props.beforeTyp}</Typography>
            }
            <FormControl component="fieldset" sx={{mr: '8px'}}>
                <RadioGroup row aria-label="dateMatch" name="dateMatch" value={props.value} onChange={props.handleChange}>
                    {
                        props.options.map((option, index) =>
                            <MyFormControlLabel
                                key={index} value={option}
                                control={<Radio sx={{p: '4px'}} color='primary' size='small'/>}
                                label={<Typography variant="body2">{option}</Typography>}
                            />
                        )
                    }
                </RadioGroup>
            </FormControl>
            {
                props.afterTyp && <Typography variant={'caption'}>{props.afterTyp}</Typography>
            }
        </RadioDiv>
    );
}
