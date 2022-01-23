import React, {useState} from "react";
import {Paper, TextField, Typography} from "@mui/material";
import BlueButton from "../atoms/blueButton";
import Link from "next/link";
import SearchTextField from "../atoms/searchTextField";

export default function PrivacyInputPaper() {
    const [famName, setFamName] = useState()
    const [firstName, setFirstName] = useState()
    const [phone, setPhone] = useState()
    const [mail, setMail] = useState()

    const changeFamName = (e) => {
        setFamName(e.target.value)
    }

    const changeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const changePhone = (e) => {
        setPhone(e.target.value)
    }

    const changeMail = (e) => {
        setMail(e.target.value)
    }

    return (
        <Paper elevation={0} sx={{m: '12px auto', p: '16px', color: '#5A4628', maxWidth: 600}}>
            <Typography>氏名</Typography>
            <div style={{display: 'flex'}}>
                <SearchTextField label={'姓'} value={famName} textStart onChange={changeFamName}/>
                <SearchTextField label={'名'} value={firstName} textStart onChange={changeFirstName}/>
            </div>
            <Typography sx={{mt: '12px'}}>電話番号</Typography>
            <SearchTextField label={'半角(ハイフンなし)'} value={phone} textStart onChange={changePhone}/>
            <Typography sx={{mt: '12px'}}>メールアドレス</Typography>
            <SearchTextField label={'@search.com'} value={mail} textStart onChange={changeMail}/>
            <Link href={'/reserve/confirm'}>
                <BlueButton padding={'4px 16px'} margin={'20px auto 0'} fontSize={16}>決&nbsp;定</BlueButton>
            </Link>
        </Paper>
    );
}