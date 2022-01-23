import Header from "../../organisms/header";
import TopMenuTab from "../../organisms/topMenuTab";
import StudioReservePrivacy from "../../templates/studioReservePrivacy";

export default function Home() {
    return (
        <>
            <Header/>
            <TopMenuTab>
                <StudioReservePrivacy key={0}/>
                <div key={1}>レッスン・練習会を探す</div>
                <div key={2}>ナンバー・イベントを探す</div>
            </TopMenuTab>
        </>
    )
}
