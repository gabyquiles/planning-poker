import * as React from 'react'
import { useEffect } from 'react'
import { navigate } from "gatsby"
import { Button} from '@mui/material'
import { useCreateSessionMutation } from '@src/Session/Infrastructure/http/SessionApi'
import { useIdentity } from '@src/contexts/User/IdentityContext'

export default function CreateSessionButton() {
  
    const [createSession, {isSuccess, data}] = useCreateSessionMutation();

    const getIdentity = useIdentity();
    useEffect(() => {
      console.log(data)
      if(isSuccess) {
        navigate(`/session/${data}`)
      }
    }, [isSuccess, data])
  
    const myCreate = async () => {
      const identity = await getIdentity();
      await createSession(identity)
    }

    return (
    <Button 
    variant='contained'
    color={'primary'}
    onClick={myCreate}
    >
        Create New Session
    </Button>
    );
}