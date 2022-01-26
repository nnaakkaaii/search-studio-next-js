import StudioReserve from "../../templates/studioReserve";
import React from "react";
import ReserveData from "../../molecules/reserveData";

export default function Home() {
    return (
        <StudioReserve step={3}>
            <ReserveData/>
            上記内容で予約しました
        </StudioReserve>
    )
}
