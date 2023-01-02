import create from "zustand";
import {persist} from "zustand/middleware";

interface TokenI{
    token: string
    setToken: (token: string) => void
    logout: () => void
}

const useTokenStore = create<TokenI>()(
    persist(
        set => {
            return {
                token: '',
                setToken: (token) => {
                    set({token: token});
                },
                logout: () => {
                    set({token: ''});
                },
            }
        },
        {
            name: "token-storage", // unique name
        }
    )
);

export default useTokenStore;