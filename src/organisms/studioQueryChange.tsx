import React from "react";
import {useRecoilValue} from "recoil";
import {studioSearchPaperOpenState} from "../atom";
import StudioQueryPaper from "../organisms/studioQueryPaper";
import StudioSearchPaper from "../organisms/studioSearchPaper";
import {useMedia} from "use-media";

export default function StudioQueryChange(props: {isWide: boolean}) {
    const {isWide} = props;
    const isSmall = useMedia({ maxWidth: "600px" });
    const open = useRecoilValue(studioSearchPaperOpenState);

    return (
        <div style={
            isWide ? {flexGrow: 1, marginRight: '20px'}
                : isSmall ? {position: 'fixed', top: 132, marginLeft: -24, width: '100%', zIndex: 1100}
                    : {position: 'fixed', top: 144, marginLeft: -24, width: '100%', zIndex: 1100}
        }>
            <div style={isWide ? {position: 'sticky', top: 180} : {margin: '0 8px'}}>
                <StudioQueryPaper isWide={isWide}/>
                {
                    (open || isWide) && <StudioSearchPaper/>
                }
            </div>
        </div>
    );
}