import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { GetUser } from '../utils/apiService';
import { UserFront } from '../utils/models';

type IContext = [UserFront, React.Dispatch<React.SetStateAction<UserFront>>];


export const LoggedIn = createContext<IContext>([{}, () => {}]);

export const LoggedInProvider: React.FC = (props) => {

    const [user, setUser] = useState<UserFront>({
        role: '',
        userid: undefined
    });

    return(
        <LoggedIn.Provider value={[user, setUser]}>
            {props.children}
        </LoggedIn.Provider>
    )

}