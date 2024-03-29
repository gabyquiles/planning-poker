import React, { useEffect, useState } from 'react';
import {type PropsWithChildren, createContext, useContext} from 'react';
import { styled, Box, Button, TextField, Stack } from '@mui/material'
import { Modal as BaseModal} from '@mui/base/Modal';
import { useForm, type SubmitHandler } from 'react-hook-form';
import clsx from 'clsx'
import { useCreateUserMutation } from '@Users/Infrastructure/http/UserApi';

type IdentifyInputs = {
    email: string
}
const initialState = ()=> 'Unknown'
let savedResolve: (email: string) => void;

const UserContext = createContext(initialState)
// TODO: WARNING there is another UserContext in the User/Components folder
// TODO: ADD Tests ASAP
export function IdentityProvider({children}: PropsWithChildren) {
    const [user, setUser] = useState<string>('Unknown')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [createUser] = useCreateUserMutation();

    useEffect(() => {
        if(savedResolve && user !== 'Unknown') {
          savedResolve(user);
        }
    }, [savedResolve, user])

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IdentifyInputs>()

    const getIdentity = () => (new Promise((accept) => {
        if(user !== 'Unknown') {
            accept(user);
        } else { 
            handleOpen();
            savedResolve = accept;
        }
    }))
    const onSubmit: SubmitHandler<IdentifyInputs> =async ({email}) => {
        setUser(email)
        createUser({email})
        handleClose();
    }


    return (<UserContext.Provider value={getIdentity}>
    {children}
    <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <h3 id="unstyled-modal-title" className="modal-title">
            Email
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextField 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            {...register("email", { required: true })}
            />
{errors.email && <span>This field is required</span>}

    <Button 
    variant='contained'
    color={'primary'}
    type='submit'
    >Start</Button>
    
          </Stack>
          </form>
        </ModalContent>
      </Modal>
    </UserContext.Provider>)
}

export const useIdentity = () => {
    const context = useContext(UserContext);
    return context;
}



const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
};

const ModalContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 4px 12px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.20)'
  };
  padding: 1rem;
  color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;


  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
  }
  `,
);

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);