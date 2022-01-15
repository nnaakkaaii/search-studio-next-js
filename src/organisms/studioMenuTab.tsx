import React from "react";
import MenuTab from "../molecules/menuTab";

interface StudioMenuTabProps {
    barTop?: number,
    children: React.ReactNode[];
}

export default function StudioMenuTab(props: StudioMenuTabProps) {
    return (
        <div style={{color: '#5A4628', backgroundColor: 'white'}}>
            <MenuTab labels={["部屋", "スタジオ情報"]} white
                     barTop={props.barTop} tabFlexGrow={.5} tabMinHeight={44} tabFontSize={14}>
                {props.children}
            </MenuTab>
        </div>
    );
}