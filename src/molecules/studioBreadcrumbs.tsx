import React from "react";
import Link from "next/link";
import {styled} from "@mui/system";
import {Breadcrumbs} from "@mui/material";
import {useMedia} from "use-media";

const BreadWrapper = styled('div')({
    position: 'fixed',
    zIndex: 5000,
})

interface StudioBreadcrumbsProps {
    crumbs: {
        label: string,
        link?: string
    }[]
}

export default function StudioBreadcrumbs(props: StudioBreadcrumbsProps) {
    const isWide = useMedia({ minWidth: "600px" });

    return (
            <BreadWrapper sx={isWide ? {top: 64} : {top: 56}}>
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