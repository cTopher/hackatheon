import * as firebaseAdmin from 'firebase-admin'

import {Vote} from "../src/vote";

const VOTES_TABLE = 'votesJune2022';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_ADMIN_KEY,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        }),
        databaseURL: process.env.DATABASE_URL,
    })
}

const database = firebaseAdmin.database()

export async function getAllVotes(): Promise<Vote[]> {
    const snapshot = await database.ref(VOTES_TABLE).once('value')
    return Object.values(snapshot.val() ?? {})
}

export async function getVotesFor(userEmail: string): Promise<Vote[]> {
    const snapshot = await database.ref(VOTES_TABLE).orderByChild('userEmail').equalTo(userEmail).once('value')
    return Object.values(snapshot.val() ?? {})
}

export async function vote(vote: Vote) {
    const votes = await getVotesFor(vote.userEmail)
    if (votes.length < 3 && !votes.find(v => v.tweetId === vote.tweetId)) {
        await database.ref(VOTES_TABLE).push(vote)
    }
}

export async function deleteVote(vote: Vote) {
    await database.ref(VOTES_TABLE).orderByChild('userEmail').equalTo(vote.userEmail).once('value', snapshot => {
        snapshot.forEach(child => {
            const val: Vote = child.val()
            if (child.key && val.tweetId === vote.tweetId) {
                database.ref(VOTES_TABLE).child(child.key).remove()
            }
        })
    })
}