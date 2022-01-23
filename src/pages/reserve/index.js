import Header from "../../organisms/header";
import TopMenuTab from "../../organisms/topMenuTab";
import StudioReserve from "../../templates/studioReserve";

export default function Home() {
    return (
        <>
            <Header/>
            <TopMenuTab>
                <StudioReserve key={0}/>
                <div key={1}>レッスン・練習会を探す</div>
                <div key={2}>ナンバー・イベントを探す</div>
            </TopMenuTab>
        </>
    )
}
