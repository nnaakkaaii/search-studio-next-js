import StudioReserve from "../../templates/studioReserve";
import Link from "next/link";
import BlueButton from "../../atoms/blueButton";
import React from "react";
import ReserveData from "../../molecules/reserveData";
import {useRouter} from "next/router";

export default function Home() {
    const query = useRouter().query;

    return (
        <StudioReserve step={2}>
            <ReserveData/>
            上記内容で予約します
            <Link href={{pathname: '/reserve/done', query: query}} passHref>
                <BlueButton padding={'4px 16px'} margin={'0 auto'} fontSize={16}>決&nbsp;定</BlueButton>
            </Link>
        </StudioReserve>
    )
}
