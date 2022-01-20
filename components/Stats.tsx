import useSWR from "swr";
import {Vote} from "../src/vote";
import {fetcher,} from "../libs/fetch";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';

import React from "react";
import Dict = NodeJS.Dict;

const Stats: React.FC<{ tweetId: string }> = ({tweetId}) => {
    const votes = useAllVotes()
    return (
        <>
            <Users position={1} emails={takeVotes(votes, tweetId, 1)}/>
            <Users position={2} emails={takeVotes(votes, tweetId, 2)}/>
            <Users position={3} emails={takeVotes(votes, tweetId, 3)}/>
        </>
    )
};

const Users: React.FC<{ position: number, emails: string[] }> = ({position, emails}) => {
    if (emails.length === 0) return null
    const items = emails.map((email, index) => (
        <ListItem key={index}>
            <ListItemIcon><PersonIcon/></ListItemIcon>
            <ListItemText primary={email}/>
        </ListItem>
    ))
    return (
        <List
            dense disablePadding
            subheader={<ListSubheader>{position}</ListSubheader>}
        >
            {items}
        </List>
    )
}


function takeVotes(votes: AllVotes, tweetId: string, position: number): string[] {
    return votes
        .filter(([, votes]) => votes.length >= position && votes[position - 1] === tweetId)
        .map(([user,]) => user)
}

function useAllVotes(): AllVotes {
    const {data} = useSWR<Vote[]>('/api/all-votes', fetcher)
    if (!data?.length) return []
    const voteMap = data.reduce((acc, vote) => {
        if (!acc[vote.userEmail]) acc[vote.userEmail] = []
        acc[vote.userEmail]!.push(vote.tweetId)
        return acc
    }, {} as Dict<string[]>)
    return Object.entries(voteMap) as AllVotes
}

type AllVotes = [string, string[]][]

export default Stats
