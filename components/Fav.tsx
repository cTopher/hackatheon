import useSWR, {useSWRConfig} from "swr";
import {Vote} from "../src/vote";
import {fetcher, post} from "../libs/fetch";
import LoadingButton from '@mui/lab/LoadingButton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, {useEffect, useState} from "react";

const Fav: React.FC<{ tweetId: string }> = ({tweetId}) => {
    const {data} = useVotes()
    const [loading, setLoading] = useState(true)
    const vote = useVote(tweetId)
    const deleteVote = useDeleteVote(tweetId)

    const handleVote = async () => {
        setLoading(true)
        await vote()
        setLoading(false)
    }

    const handleDeleteVote = async () => {
        setLoading(true)
        await deleteVote()
        setLoading(false)
    }

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])

    const index = (data || []).findIndex(v => v.tweetId === tweetId)
    if (loading || index >= 0) {
        return (
            <LoadingButton loading={loading} startIcon={<FavoriteIcon/>} onClick={handleDeleteVote}>
                {index + 1}
            </LoadingButton>
        )
    } else {
        return (
            <IconButton onClick={handleVote} disabled={data!.length >= 3}>
                <FavoriteBorderIcon/>
            </IconButton>
        )
    }
};

export default Fav

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