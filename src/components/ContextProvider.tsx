import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { GetUser } from '../utils/apiService';
import { UserFront } from '../utils/models';

export type IContextAuth = [UserFront, React.Dispatch<React.SetStateAction<UserFront>>];

export type IContextBlog = [number, React.Dispatch<React.SetStateAction<number>>];


export const LoggedIn = createContext<IContextAuth>([{}, () => {}]);

export const BlogChange = createContext<IContextBlog>([0, () => 0]);

export const ContextProvider: React.FC = (props) => {

    const [user, setUser] = useState<UserFront>({
        role: '',
        userid: undefined
    });
    const [changes, setChanges] = useState<number>(0);

    useEffect(() => {
        (async () => {
            let user = await GetUser();
            setUser(user);
        })();
    }, []);

    return(
        <LoggedIn.Provider value={[user, setUser]}>
            <BlogChange.Provider value={[changes, setChanges]}>
                {props.children}
            </BlogChange.Provider>
        </LoggedIn.Provider>
    )

}