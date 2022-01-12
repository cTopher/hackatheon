import type {NextPage} from 'next'
import Typography from '@mui/material/Typography';
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Image from 'next/image';
import {useSession} from "next-auth/react";
import Container from "@mui/material/Container";
import useSWR, {useSWRConfig} from 'swr'
import {fetcher, post} from '../libs/fetch'
import {Vote} from "../src/vote"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import User from "../components/user";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const border = "1px solid rgb(239, 243, 244)"

const Home: NextPage = () => {
    const {data: session} = useSession({required: true})
    return (
        <Container maxWidth="sm">
            <Box borderLeft={border} borderRight={border} height="100vh">
                <Toolbar sx={{borderBottom: border}}>
                    <Box sx={{flex: 1}}>
                        <Typography component="h1" variant="h6" noWrap>HackaTHEOn</Typography>
                        <Typography variant="caption">Vote for your three favourite projects</Typography>
                    </Box>
                    <User/>
                </Toolbar>
                {session ? (
                    <Tweets/>
                ) : (
                    <Box display="flex" width="100%" justifyContent="center" p={4}>
                        <CircularProgress/>
                    </Box>
                )}
            </Box>
        </Container>
    )
}

const Tweets: React.FC = () => {
    return (
        <>
            <Tweet
                id="rocket"
                name="Jav Bazos"
                content="We will design a huge rocket. The only real requirement is that is looks like male genitalia."
                avatar="/jef.jpg"
            />
            <Tweet
                id="mars"
                name="Elon Tusk"
                content="Why limit streaming to earth. We should be streaming video to mars. By end of 2023 50% of video streams will originate from Mars."
                avatar="/elon.jpg"
                img="/mars.png"
            />
            <Tweet
                id="monster"
                name="My kids"
                content="More KETNET! Also fix ketnet streams. Maybe cars? Why not cars, I'm hungry!"
                avatar="/monster.jpg"
            />
            <Tweet
                id="xxx"
                name="Elon Tusk"
                content="Yet Another Idea"
                avatar="/elon.jpg"
            />
        </>
    )
}

type TweetProps = { id: string, name: string, content: string, avatar: string, img?: string };
const Tweet: React.FC<TweetProps> = ({id, name, content, avatar, img}) => {
    let {data} = useVotes()
    let vote = useVote(id)
    let deleteVote = useDeleteVote(id)
    if (!data) return null
    const voteNb = 1 + data.findIndex(v => v.tweetId === id)
    const canVote = data.length < 3
    return (
        <Box p={2} borderBottom={border}>
            <Box display="flex">
                <Avatar alt={name} src={avatar}>H</Avatar>
                <Box ml={2}>
                    <Typography fontWeight={700}>{name}</Typography>
                    <Typography gutterBottom>{content}</Typography>
                    {img && <Image src={img} height={200} width={200} alt={name}/>}
                </Box>
            </Box>
            <Box display="flex" mt={1} justifyContent="flex-end">
                {voteNb ? (
                    <Button startIcon={<FavoriteIcon/>} onClick={() => deleteVote()}>
                        {voteNb}
                    </Button>
                ) : (
                    <IconButton onClick={() => vote()} disabled={!canVote}>
                        <FavoriteBorderIcon/>
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}

function useVotes() {
    return useSWR<Vote[]>('/api/votes', fetcher)
}

function useVote(tweetId: string) {
    const {mutate} = useSWRConfig()
    return async () => {
        await post(`/api/vote`, tweetId)
        await mutate('/api/votes')
    }
}

function useDeleteVote(tweetId: string) {
    const {mutate} = useSWRConfig()
    return async () => {
        await post(`/api/delete-vote`, tweetId)
        await mutate('/api/votes')
    }
}

export default Home
