import {Button, Dialog, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginState, logoutState} from "../atom";

export default function LogoutDialog() {
    const setLogin = useSetRecoilState(loginState);
    const [open, setOpen] = useRecoilState(logoutState);

    const handleClose = (value?: boolean) => (e) => {
        setOpen(false);
        value && setLogin(null)
        e.stopPropagation()
    };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ログアウトします。よろしいですか。
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button sx={{width: '50%'}} onClick={handleClose()} autoFocus>いいえ</Button>
                    <Button sx={{width: '50%'}} onClick={handleClose(true)}>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
