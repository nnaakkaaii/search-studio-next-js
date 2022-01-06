import React from "react";
import Link from "next/link";
import {useRecoilValue} from "recoil";
import {placeChipState, studioNameState} from "../atom";
import {queryState} from "../organisms/querySelector";
import BlueButton from "./blueButton";

export default function StudioSearchButton() {
    const placeChip = useRecoilValue(placeChipState);
    const studioName = useRecoilValue<string|null>(studioNameState);
    const query = useRecoilValue<string[]>(queryState);

    return (
        <Link href={`/studios/?${query.join('&')}`} passHref>
            <BlueButton disabled={placeChip.length === 0 && !studioName}
                        fontSize={16} padding={'6px 32px'} margin={'8px auto 0'}>
                検 索
            </BlueButton>
        </Link>
    )
}