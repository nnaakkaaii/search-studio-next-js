import {useRecoilValue} from "recoil";
import {reserveDataState, reserveDateState, reservePriceState} from "../atom";
import BoldTypography from "../atoms/boldTypography";
import DateConvert from "../dateConvert";
import {Typography} from "@mui/material";

export default function ReserveData(props: {select?: boolean}) {
    const date = useRecoilValue<Date>(reserveDateState)
    const price = useRecoilValue<number>(reservePriceState)
    const reserveData = useRecoilValue<{room: string, startTime: string, endTime: string}|null>(reserveDataState)

    return (
        <div style={{color: '#5A4628'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BoldTypography>{props.select ? '選択' : '予約'}内容&nbsp;:&nbsp;</BoldTypography>
                {
                    reserveData &&
                    <Typography>
                        {reserveData.room} {DateConvert(date)} {reserveData.startTime}~{reserveData.endTime}
                    </Typography>
                }
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <BoldTypography>合計&nbsp;:&nbsp;</BoldTypography>
                <Typography> {price}円</Typography>
            </div>
        </div>
    )
}
