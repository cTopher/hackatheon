import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';

import React from "react";
import Typography from "@mui/material/Typography";
import {AllVotes, useAllVotes} from "./AllVotes";

const Stats: React.FC<{ tweetId: string }> = ({tweetId}) => {
    const votes = useAllVotes()
    const v1 = takeVotes(votes, tweetId, 1);
    const v2 = takeVotes(votes, tweetId, 2);
    const v3 = takeVotes(votes, tweetId, 3);
    const points = v1.length + v2.length / 2 + v3.length / 3;
    if (points === 0) return null
    return (
        <>
            <Typography>Dowdall points: {points.toFixed(2)}</Typography>
            <Users position={1} emails={v1}/>
            <Users position={2} emails={v2}/>
            <Users position={3} emails={v3}/>
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


export default Stats
