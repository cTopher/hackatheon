import {NextApiRequest, NextApiResponse} from "next"
import {getSession} from "next-auth/react";
import {getAllVotes} from "../../libs/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    let email = session?.user?.email;
    if (email && ADMINS.includes(email)) {
        res.status(200).json(await getAllVotes())
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}

const ADMINS = ["christopher.leyssen@theoplayer.com", "negar.hajihoseini@theoplayer.com"]
