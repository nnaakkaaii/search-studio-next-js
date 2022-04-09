import Studio from "../../templates/studio";
import {Paper, Typography} from "@mui/material";
import {useMedia} from "use-media";
import {styled} from "@mui/system";
import {MyTextField} from "../../atoms/searchTextField";
import {MyBlueButton} from "../../atoms/blueButton";
import React from "react";
import BoldTypography from "../../atoms/boldTypography";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {loginState} from "../../atom";
import {useSetRecoilState} from "recoil";

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
        <Studio>
            <MyPaper elevation={0} sx={isWide ? {maxWidth: '600px', m: '32px auto 0'} : {}}>
                <BoldTypography>アカウントをお持ちの方</BoldTypography>
                <Typography>メールアドレス</Typography>
                <Controller
                    control={control} name="email"
                    rules={{
                        required: '入力して下さい',
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: 'メールアドレスの形式が不正です',
                        }}}
                    render={({ field }) => (
                        <MyTextField placeholder={'xxx@search.com'} {...field}/>
                    )}/>
                <Typography sx={{mt: '12px'}}>パスワード</Typography>
                <Controller
                    control={control} name="password"
                    rules={{
                        required: '入力して下さい',
                        pattern: {
                            minLength: 8,
                            maxLength: 10,
                            message: 'パスワードの形式が不正です',
                        }}}
                    render={({ field }) => (
                        <MyTextField placeholder={'8文字以上10文字以下'} {...field}/>
                    )}/>
                <MyBlueButton sx={{p: '4px 16px', m: '20px auto 0', fontSize: '16px'}}
                    onClick={handleSubmit(onSubmit)}>
                    ログイン
                </MyBlueButton>
            </MyPaper>
        </Studio>
    )
}
