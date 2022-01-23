import React, {useEffect, useState} from "react";
import ImgCarousel from "../atoms/imgCarousel";
import VacantRoom from "../organisms/vacantRoom";
import StudioInfo from "../organisms/studioInfo";
import PageTitle from "../atoms/pageTitle";
import {useMedia} from "use-media";
import VacantRoomPaper from "../organisms/vacantRoomPaper";
import StudioMenuTab from "../organisms/studioMenuTab";
import Link from "next/link";
import {useRouter} from 'next/router';
import axios from "axios";
import {initialStudio, StudioType} from "../seachResultType";
import BlueButton from "../atoms/blueButton";
import {styled} from "@mui/system";
import {useWindowSize} from "react-use";
import {useQuery} from "react-apollo-hooks";
import { GET_STUDIOS } from "../graphql/tags/getStudios";
import {Breadcrumbs, Button, Typography} from "@mui/material";
import StudioBreadcrumbs from "../molecules/studioBreadcrumbs";
import BoldButton from "../atoms/boldButton";

const TitleWrapper = styled('div')({
    position: 'sticky',
    top: 128,
    zIndex: 1000
})

export default function Studio() {
    const search = useRouter().asPath;
    const { data, error, loading } = useQuery(GET_STUDIOS, {
        variables: {},
    });
    const [studio, setStudio] = useState<StudioType>(initialStudio);
    const isSmall = useMedia({ maxWidth: "560px" });
    const isWide = useMedia({ minWidth: "800px" });
    const [imgTop, setImgTop] = React.useState<number>(80-107)
    const [barTop, setBarTop] = React.useState<number>(75+107)

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

    {/**
        const carousel = <div style={{
            position: 'sticky',
            top: 100,
            height: 100,
            zIndex: 100,
            filter:'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}><ImgCarousel img={studio.studio_img}/></div>
        const blur = <>
            <Box style={{
                backgroundColor: '#F9F5F0',
                position: 'fixed',
                height: 120,
                width: '100%',
                top: 100,
                zIndex: 10
            }}/>
            <div className={classes.blurImg}><img alt={'img'} src={studio.studio_img[0].path}/></div>
        </>

        const [img, setImg] = React.useState<React.ReactNode>(carousel)

        window.addEventListener('scroll', function () {
            if (window.pageYOffset < 50 && img !== carousel) {
                setImg(carousel)
            } else if (window.pageYOffset > 150 && img === carousel) {
                setImg(blur)
            }
        })
    */}

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onresize = function() {
                console.log(window.innerWidth)
            }
        }
    })

    return (
        <>
            <StudioBreadcrumbs>
                <Link href={`/studios/${search.substring(9 + studio.studio_id.length)}`} passHref>検索結果一覧</Link>
                <>{studio.studio_name}studio_name</>
            </StudioBreadcrumbs>
            <TitleWrapper>
                <PageTitle margin={'4px 8px'}>studio_name{studio.studio_name}</PageTitle>
            </TitleWrapper>
            {
                isWide ?
                    <div style={{display: 'flex'}}>
                        <div style={{flexGrow: 1, overflow: 'scroll', height: height - 184}}>
                            <ImgCarousel img={studio.studio_img}/>
                            <StudioInformation/>
                        </div>
                        <VacantRoomPaper rooms={studio.rooms} height={height}/>
                    </div>

                    :
                <>
                    <div style={{marginBottom: 10, position: 'sticky', top: imgTop, zIndex: 100}}>
                        <ImgCarousel img={studio.studio_img}/>
                    </div>
                    {/**img*/}
                    <StudioMenuTab barTop={barTop}>
                         {studio.rooms.map((room, index) => <VacantRoom room={room} key={index}/>)}
                        <StudioInformation/>
                    </StudioMenuTab>
                </>
            }
        </>
    );
}