import StudioReserve from "../../templates/studioReserve";
import {Typography, TextField} from "@mui/material";
import SearchTextField, {MyTextField} from "../../atoms/searchTextField";
import Link from "next/link";
import {MyBlueButton} from "../../atoms/blueButton";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Router from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import PaymentForm from "../../organisms/paymentForm";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {inputDataState, reserveDataState} from "../../atom";


export default function Home() {
    const router = useRouter();
    const query = router.query;
    const reserveData = useRecoilValue(reserveDataState);
    const setInputData = useSetRecoilState(inputDataState);

    useEffect(() => {
        if (reserveData === null) {
            query ? router.replace({pathname: '/reserve', query: query}) : router.replace('/')
        }
    })

    const { handleSubmit, control } = useForm({
        defaultValues: {
            familyName: '',
            firstName: '',
            phone: '',
            email: ''
        }
    });

    const onSubmit = (data) => {
        setInputData(data)
        router.push({pathname: '/reserve/confirm', query: query})
    };

    return (
        <StudioReserve step={1}>
            <Typography>氏名</Typography>
            <div style={{display: 'flex'}}>
                <Controller
                    control={control} name="familyName"
                    rules={{required: true}}
                    render={({ field }) => (
                        <MyTextField placeholder={'姓'} {...field}/>
                    )}/>
                <Controller
                    control={control} name="firstName"
                    rules={{required: true}}
                    render={({ field }) => (
                        <MyTextField placeholder={'名'} {...field}/>
                    )}/>
            </div>
            <Typography sx={{mt: '12px'}}>電話番号</Typography>
            <Controller
                control={control} name="phone"
                rules={{required: true}}
                render={({ field }) => (
                    <MyTextField placeholder={'半角数字 -(ハイフン)なし'} {...field}/>
                )}/>
            <Typography sx={{mt: '12px'}}>メールアドレス</Typography>
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
            <PaymentForm/>
            <MyBlueButton sx={{p: '4px 16px', m: '20px auto 0', fontSize: '16px'}}
                          onClick={handleSubmit(onSubmit)}>
                決&nbsp;定
            </MyBlueButton>
        </StudioReserve>
    )
}
