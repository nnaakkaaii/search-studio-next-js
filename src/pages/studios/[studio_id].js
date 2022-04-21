import Studio from "../../templates/studio";
import StudioBreadcrumbs from "../../molecules/studioBreadcrumbs";
import Link from "next/link";
import PageTitle from "../../atoms/pageTitle";
import ImgCarousel from "../../atoms/imgCarousel";
import VacantRoomPaper from "../../organisms/vacantRoomPaper";
import StudioMenuTab from "../../organisms/studioMenuTab";
import VacantRoom from "../../organisms/vacantRoom";
import React, {useEffect, useState} from "react";
import StudioInfo from "../../organisms/studioInfo";
import {useRouter} from "next/router";
import {useQuery} from "react-apollo-hooks";
import {GET_STUDIOS} from "../../graphql/tags/getStudios";
import {initialStudio, StudioType} from "../../seachResultType";
import {useMedia} from "use-media";
import axios from "axios";
import {useWindowSize} from "react-use";
import {styled} from "@mui/system";

const TitleWrapper = styled('div')({
    position: 'fixed',
    zIndex: 1000
})

export default function Home() {
    const search = useRouter().asPath;
    const { data, error, loading } = useQuery(GET_STUDIOS, {
        variables: {},
    });
    const [studio, setStudio] = useState(initialStudio);
    const isHeaderWide = useMedia({ minWidth: "600px" });
    const isWide = useMedia({ minWidth: "800px" });
    const [imgTop, setImgTop] = useState(80-107)
    const [barTop, setBarTop] = useState(75+107)

    useEffect(() => {
        //setStudio(data)
        axios.get('http://localhost:5000/studios/?studio_id=' + search.substring(9).replace('?', '&'))
            .then(response => {
                setStudio(response.data)
            });
    })

    const {width, height} = useWindowSize()

    useEffect(() => {
        if (width >= 321) {
            setImgTop(80 - width / 3)
            setBarTop(75 + width / 3)
        }
    }, [width])

    function StudioInformation() {
        return <StudioInfo intro={studio.studio_introduction} facilities={studio.studio_facilities}
                           address={studio.address} precaution={studio.studio_precaution} url={studio.homepage_url}/>
    }

    return (
        <Studio>
            <>
                <StudioBreadcrumbs crumbs={[{label: '検索結果一覧', link: `/studios/${search.substring(9 + studio.studio_id.length)}`}, {label: 'studio_name'}]}/>
                <TitleWrapper sx={isHeaderWide ? {top: 92} : {top: 84}}>
                    <PageTitle margin={ '0 8px'}>studio_name{studio.studio_name}</PageTitle>
                </TitleWrapper>
                {
                    isWide ?
                        <div style={{display: 'flex', padding: '60px 12px 12px'}}>
                            <div style={{flexGrow: 1, overflow: 'scroll', height: height - 140}}>
                                <ImgCarousel img={studio.studio_img}/>
                                <StudioInformation/>
                            </div>
                            <VacantRoomPaper rooms={studio.rooms} height={height}/>
                        </div>

                        :
                        <div style={{paddingTop: '60px'}}>
                            <div style={{marginBottom: 10, position: 'sticky', top: imgTop, zIndex: 100}}>
                                <ImgCarousel img={studio.studio_img}/>
                            </div>
                            <StudioMenuTab barTop={barTop}>
                                {studio.rooms.map((room, index) => <VacantRoom room={room} key={index}/>)}
                                <StudioInformation/>
                            </StudioMenuTab>
                        </div>
                }
            </>
        </Studio>
    )
}
