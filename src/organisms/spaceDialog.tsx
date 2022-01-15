import React from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {areaChipState, maxAreaState, maxPeopleState, minAreaState, minPeopleState, peopleChipState, spaceOpenState} from "../atom";
import StudioDialog from "../molecules/studioDialog";
import MinMaxSelect from "../molecules/minMaxSelect";
import {maxAreaOptions, maxPeopleOptions, minAreaOptions, minPeopleOptions} from "../itemsAndOptions/spaceOptions";
import BoldTypography from "../atoms/boldTypography";

export default function SpaceDialog() {
    const [spaceOpen, setSpaceOpen] = useRecoilState<boolean>(spaceOpenState);
    const [minArea, setMinArea] = useRecoilState<number|null>(minAreaState);
    const [maxArea, setMaxArea] = useRecoilState<number|null>(maxAreaState);
    const [minPeople, setMinPeople] = useRecoilState<number|null>(minPeopleState);
    const [maxPeople, setMaxPeople] = useRecoilState<number|null>(maxPeopleState);
    const setAreaChip = useSetRecoilState<{min: number|null, max: number|null}>(areaChipState);
    const setPeopleChip = useSetRecoilState<{min: number|null, max: number|null}>(peopleChipState);

    const spaceOk = () => {
        setSpaceOpen(false);
        setAreaChip({min: minArea, max: maxArea});
        setPeopleChip({min: minPeople, max: maxPeople});
    };

    const spaceCancel = () => {
        setSpaceOpen(false);
    };

    const changeMinArea = (event: any) => {
        event.target.value === minAreaOptions[0] ? setMinArea(null) : setMinArea(event.target.value)
    };

    const changeMaxArea = (event: any) => {
        event.target.value === maxAreaOptions[0] ? setMaxArea(null) : setMaxArea(event.target.value)
    };

    const changeMinPeople = (event: any) => {
        event.target.value === minPeopleOptions[0] ? setMinPeople(null) : setMinPeople(event.target.value)
    };

    const changeMaxPeople = (event: any) => {
        event.target.value === maxPeopleOptions[0] ? setMaxPeople(null) : setMaxPeople(event.target.value)
    };

    return (
        <StudioDialog open={spaceOpen} handleCancel={spaceCancel} handleOk={spaceOk} padding={'20px'}>
            <BoldTypography>面積</BoldTypography>
            <MinMaxSelect min={minArea} max={maxArea}
                          minOptions={minAreaOptions} maxOptions={maxAreaOptions} unit={'m²'}
                          minNullIndex={0} maxNullIndex={0} changeMin={changeMinArea} changeMax={changeMaxArea}/>
            <BoldTypography margin={'8px 0 0'}>人数</BoldTypography>
            <MinMaxSelect min={minPeople} max={maxPeople}
                          minOptions={minPeopleOptions} maxOptions={maxPeopleOptions}　unit={'人'}
                          minNullIndex={0} maxNullIndex={0} changeMin={changeMinPeople} changeMax={changeMaxPeople}/>
        </StudioDialog>
    );
}