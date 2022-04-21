import Header from "../organisms/header";
import React from "react";
import {styled} from "@mui/system";

const Wrapper = styled('div')({
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: '#F9F5F0',
    color: '#5A4628',
    minWidth: 320
})

interface StudioProps {
    children: React.ReactNode,
    loginPage?: boolean
}

export default function Studio(props: StudioProps) {
    return (
        <>
            <Header loginPage={props.loginPage}/>
            <Wrapper>{props.children}</Wrapper>
        </>
    )
}
