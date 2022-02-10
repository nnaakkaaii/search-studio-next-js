import StudioReserve from "../../templates/studioReserve";
import Link from "next/link";
import {MyBlueButton} from "../../atoms/blueButton";
import React, {useEffect} from "react";
import ReserveData from "../../molecules/reserveData";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {inputDataState} from "../../atom";

export default function Home() {
    const router = useRouter();
    const query = router.query;
    const inputData = useRecoilValue(inputDataState);

    useEffect(() => {
        if (inputData === null) {
            query ? router.replace({pathname: '/reserve', query: query}) : router.replace('/')
        }
    })

    const handleOk = () => {
        router.replace({pathname: '/reserve/done', query: query})
    }

    return (
        <StudioReserve step={2}>
            {inputData && inputData.familyName}
            <ReserveData/>
            上記内容で予約します
            <MyBlueButton sx={{p: '4px 16px', m: '0 auto', fontSize: '16px'}}
                          onClick={handleOk}>
                決&nbsp;定
            </MyBlueButton>
        </StudioReserve>
    )
}
