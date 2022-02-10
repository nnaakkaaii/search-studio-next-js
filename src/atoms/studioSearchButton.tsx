import React from "react";
import {useRecoilValue} from "recoil";
import {placeChipState, studioNameState} from "../atom";
import {queryState} from "../organisms/querySelector";
import {MyBlueButton} from "./blueButton";
import {useRouter} from "next/router";

export default function StudioSearchButton() {
    const router = useRouter();
    const placeChip = useRecoilValue(placeChipState);
    const studioName = useRecoilValue<string|null>(studioNameState);
    const query = useRecoilValue<string[]>(queryState);

    return (
            <MyBlueButton disabled={placeChip.length === 0 && !studioName}
                          sx={{fontSize: '16px', p: '6px 32px', m: '8px auto 0'}}
                          onClick={() => router.push(`/studios/?${query.join('&')}`)}
            >
                検 索
            </MyBlueButton>
    )
}