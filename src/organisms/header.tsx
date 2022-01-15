import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import { styled } from '@mui/system';

const MyToolBar = styled(Toolbar)({
    backgroundColor:'#1D356A',
    justifyContent: 'space-between',
    color: '#F9F5F0',
    minHeight: 56
})

export default function Header() {
    return (
        <AppBar color="primary" position="sticky" sx={{minWidth: 320}}>
            <MyToolBar>
                <Typography variant="h6">Dance Search</Typography>
                <Button color="inherit">Login</Button>
            </MyToolBar>
        </AppBar>
    );
}
