import Studio from "../../templates/studio";
import StudioBreadcrumbs from "../../molecules/studioBreadcrumbs";
import StudioQueryChange from "../../organisms/studioQueryChange";
import PageTitle from "../../atoms/pageTitle";
import BoldTypography from "../../atoms/boldTypography";
import StudioResultCard from "../../organisms/studioResultCard";
import React, {useEffect, useState} from "react";
import {useMedia} from "use-media";
import {initialSearchResult, SearchResult} from "../../seachResultType";
import {useSetRecoilState} from "recoil";
import {
    areaChipState,
    cityChipState, dateChipState, dateMatchState, detailItemChipState, fromStationChipState,
    lineChipState, mirrorChipState, peopleChipState,
    prefectureChipState, priceChipState,
    stationChipState, studioNameState,
    studioSearchPaperOpenState
} from "../../atom";
import {useRouter} from "next/router";
import {FromQuery} from "../../fromQuery";
import {useQuery} from "react-apollo-hooks";
import {GET_STUDIOS} from "../../graphql/tags/getStudios";
import axios from "axios";
import {reserveOptions} from "../../itemsAndOptions/detailOptions";

export default function Home() {
    const isWide = useMedia({ minWidth: "800px" });
    const [searchResult, setSearchResult] = useState(initialSearchResult);

    const setOpen = useSetRecoilState(studioSearchPaperOpenState);
    const setPrefectureChip = useSetRecoilState(prefectureChipState);
    const setCityChip = useSetRecoilState(cityChipState);
    const setLineChip = useSetRecoilState(lineChipState);
    const setStationChip = useSetRecoilState(stationChipState);
    const setStudioName = useSetRecoilState(studioNameState);
    const setAreaChip = useSetRecoilState(areaChipState);
    const setPeopleChip = useSetRecoilState(peopleChipState);
    const setDateChip = useSetRecoilState(dateChipState);
    const setDateMatch = useSetRecoilState(dateMatchState);
    const setFromStationChip = useSetRecoilState(fromStationChipState);
    const setPriceChip = useSetRecoilState(priceChipState);
    const setMirrorChip = useSetRecoilState(mirrorChipState);
    const setDetailItemChip = useSetRecoilState(detailItemChipState);

    const search = useRouter().asPath.substring(8);
    const query = FromQuery();

    const { data, error, loading } = useQuery(GET_STUDIOS, {
        variables: {},
    });

    useEffect(() => {
        //setSearchResult(data)
        axios.get('http://localhost:5000/studios/' + search)
            .then(response => {
                setSearchResult(response.data)
            });

        setOpen(false);
        setPrefectureChip(query.prefecture);
        setCityChip(query.city);
        setLineChip(query.line);
        setStationChip(query.station);
        setStudioName(query.studioName);
        setAreaChip({min: query.areaMin, max: query.areaMax});
        setPeopleChip({min: query.peopleMin, max: query.peopleMax});
        setDateChip(query.date);
        setDateMatch(query.dateMatch);
        setFromStationChip(query.fromStation);
        setPriceChip({min: query.priceMin, max: query.priceMax});
        setMirrorChip({min:  query.mirrorMin, max: query.mirrorMax});
        setDetailItemChip([...query.reservation, ...query.studioFacility, ...query.floorMaterial, ...query.roomFacility]);
        query.freeCancel && setDetailItemChip(prevState => [...prevState, 'キャンセル無料期間あり']);
        query.halfHourSlot && setDetailItemChip(prevState => [...prevState, reserveOptions[0]]);
        query.fromHalfHour && setDetailItemChip(prevState => [...prevState, reserveOptions[1]]);
    },[])

    return (
        <Studio>
            <StudioBreadcrumbs crumbs={[{label: '検索結果一覧'}]}/>
            <div style={isWide ? {display: 'flex', padding: '0 36px 24px'} : {padding: '8px 24px 24px'}}>
                    <StudioQueryChange isWide={isWide}/>
                    <div style={isWide ? {flexGrow: 3} : {}}>
                        <PageTitle margin={isWide ? '12px 0 0' : '36px 0 0'} center>検索結果</PageTitle>
                        <BoldTypography sub center>全{searchResult.total_pages}件</BoldTypography>
                        {
                            searchResult.studios.map((studio, index) =>
                                <StudioResultCard studio={studio} search={search} isWide={isWide} key={index}/>
                            )
                        }
                        {
                            searchResult.studios.map((studio, index) =>
                                <StudioResultCard studio={studio} search={search} isWide={isWide} key={index}/>
                            )
                        }
                    </div>
                </div>
        </Studio>
    )
}
