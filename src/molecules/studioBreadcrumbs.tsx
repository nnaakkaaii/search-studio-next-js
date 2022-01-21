import React from "react";
import Link from "next/link";
import {styled} from "@mui/system";
import {Breadcrumbs} from "@mui/material";

const BreadWrapper = styled('div')({
    position: 'sticky',
    top: 108,
    zIndex: 5000,
})

export default function StudioBreadcrumbs(props: {children: React.ReactNode}) {

    return (
            <BreadWrapper>
                <Breadcrumbs sx={{fontSize: 12, m: '8px'}} aria-label="breadcrumb">
                    <Link href={'/'}>スタジオ検索トップ</Link>
                    {props.children}
                </Breadcrumbs>
            </BreadWrapper>
    );
}