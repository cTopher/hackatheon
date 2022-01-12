import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react";
import {deleteVote} from "../../libs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed')
    }
    const session = await getSession({req})
    if (!session?.user?.email) {
        return res.status(401).end('Unauthorized')
    }
    await deleteVote({
        userEmail: session.user.email,
        tweetId: req.body as string,
    })
    res.status(204).end()
}
