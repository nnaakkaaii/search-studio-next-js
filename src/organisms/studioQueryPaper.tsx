import React, {useEffect} from "react";
import StudioQueryChip from "../molecules/studioQueryChip";
import OutlineButton from "../atoms/outlineButton";
import {useRecoilState, useRecoilValue} from "recoil";
import {dateOpenState, detailOpenState, placeOpenState, spaceOpenState, studioSearchPaperOpenState} from "../atom";
import BoldTypography from "../atoms/boldTypography";
import BlueButton from "../atoms/blueButton";
import {styled} from "@mui/system";
import {Paper} from "@mui/material";

const MyPaper = styled(Paper)({
    color: "#5A4628",
    margin: '0 auto 8px',
    padding: '4px 6px 2px 8px',
    minWidth: 240,
    maxWidth: 360,
    height: 34,
    display: 'flex',
    alignItems: 'center',
    boxShadow:'1px 4px 4px #F9F5F0',
})

export default function StudioQueryPaper(props: {isWide?: boolean}) {
    const {isWide} = props;
    const [open, setOpen] = useRecoilState(studioSearchPaperOpenState);
    const placeOpen = useRecoilValue(placeOpenState);
    const spaceOpen = useRecoilValue(spaceOpenState);
    const dateOpen = useRecoilValue(dateOpenState);
    const detailOpen = useRecoilValue(detailOpenState);

    useEffect(() => {
        if (placeOpen || spaceOpen || dateOpen || detailOpen) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [isWide]);

    const handleClick = () => {
        setOpen(prevState => !prevState)
    };

    return (
        <MyPaper>
            <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <div style={{minWidth: 60}}>
                    <BoldTypography sub center>検索条件</BoldTypography>
                </div>
                <StudioQueryChip/>
                {
                    !props.isWide &&
                    (open ? <OutlineButton onClick={handleClick}>閉じる</OutlineButton>
                        : <BlueButton padding={0} margin={4} onClick={handleClick}>変更</BlueButton>)
                }
            </div>
        </MyPaper>
    );
}