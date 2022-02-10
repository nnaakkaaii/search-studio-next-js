import React from "react";
import {MyBlueButton} from "./blueButton";
import {useRouter} from "next/router";

export default function StudioReserveButton() {
    const router = useRouter();

    return (
            <MyBlueButton sx={{fontSize: '16px', p: '6px 12px', m: '8px auto 0'}}
                          onClick={() => {router.push({pathname: '/reserve', query: {studio_id: 'studio_id'}})}}>
                予約画面へ
            </MyBlueButton>
    );
}