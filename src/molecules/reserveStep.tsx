import React from "react";
import {Step, StepLabel, Stepper, Typography} from "@mui/material";
import {styled} from "@mui/system";

const MyStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-label': {
        color: '#5A462899',
        '&.Mui-active': {
            color: '#5A4628'
        },
        '&.Mui-completed': {
            color: '#5A4628'
        },
    },
    '& .MuiStepLabel-iconContainer': {
        '& .MuiStepIcon-root': {
            color: '#5A462887',
            '&.Mui-active': {
                color: '#1D356A'
            },
            '&.Mui-completed': {
                color: '#1D356A'
            },
        }
    }
})

const MyStep = styled(Step)({
    '& .MuiStepConnector-line': {
        borderColor: '#5A462887'
    }
})

export default function ReserveStep(props: {activeStep: number}) {
    return (
        <Stepper activeStep={props.activeStep} alternativeLabel>
            {
                ['日時選択', 'ご予約者情報入力', '確認', '予約完了'].map((label, index) =>
                    <MyStep key={index}>
                        <MyStepLabel>
                            <Typography sx={{minWidth: 68}}>{label}</Typography>
                        </MyStepLabel>
                    </MyStep>
                )
            }
        </Stepper>
    );
}