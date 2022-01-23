import React from "react";
import PageTitle from "../atoms/pageTitle";
import StudioBreadcrumbs from "../molecules/studioBreadcrumbs";
import ReserveStep from "../molecules/reserveStep";
import PrivacyInputPaper from "../organisms/privacyInputPaper";

export default function StudioReservePrivacy() {
    return (
        <>
            <StudioBreadcrumbs>
                <>検索結果一覧</>
                <>studio_name</>
                <>予約</>
            </StudioBreadcrumbs>
            <PageTitle margin={'4px 8px'}>studio_name</PageTitle>
            <div style={{padding: 12}}>
                <ReserveStep activeStep={1}/>
                <PrivacyInputPaper/>
            </div>
        </>
    );
}