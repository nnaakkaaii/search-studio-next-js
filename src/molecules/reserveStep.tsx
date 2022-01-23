import React from "react";
import {Step, StepLabel, Stepper, Typography} from "@mui/material";

export default function ReserveStep(props: {activeStep: number}) {
    return (
        <Stepper activeStep={props.activeStep} alternativeLabel>
            {
                ['日時選択', 'ご予約者情報入力', '確認', '予約完了'].map((label, index) =>
                    <Step key={index}><StepLabel><Typography sx={{color: '#5A4628', minWidth: 68}}>
                        {label}
                    </Typography></StepLabel></Step>)
            }
        </Stepper>
    );
}