import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react";
import {getVotesFor} from "../../libs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    if (session?.user?.email) {
        res.status(200).json(await getVotesFor(session.user.email))
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

