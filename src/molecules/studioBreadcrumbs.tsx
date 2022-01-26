import React from "react";
import Link from "next/link";
import {styled} from "@mui/system";
import {Breadcrumbs} from "@mui/material";

const BreadWrapper = styled('div')({
    position: 'sticky',
    top: 108,
    zIndex: 5000,
})

interface StudioBreadcrumbsProps {
    crumbs: {
        label: string,
        link?: string
    }[]
}

export default function StudioBreadcrumbs(props: StudioBreadcrumbsProps) {

    return (
            <BreadWrapper>
                <Breadcrumbs sx={{fontSize: 12, m: '8px'}} aria-label="breadcrumb">
                    <Link href={'/'}>スタジオ検索トップ</Link>
                    {
                        props.crumbs.map((crumb, index) =>
                            crumb.link ?
                                <div key={index}>
                                    <Link href={crumb.link}>{crumb.label}</Link>
                                </div>
                                : <div key={index}>{crumb.label}</div>
                        )
                    }
                </Breadcrumbs>
            </BreadWrapper>
    );
}