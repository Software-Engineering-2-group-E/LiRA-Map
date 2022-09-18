import { useEffect, useState } from "react";



function useDefaultOptions<T>( options: T, defaultOptions: Required<T>, dependencies: any[] )
{
    const [opts, setOpts] = useState<T>(Object.assign(defaultOptions, options));

    useEffect( () => {
        setOpts( Object.assign(defaultOptions, options) )
    }, [dependencies])

    return opts;
}

export default useDefaultOptions;