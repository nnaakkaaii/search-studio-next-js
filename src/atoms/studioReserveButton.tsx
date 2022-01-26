import React from "react";
import BlueButton from "./blueButton";
import Link from 'next/link';

export default function StudioReserveButton() {
    return (
        <Link href={{pathname: '/reserve', query: {studio_id: 'studio_id'}}} passHref>
            <BlueButton fontSize={16} padding={'6px 12px'} margin={'8px auto 0'}>
                予約画面へ
            </BlueButton>
        </Link>
    );
}