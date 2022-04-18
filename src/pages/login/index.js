import Studio from "../../templates/studio";
import {Paper, Typography} from "@mui/material";
import {useMedia} from "use-media";
import {styled} from "@mui/system";
import {MyTextField} from "../../atoms/searchTextField";
import {MyBlueButton} from "../../atoms/blueButton";
import React, {useEffect} from "react";
import BoldTypography from "../../atoms/boldTypography";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {loginState} from "../../atom";
import {useSetRecoilState} from "recoil";
import LoginForm from "../../organisms/loginForm";
import RegisterForm from "../../organisms/registerForm";

const MyPaper = styled(Paper)({
    color: "#5A4628",
    padding: 20,
    margin: 32,
})

export default function Home() {
    const router = useRouter();
    const isWide = useMedia({ minWidth: "620px" });
    const setLogin = useSetRecoilState(loginState);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const onSubmit = (data) => {
        router.back()
        setLogin(data.email)
    };

    return (
        <Studio loginPage>
            <MyPaper elevation={0} sx={isWide ? {maxWidth: '600px', m: '32px auto 0'} : {}}>
                <BoldTypography>アカウントをお持ちの方</BoldTypography>
                <LoginForm/>
                <BoldTypography margin={'12px 0 0'}>アカウントをお持ちでない方</BoldTypography>
                <RegisterForm/>
            </MyPaper>
        </Studio>
    )
}
