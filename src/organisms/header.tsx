import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import { styled } from '@mui/system';
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {loginState} from "../atom";
import MyPageButton from "../molecules/myPageButton";

const MyToolBar = styled(Toolbar)({
    backgroundColor:'#1D356A',
    justifyContent: 'space-between',
    color: '#F9F5F0',
    minHeight: 56
})

const MyButton = styled(Button)({
    color: '#F9F5F0',
    fontWeight: 'bold',
})

export default function Header(props: {loginPage?: boolean}) {
    const router = useRouter();
    const login = useRecoilValue(loginState);

    return (
        <AppBar color="primary" position="sticky" sx={{minWidth: 320}}>
            <MyToolBar>
                <Typography variant="h6">Dance Search</Typography>
                {
                    login ?
                        <MyPageButton/>
                        : !props.loginPage && <MyButton sx={{border: 'solid 1px #F9F5F0'}} onClick={() => router.push('/login')}>ログイン</MyButton>
                }
            </MyToolBar>
        </AppBar>
    );
}
