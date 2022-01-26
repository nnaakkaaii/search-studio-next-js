import React from "react";
import PageTitle from "../atoms/pageTitle";
import StudioBreadcrumbs from "../molecules/studioBreadcrumbs";
import ReserveStep from "../molecules/reserveStep";
import {Paper} from "@mui/material";
import Studio from "./studio";
import {useRouter} from "next/router";

export default function StudioReserve(props: {step: number, children: React.ReactNode}) {
    const studio_id = useRouter().query.studio_id;

    return (
        <Studio>
            <StudioBreadcrumbs crumbs={[
                {label: '検索結果一覧'},
                {label: 'studio_name', link: '/studios/studio_name'},
                {label: '予約'}]}/>
            <PageTitle margin={'4px 8px'}>studio_name</PageTitle>
            <div style={{padding: 12}}>
                <ReserveStep activeStep={props.step}/>
                <Paper elevation={0} sx={{m: '12px auto', p: '16px', color: '#5A4628', maxWidth: 600}}>
                    {props.children}
                </Paper>
            </div>
        </Studio>
    );
}