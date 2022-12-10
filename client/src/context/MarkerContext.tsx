import {
    createContext, Dispatch, SetStateAction,
    useContext,
    useState,
} from "react";


interface ContextProps {
    position: [number, number] | null,
    setPosition: Dispatch<SetStateAction<[number, number] | null>>;
}

const MarkerContext = createContext({} as ContextProps);

export const MarkerProvider = ({ children }: any) => {

    const [ position, setPosition ] = useState<[number, number] | null>(null)

    return (
        <MarkerContext.Provider
            value={{
                position, setPosition
            }}
        >
            {children}
        </MarkerContext.Provider>
    );
};

export const useMarkerContext = () => useContext(MarkerContext);