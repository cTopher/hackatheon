import useSWR from "swr";
import {Vote} from "../src/vote";
import {fetcher} from "../libs/fetch";
import React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Dict = NodeJS.Dict;

const VotesTable: React.FC = () => {
    const votes = useAllVotes()
    if(!votes.length) return null;

    const rows = votes.map(([user, votes], index) => (
        <TableRow key={user}>
            <TableCell component="th" scope="row">[{index + 1}] {user}</TableCell>
            <TableCell>{votes[0]}</TableCell>
            <TableCell>{votes.length > 1 && votes[1]}</TableCell>
            <TableCell>{votes.length > 2 && votes[2]}</TableCell>
        </TableRow>
    ))

    return (
        <TableContainer component={Paper} sx={{marginTop: 2, marginBottom: 2}}>
            <Table>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export function useAllVotes(): AllVotes {
    const {data} = useSWR<Vote[]>('/api/all-votes', fetcher)
    if (!data?.length) return []
    const voteMap = data.reduce((acc, vote) => {
        if (!acc[vote.userEmail]) acc[vote.userEmail] = []
        acc[vote.userEmail]!.push(vote.tweetId)
        return acc
    }, {} as Dict<string[]>)
    return Object.entries(voteMap) as AllVotes
}

export type AllVotes = [string, string[]][]

export default VotesTable