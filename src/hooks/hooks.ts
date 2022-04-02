import { useState, useEffect, SetStateAction } from "react";
import { navigate } from "gatsby";

const useKey = () => {

    const [pressedKey, setPressedKey] = useState<string | null>()

    const onUp = () => {
        setPressedKey(null)
    }

    const onDown = (ev: { key: SetStateAction<string | null | undefined>; }) => {
        if (ev.key !== "Enter" && ev.key !== "Shift") {
            setPressedKey(ev.key)
        }
    }

    // Bind and unbind events
    useEffect(() => {
        window.addEventListener("keyup", onUp)
        window.addEventListener("keydown", onDown)
        return () => {
            window.removeEventListener("keyup", onUp)
            window.removeEventListener("keydown", onDown)
        }
    }, [])

    return pressedKey
}

// Hook
const useKeyPress = (targetKey: string) => {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    // If pressed key is our target key then set to true
    const downHandler = (ev: KeyboardEvent) => {
        if (ev.key === targetKey) {
            setKeyPressed(true);
        }
    }

    // If released key is our target key then set to false
    const upHandler = (ev: KeyboardEvent) => {
        if (ev.key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}



const useKeyboardStream = () => {

    const [keyboardStream, setKeyboardStream] = useState("")

    const lastKey = useKey()

    const enterKey = useKeyPress("Enter")

    useEffect(() => {

        const url = isValidHttpUrl(keyboardStream)

        if (url) {
            console.log(url)
            navigate(url.pathname);
        }

        setTimeout(() => {
            setKeyboardStream("")
        }, 1000)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterKey])


    useEffect(() => {
        if (lastKey) {
            setKeyboardStream(prevValue => prevValue + lastKey)
        }
    }, [lastKey])


    return keyboardStream

}

export { useKeyPress, useKey, useKeyboardStream }



function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return false
    }

    return url

}