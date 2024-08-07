import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { config } from "../config/config";

interface IUser
{
    fullname: string;
    email: string;
    password: string;
    avatar?: string;
}

interface ISessionContext {
    user?: IUser;
    register: (userData: Omit<IUser, 'avatar'>, avatar?: File) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const SessionContext = createContext<ISessionContext | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const register = async (userData: Omit<IUser, 'avatar'>, avatar?: File) => {
        const formData = new FormData();
        const { fullname, email, password } = userData;
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar);
        }
        try {
            const res = await axios.post(`${config.backend}/auth/register`, formData);
            if (res) {
                console.log(res);
                console.log("Registered !");
                return true;
            }
        } catch (err) {
            console.error(err);
            console.log("Couldn't Register");
            return false;
        }
        return false;
    };

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post(`${config.backend}/auth/login`, { email, password });
            if (res) {
                console.log(res);
                setUser(res.data);
                return true;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
        return false;
    };

    const logout = () => {
        // Logout logic will go here
    };

    return (
        <SessionContext.Provider value={{ user, register, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);