import {useState, useEffect} from "react";

const useDebounce = (value,delay) => {

    const [debounced, setDebounced] = useState(value);

    useEffect(()=>{
        const timeOut = setTimeout(() => {
            setDebounced(value)
        },delay)

        return () => clearTimeout(timeOut)
    },[value,delay])

    return debounced;
}

export default useDebounce;