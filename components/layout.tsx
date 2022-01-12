import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";
import {signOut, useSession} from "next-auth/react";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const border = "1px solid rgb(239, 243, 244)"

const Layout: React.FC = ({children}) => {
    return (
        <Container maxWidth="sm">
            <Box borderLeft={border} borderRight={border} height="100vh">
                <Toolbar sx={{borderBottom: border}}>
                    <Typography component="h1" variant="h6" noWrap sx={{flex: 1}}>HackaTHEOn</Typography>
                    <User/>
                </Toolbar>
                {children}
            </Box>
        </Container>
    )
}

const User: React.FC = () => {
    const {data: session} = useSession({required: true})
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    if (!session) return null
    const open = Boolean(anchorEl)
    return (
        <>
            <IconButton
                id="user-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(event) => setAnchorEl(event.currentTarget)}
            >
                <Avatar alt={session.user?.name ?? undefined} src={session.user?.image ?? undefined}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{'aria-labelledby': 'user-button'}}
            >
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
            </Menu>
        </>
    )
}

export default Layout