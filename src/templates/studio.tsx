import Header from "../organisms/header";
import TopMenuTab from "../organisms/topMenuTab";
import React from "react";

export default function Studio(props: {children: React.ReactNode}) {
    return (
        <>
            <Header/>
            <TopMenuTab>
                <div key={0}>{props.children}</div>
                <div key={1}>レッスン・練習会を探す</div>
                <div key={2}>ナンバー・イベントを探す</div>
            </TopMenuTab>
        </>
    )
}
