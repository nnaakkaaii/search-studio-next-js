import Header from "../organisms/header";
import TopMenuTab from "../organisms/topMenuTab";
import React from "react";

interface StudioProps {
    children: React.ReactNode,
    loginPage?: boolean
}

export default function Studio(props: StudioProps) {
    return (
        <>
            <Header loginPage={props.loginPage}/>
            <TopMenuTab>
                <div key={0}>{props.children}</div>
                <div key={1}>レッスン・練習会を探す</div>
                <div key={2}>ナンバー・イベントを探す</div>
            </TopMenuTab>
        </>
    )
}
