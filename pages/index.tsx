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

const border = "1px solid #dddddd"

const Home: NextPage = () => {
    useSession({required: true})
    return (
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
    )
}

const Tweets: React.FC = () => {
    return (
        <>
            <Tweet
                id="watch-party"
                name="Daniel"
                avatar="/daniel.png"
            >
                Zero-cost watch party experience across ALL Apple devices. You&apos;re welcome! 😎
            </Tweet>
            <Tweet
                id="team-meeting"
                name="Xzibit"
                avatar="/pj.png"
                img="/dawg.jpg"
            >
                I heard you like HESP and THEO, so I propose we put HESP in your THEO Team Meetings so you can use HESP
                while talking about THEO.
            </Tweet>
            <Tweet
                id="stop"
                name="Patrick"
                avatar="/patrick.jpg"
                img="/mercy.jpg"
            >
                Stop a customer that is using our player without paying. No money, no mercy. Let&apos;s cut them off.
            </Tweet>
            <Tweet
                id="record"
                name="Owl"
                avatar="/mattias.png"
                img="/rec.jpg"
            >
                Tired of keeping a tab open all day in the hopes of reproducing a tricky bug on a customer&apos;s
                livestream, only to then realize you forgot to add a console.log() somewhere? 😩 Let&apos;s build
                a &quot;record and replay tool&quot;: reproduce it once, replay it as many times as you want! 🔁
            </Tweet>
            <Tweet
                id="blockchain"
                name="Streamoshi Takamoto"
                avatar="/guarav.png"
                img="/rocket.png"
            >
                Dear HODLers, what if we could be paid to view Ads? What if we could create a cryptocurrency called the
                THEO token(THT) that helps advertisers and viewers maintain a healthy and win-win balance? Want to pump
                THT to the moon and buy a Ferrari? Then join the #BlockchainedTHEOplayer
            </Tweet>
            <Tweet
                id="babel"
                name="Furby"
                avatar="/lieven.jpg"
                img="/babelfish.jpg"
            >
                Blub, blub, I am the babelfish! I provide (real time) voice-to-voice translation of a speaker in a
                video. Now, this might seem a complex task, but there are in fact already a lot of repositories or
                (free) online APIs that solve parts of the problem. We just needs to connect them together! For example,
                the problem could be broken down to the following steps: isolate speaker voice and ambient audio,
                translate voice audio to text in a desired language, regenerate translated voice audio in the style of
                the original speaker, then merge the new voice audio with the ambient audio. Finally, make the resulting
                video a stream so it can be played using THEOplayer (in which case, it becomes a babelgiraffe :p ).
            </Tweet>
            <Tweet
                id="blind"
                name="Furby"
                avatar="/lieven.jpg"
                img="/blind.jpg"
            >
                How about making THEOplayer more accessible to vision-impaired people by automatically generating a
                description of the video. We can start from{' '}
                <a href="https://github.com/ElisonSherton/Image_Captioning">this git repo</a>. For example, we
                periodically capture a video frame, generate a description and create a closed caption track. What about
                the really, really blind people? We also perform{' '}
                <a href="https://cloud.google.com/text-to-speech">text to speech</a> and create an audio track. Finally,
                we generate a new stream with these tracks and play it back in THEOplayer.
            </Tweet>
            <Tweet
                id="blade-runner"
                name="Furby"
                avatar="/lieven.jpg"
                img="/blade-runner.png"
            >
                Voice based player control, just like in blade runner! You talk to THEOplayer to make it show a specific
                frame, seek to a time or loop-play a specific section of video. Optionally, we let it zoom in to a
                specific part of the video/frame. Even better, we perform super resolution on te zoomed region to
                enhance the image quality. All of these functionalities can be implemented in-browser using{' '}
                <a href="https://webmachinelearning.github.io/webnn-intro/">WebNN</a>, an upcoming standard for running
                neural networks straight in the browser.
            </Tweet>
            <Tweet
                id="quortex"
                name="Bart / Pooria"
                avatar="/bart.jpg"
                img="/quortex.jpg"
            >
                THEOplayer goes green with Quortex.io - Suppose we make THEOplayer green as part of an E2E OTT
                ecosystem. THEOplayer would give instructions (network status, type of device, device screen resolution)
                back to the Quortex.io just-in-time OTT cloud backend which will trigger that backend to only
                encode/package/deliver in a specific set of resolutions/parameters/... based on the request. This way we
                reduce datacenter costs of the full OTT ecosystem. Other backend systems run 24/7 continuously while we
                only run based on a customer stream playback request. For this HackaTHEOn project, we would involve a
                third party partner to join: Quortex.io from France, who have developed a{' '}
                <a href="https://www.welcome.quortex.io/our-technology.">
                    just-in-time everything (except the video player) solution
                </a>. Join a strong team with a clear green vision.
            </Tweet>
            <Tweet
                id="touch"
                name="Maxim"
                avatar="/maxim.png"
                img="/drake.jpeg"
            >
                Imagine you&apos;re watching a video using THEO on mobile. Oops! Just missed the punchline of a long
                joke. Let&apos;s seek back about 10 seconds ... by using thumbs that are half the size of the screen.
                OR. Let&apos;s double tap the left side of the player to rewind 10 seconds! 20 seconds you say? TRIPLE
                TAP. 30? QUAD- you get the point. Introducing the new and improved THEOplayer v3 UX, including double
                tap seek, but potentially also: vertical volume/brightness drag, scaling settings/subs menu, ... In
                other words: the best of every (commercial) video player.
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
        </Box>
    )
}


export default Home
