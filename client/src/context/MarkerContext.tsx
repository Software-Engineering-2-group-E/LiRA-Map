import {
    createContext, Dispatch, SetStateAction,
    useContext,
    useState,
} from "react";


interface ContextProps {
    position: [number, number],
    setPosition: Dispatch<SetStateAction<[number, number]>>;
}

const MarkerContext = createContext({} as ContextProps);

export const MarkerProvider = ({ children }: any) => {

    const [ position, setPosition ] = useState<[number, number]>([0, 0])

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