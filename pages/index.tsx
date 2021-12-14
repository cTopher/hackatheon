import type {NextPage} from 'next'
import Container from '@mui/material/Container';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography';
import React from "react";
import {Avatar} from "@mui/material";
import Box from '@mui/material/Box';
import Image from 'next/image';

const border = "1px solid rgb(239, 243, 244)"

const Home: NextPage = () => {
    return (
        <Container maxWidth="sm">
            <Box borderLeft={border} borderRight={border} height="100vh">

                <Toolbar sx={{borderBottom: border}}>
                    <Typography component="h1" variant="h6" noWrap>HackaTHEOn</Typography>
                </Toolbar>
                <Tweet
                    name="Boll gotes"
                    content="We will design a huge rocket. The only real requirement is that is looks like male genitalia."
                    avatar="/jef.jpg"
                />
                <Tweet
                    name="Elon Tusk"
                    content="Why limit streaming to earth. We should be streaming video to mars. By end of 2023 50% of video streams will originate from Mars."
                    avatar="/elon.jpg"
                    img="/mars.png"
                />
                <Tweet
                    name="My kids"
                    content="More KETNET! Also fix ketnet streams. Maybe cars? Why not cars, I'm hungry!"
                    avatar="/monster.jpg"
                />
            </Box>
        </Container>
    )
}

type TweetProps = { name: string, content: string, avatar: string, img?: string };
const Tweet: React.FC<TweetProps> = ({name, content, avatar, img}) => {
    return (
        <Box display="flex" p={2} borderBottom={border}>
            <Avatar alt={name} src={avatar}>H</Avatar>
            <Box ml={2}>
                <Typography fontWeight={700}>{name}</Typography>
                <Typography>{content}</Typography>
                {img && (
                    <Image
                        src={img}
                        height={200}
                        width={200}
                        alt={name}
                    />
                )}
            </Box>
        </Box>
    )
}

export default Home
