import * as React from 'react'
import { Button } from '@mui/material'
import { createSession } from '../Infrastructure/http/VotesApi'

export default function CreateSessionButton() {
    const newSession = async () => {
        const sessionId = await createSession('hello')
        console.log(sessionId)
    }

    return (
    <Button 
    variant={'contained'}
    color={'primary'}
    onClick={newSession}
    >
        Create New Session
    </Button>
    );
}