import type {NextPage} from 'next'
import Typography from '@mui/material/Typography';
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import Image from 'next/image';
import {useSession} from "next-auth/react";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import User from "../components/User";
import Fav from "../components/Fav";
import Stats from "../components/Stats";
import VotesTable from "../components/AllVotes";

const border = "1px solid #dddddd"

const Home: NextPage = () => {
    useSession({required: true})
    return (
        <>
            <Container maxWidth="sm" sx={{borderLeft: border, borderRight: border}} disableGutters>
                <Toolbar sx={{borderBottom: border}}>
                    <Box sx={{flex: 1}}>
                        <Typography component="h1" variant="h6" noWrap>HackaTHEOn</Typography>
                        <Typography variant="caption">Vote for your three favourite projects</Typography>
                    </Box>
                    <User/>
                </Toolbar>
                <Tweets/>
            </Container>
            <Container maxWidth="lg">
                <VotesTable/>
            </Container>
        </>
    )
}

const Tweets: React.FC = () => {
    return (
        <>
            <Tweet id="mounts" name="Michel" avatar="M">
                On NAB we had phone and tablet mounts to secure our devices on the booth. These mounts we took with us back to the office. For test automation purposes I would like to rebuild this set-up so we have a wall with iPad/iPhone&apos;s connected to our test automation system.
            </Tweet>
            <Tweet id="auto-deploy" name="Michel" avatar="M">
                In our test automation system we suffer from smart tv&apos;s going offline after a while, result is un-executed tests during the nightly run. During the hackaton would like to investigate if we can develop a script that auto-deploy and turns-on both TIZEN & WebOS smart tv&apos;s.</Tweet>
            <Tweet id="record" name="Daniel" avatar="/daniel.png" img="/rec.jpg">
                What if we could also do recording and push it directly to HESP.live from our phone?
                I tell you what ... Ultra Low-Latency Youtube/Facebook Live client is just born.
            </Tweet>
            <Tweet id="quality" avatar="/maxim.png" name="Maxim">
                Quality selection for iOS in THEO UI using preferredPeakBitrate/preferredMaximumResolution
            </Tweet>
            <Tweet id="blind" name="Furby" avatar="/lieven.jpg">
                Implement an entire HESP encoder and packager stack on a Pi 4B+ or equivalent setup box stack.
            </Tweet>
            <Tweet id="release" name="Daniel" avatar="/daniel.png">
                One-click release.
                Being a release master is not fun. Let&apos;s automate the THEOplayerSDK release process, so my mother could do it too.
                One big physical button, one click and everything is done.
            </Tweet>
        </>
    )
}

type TweetProps = { id: string, name: string, avatar: string, img?: string };
const Tweet: React.FC<TweetProps> = ({id, name, avatar, img, children}) => {
    return (
        <Box p={2} borderBottom={border}>
            <Box display="flex">
                <Avatar alt={name} src={avatar}>H</Avatar>
                <Box ml={2}>
                    <Typography fontWeight={700}>{name}</Typography>
                    <Typography gutterBottom>{children}</Typography>
                    {img && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <Image src={img} height={250} width={380} alt={name}/>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box display="flex" mt={1} justifyContent="flex-end">
                <Fav tweetId={id}/>
            </Box>
            <Stats tweetId={id}/>
        </Box>
    )
}


export default Home
