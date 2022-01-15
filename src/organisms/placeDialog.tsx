import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    placeOpenState, prefectureCityState, prefectureChipState, cityChipState,
    lineChipState, stationChipState, lineStationState
} from "../atom";
import StudioDialog from "../molecules/studioDialog";
import {prefItem} from "../itemsAndOptions/prefItems";
import {lineItem} from "../itemsAndOptions/lineItems";
import MenuTab from "../molecules/menuTab";
import PrefAccordion from "./prefAccordion";
import LineAccordion from "./lineAccordion";
import {styled} from "@mui/system";

const TabDiv = styled('div')({
    backgroundColor: '#F9F5F0',
    color: "#5A4628",
    flexGrow: 1,
    height: '80vh'
})

export default function PlaceDialog() {
    const [placeOpen, setPlaceOpen] = useRecoilState<boolean>(placeOpenState);
    const prefectureCity = useRecoilValue<{name: string, id: string}[]|any[]>(prefectureCityState);
    const setPrefectureChip = useSetRecoilState<{name: string, id: string}[]|any[]>(prefectureChipState);
    const setCityChip = useSetRecoilState<{name: string, id: string}[]|any[]>(cityChipState);
    const lineStation = useRecoilValue<{name: string, id: string}[]|any[]>(lineStationState);
    const setLineChip = useSetRecoilState<{name: string, id: string}[]|any[]>(lineChipState);
    const setStationChip = useSetRecoilState<{name: string, id: string}[]|any[]>(stationChipState);

    const placeOk = () => {
        setPlaceOpen(false);

        //pref(line)が入っていたら追加、なくてcity(station)が入っていたら追加
        setPrefectureChip([]);
        setCityChip([]);
        prefItem.map((item) =>
            prefectureCity.includes(item.pref) ? setPrefectureChip(prevState => [...prevState, item.pref]) :
                item.cities.map((city) =>
                    prefectureCity.includes(city) && setCityChip(prevState => [...prevState, city])
                )
        );

        setLineChip([]);
        setStationChip([]);
        lineItem.map((item) =>
            lineStation.includes(item.line) ? setLineChip(prevState => [...prevState, item.line]) :
                item.stations.map((station) =>
                    lineStation.includes(station) && setStationChip(prevState => [...prevState, station])
                )
        );
    };

    const placeCancel = () => {
        setPlaceOpen(false);
    };

    return (
        <StudioDialog open={placeOpen} handleCancel={placeCancel} handleOk={placeOk} padding={0}>
            <TabDiv>
                <MenuTab labels={["エリア", "沿線・駅"]} tabFontSize={14} tabFlexGrow={.5} tabMinHeight={32}>
                    <PrefAccordion/>
                    <LineAccordion/>
                </MenuTab>
            </TabDiv>
        </StudioDialog>
    );
}