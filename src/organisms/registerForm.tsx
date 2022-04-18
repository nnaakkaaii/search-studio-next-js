import {Paper, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {useSetRecoilState} from "recoil";
import {MyBlueButton} from "../atoms/blueButton";
import {loginState} from "../atom";
import {MyTextField} from "../atoms/searchTextField";


export default function RegisterForm() {
    const router = useRouter();
    const setLogin = useSetRecoilState(loginState);

    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            familyName: '',
            firstName: '',
            email: '',
            phone: '',
            password: ''
        }
    });
    const onSubmit = (data) => {
        router.back()
        setLogin(data.email)
    };

    return (
        <>
            <Typography>氏名</Typography>
            <div style={{display: 'flex'}}>
                <Controller
                    control={control} name="familyName"
                    rules={{required: '入力してください'}}
                    render={({ field }) => (
                        <MyTextField placeholder={'姓'}　{...field}
                                     error={!!errors.familyName} helperText={errors.familyName ? errors.familyName.message : ''}/>
                    )}/>
                <Controller
                    control={control} name="firstName"
                    rules={{required: '入力してください'}}
                    render={({ field }) => (
                        <MyTextField placeholder={'名'}　{...field}
                                     error={!!errors.firstName} helperText={errors.firstName ? errors.firstName.message : ''}/>
                    )}/>
            </div>
            <Typography sx={errors.familyName || errors.firstName ? {mt: '20px'} : {mt: '12px'}}>メールアドレス</Typography>
            <Controller
                control={control} name="email"
                rules={{
                    required: '入力してください',
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: 'メールアドレスの形式が不正です',
                    },
                }}
                render={({ field }) => (
                    <MyTextField placeholder={'xxx@search.com'} {...field}
                                 error={!!errors.email} helperText={errors.email ? errors.email.message : ''}/>
                )}/>
            <Typography sx={errors.email ? {mt: '20px'} : {mt: '12px'}}>電話番号</Typography>
            <Controller
                control={control} name="phone"
                rules={{
                    required:'入力してください',
                    pattern: {
                        value: /^[0-9]/,
                        message: '電話番号の形式が不正です',
                    },
                }}
                render={({ field }) => (
                    <MyTextField placeholder={'半角数字 -(ハイフン)なし'} {...field}
                                 error={!!errors.phone} helperText={errors.phone ? errors.phone.message : ''}/>
                )}/>
            <Typography sx={errors.phone ? {mt: '20px'} : {mt: '12px'}}>パスワード</Typography>
            <Controller
                control={control} name="password"
                rules={{
                    required: '入力してください',
                    minLength: {value: 8, message: 'パスワードの形式が不正です'},
                    maxLength: {value: 16, message: 'パスワードの形式が不正です'}
                }}
                render={({ field }) => (
                    <MyTextField placeholder={'8文字以上16文字以下'} {...field}
                                 error={!!errors.password} helperText={errors.password && errors.password.message}/>
                )}/>
            <MyBlueButton sx={{p: '4px 16px', m: '20px auto 0', fontSize: '16px'}}
                          onClick={handleSubmit(onSubmit)}>
                新規登録
            </MyBlueButton>
        </>
    )
}
