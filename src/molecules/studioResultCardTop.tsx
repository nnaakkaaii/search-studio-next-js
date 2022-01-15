import {Place} from "@mui/icons-material";
import BoldTypography from "../atoms/boldTypography";
import SmallTypography from "../atoms/smallTypography";
import {styled} from "@mui/system";

const CustomDiv = styled('div')({
    padding: '0px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #D7D2C8',
    margin: '0 -8px'
})

interface StudioResultCardTopProps {
    studio: string;
    station: string;
    exit: string;
    fromStation: number;
}

export default function StudioResultCardTop(props: StudioResultCardTopProps) {
    return (
        <CustomDiv>
            <BoldTypography>{props.studio}</BoldTypography>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Place fontSize='small'/>
                <SmallTypography>
                    {props.station}{props.exit}徒歩{props.fromStation}分
                </SmallTypography>
            </div>
        </CustomDiv>
    );
}