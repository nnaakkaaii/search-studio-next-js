import {Button, Menu, MenuItem} from "@mui/material";
import { styled } from '@mui/system';
import {useRouter} from "next/router";
import { useSetRecoilState} from "recoil";
import {logoutState} from "../atom";
import {useEffect, useState} from "react";
import {AccountCircle} from "@material-ui/icons";
import LogoutDialog from "./logoutDialog";
import {History, Logout, Settings} from "@mui/icons-material";

const MyButton = styled(Button)({
    color: '#F9F5F0',
    fontWeight: 'bold',
})

const MyMenuItem = styled(MenuItem)({
    color: '#5A4628'
})

export default function MyPageButton() {
    const setLogout = useSetRecoilState(logoutState);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        open && window.addEventListener('click', () => {setAnchorEl(null)})
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        !open && event.stopPropagation()
    };

    const handleClose = (value?: string) => (e) => {
        if (value === 'logout') {
            setLogout(true)
            e.stopPropagation()
        } else {
            setAnchorEl(null)
        }
    };

    return (
        <>
            <MyButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <AccountCircle/>マイページ
            </MyButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MyMenuItem onClick={handleClose()}>アカウント設定</MyMenuItem>
                <MyMenuItem onClick={handleClose()}>予約履歴</MyMenuItem>
                <MyMenuItem onClick={handleClose('logout')}>ログアウト</MyMenuItem>
                <MyMenuItem onClick={handleClose()} sx={{'&.MuiMenuItem-gutters': {minHeight: 0}}}>
                    <div style={{fontSize: '14px', margin: 'auto'}}>閉じる</div>
                </MyMenuItem>
            </Menu>
            <LogoutDialog/>
        </>
    );
}
