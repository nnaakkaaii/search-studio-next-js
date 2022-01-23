import React from "react";
import PageTitle from "../atoms/pageTitle";
import {useRouter} from 'next/router';
import {useQuery} from "react-apollo-hooks";
import { GET_STUDIOS } from "../graphql/tags/getStudios";
import StudioBreadcrumbs from "../molecules/studioBreadcrumbs";
import ReservePaper from "../organisms/reservePaper";
import ReserveStep from "../molecules/reserveStep";

export default function StudioReserve() {
    const search = useRouter().asPath;
    const { data, error, loading } = useQuery(GET_STUDIOS, {
        variables: {},
    });

    return (
        <>
            <StudioBreadcrumbs>
                <>検索結果一覧</>
                <>studio_name</>
                <>予約</>
            </StudioBreadcrumbs>
            <PageTitle margin={'4px 8px'}>studio_name</PageTitle>
            <div style={{padding: 12}}>
                <ReserveStep activeStep={0}/>
                <ReservePaper/>
            </div>
        </>
    );
}