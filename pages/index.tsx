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
            <Tweet id="ull-live" name="Daniel" avatar="/daniel.png" img="/mobile-live-streaming.jpg">
                Today we provide HESP.live SDK for mobile devices to get the streams playing.<br/>
                <br/>
                What if we could also do recording and push it directly to HESP.live from our phone? <br/>
                <br/>
                I tell you what ... <br/>
                <br/>
                Ultra Low-Latency <br/>
                Youtube/Facebook Live <br/>
                client is just born.<br/>
            </Tweet>
            <Tweet id="hevc-hesp" name="Team Ham" avatar="/team-ham.jpg">
                HESP is the &quot;High Efficiency Streaming Protocol&quot;. Let&apos;s make it work together with the &quot;High Efficiency Video Codec&quot; and get some h265 in our HESP. Who knows, maybe we&apos;ll be able to cross another bridge and go AV1?
            </Tweet>
            <Tweet id="release-button" name="Daniel" avatar="/daniel.png" img="/big-red-button.jpg">
                Being a release master is not fun.<br/>
                Let&apos;s automate the THEOplayerSDK release process, so my mother could do it too.<br/>
                <br/>
                One big physical button, one click and everything is done. <br/>
                (more info later)<br/>
            </Tweet>
            <Tweet id="freemium-theo" name="LeMe33" avatar="/leme33.png">
                Did you know you get on average 3 USD CPM for each video ad? 27% of the internet users have an ad blocker, but at a 1 USD CPM we normally charge , there would be plenty of headroom to just offer it for free if we play an ad at the start of each video!
            </Tweet>
            <Tweet id="mounts" name="Michel" avatar="/michel.png">
                On NAB we had phone and tablet mounts to secure our devices on the booth. These mounts we took with us back to the office. For test automation purposes I would like to rebuild this set-up so we have a wall with iPad/iPhones connected to our test automation system.
            </Tweet>
            <Tweet id="quality" name="Maxim" avatar="/maxim.png">
                Quality selection for iOS in THEO UI using preferredPeakBitrate/preferredMaximumResolution
            </Tweet>
            <Tweet id="auto-deploy" name="Michel" avatar="/michel.png">
                In our test automation system we suffer from smart TVs going offline after a while, result is un-executed tests during the nightly run. During the hackaton would like to investigate if we can develop a script that auto-deploy and turns-on both TIZEN &amp; WebOS smart TVs.
            </Tweet>
            <Tweet id="pi" name="Lieven" avatar="/lieven.png">
                Implement an entire HESP encoder and packager stack on a Pi 4B+ or equivalent setup box stack.
            </Tweet>
            <Tweet id="prerecorded-hesp" name="Michel" avatar="/michel.png">
                I would like to investigate how we can reduce variations in the video bandwidth, network stability but also reduce the cost/equipment needed to generate a stream. Ideally we would create a function (lambda) that converts a pre-recorded HESP VOD into actual THEOlive.
            </Tweet>
            <Tweet id="clips" name="Kappa" avatar="/kappa.jpg" img="/clipping.png">
                Just saw an unforgettable moment during a THEOlive stream? Now you can share it with your friends at the press of a button using THEOlive Clips!<br/>
                Simply press the &#x1F3AC; button, trim your clip out of the last 30 seconds of the stream, then receive a link to share everywhere!
            </Tweet>
            <Tweet id="xagget-on-demand" name="Michel" avatar="/michel.png">
                Adapt Xagget for internal use. Any person enters the stream url, drm parameters and selects platform ... overnight the test runs and you get a result presented back. Ideal for commercial opportunities.
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
