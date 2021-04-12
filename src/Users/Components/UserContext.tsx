import * as React from 'react';
import { useCallback } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import User from '../Types/User';
import { createUser, deleteUser } from '../../graphql/mutations';

interface UserStateInterface {
  user?: User;
  logout: () => void;
}

const UserContext = React.createContext<UserStateInterface>({
  logout: () => {
  },
});

export function UserProvider(props: any) {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      if (nextAuthState === AuthState.SignedIn) {
        const newUser: User = {
          cognitoId: authData.attributes.sub,
          email: authData.attributes.email,
          id: authData.attributes.sub,
        };
        setUser(newUser);
        API.graphql(graphqlOperation(createUser, { input: newUser }));
      }
    });
  }, []);

  const logout = useCallback(async () => {
    if (user !== undefined) {
      await API.graphql(graphqlOperation(deleteUser, {
        input: { id: user.id },
      }));
      Auth.signOut();
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error('`useUser` hook must be used within a `UserProvider` component');
  }
  return context;
};
