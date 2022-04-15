import React from 'react';
import MenuTab from "../molecules/menuTab";
import {useMedia} from "use-media";
import {styled} from "@mui/system";

const MenuTabWrapper = styled('div')({
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: '#F9F5F0',
    color: '#5A4628',
    minWidth: 320
})

interface TopMenuTabProps {
    children: React.ReactNode[],
}

export default function TopMenuTab(props: TopMenuTabProps) {
    const isSmall = useMedia({ maxWidth: "600px" });

    return (
        <MenuTabWrapper>
            <MenuTab labels={["スタジオ", "レッスン・練習会", "ナンバー・イベント"]}
                     barTop={56} tabFontSize={isSmall ? 12 : 14} tabFlexGrow={1/3} tabMinHeight={isSmall ? 40 : 48}>
                {props.children}
            </MenuTab>
        </MenuTabWrapper>
    );
}
