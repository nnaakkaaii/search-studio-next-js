import StudioReserve from "../../templates/studioReserve";
import {Typography, TextField} from "@mui/material";
import SearchTextField from "../../atoms/searchTextField";
import Link from "next/link";
import BlueButton from "../../atoms/blueButton";
import React, {useState} from "react";
import {useRouter} from "next/router";
import Router from 'next/router'
import { useForm, Controller } from 'react-hook-form';
import InputTextField from "../../atoms/inputTextField";
import { ErrorMessage } from '@hookform/error-message';

export default function Home() {
    const query = useRouter().query;

    const { handleSubmit, control } = useForm({
        defaultValues: {
            familyName: '',
            firstName: '',
            phone: '',
            email: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data)
        Router.push({pathname: '/reserve/confirm', query: query})
    };

    return (
        <StudioReserve step={1}>
            <Typography>氏名</Typography>
            <div style={{display: 'flex'}}>
                <Controller
                    control={control} name="familyName"
                    rules={{required: true}}
                    render={({ field }) => (
                        <InputTextField placeholder={'姓'} field={field}/>
                    )}/>
                <Controller
                    control={control} name="firstName"
                    rules={{required: true}}
                    render={({ field }) => (
                        <InputTextField placeholder={'名'} field={field}/>
                    )}/>
            </div>
            <Typography sx={{mt: '12px'}}>電話番号</Typography>
            <Controller
                control={control} name="phone"
                rules={{required: true}}
                render={({ field }) => (
                    <InputTextField placeholder={'半角数字 -(ハイフン)なし'} field={field}/>
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
                    <InputTextField placeholder={'xxx@search.com'} field={field}/>
                )}/>
            <BlueButton onClick={handleSubmit(onSubmit)} padding={'4px 16px'} margin={'20px auto 0'} fontSize={16}>
                決&nbsp;定
            </BlueButton>
        </StudioReserve>
    )
}