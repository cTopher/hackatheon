import React from "react";
import {signOut, useSession} from "next-auth/react";
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const User: React.FC = () => {
    const {data: session} = useSession()
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

export default User