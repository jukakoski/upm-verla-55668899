import { useState, useEffect, SetStateAction } from "react";
import { navigate } from "gatsby";
import { getDoc, doc, setDoc, updateDoc, increment, serverTimestamp, FieldValue } from 'firebase/firestore'
import db from "../firebase"

const useKey = () => {

    const [pressedKey, setPressedKey] = useState<string | null>()

    const onUp = () => {
        setPressedKey(null)
    }

    const onDown = (ev: { key: SetStateAction<string | null | undefined>; }) => {
        // if (ev.key !== "Enter" && ev.key !== "Shift") {
        if (ev.key !== "Shift") {
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



const useKeyboardStream = (locale: string) => {

    const [keyboardStream, setKeyboardStream] = useState("")

    const lastKey = useKey()

    useEffect(() => {
        if (keyboardStream) {

            const url = isValidHttpUrl(keyboardStream)

            if (url) {
                // mäppäys tähän. Hae oikea route dynaamisen urlin perusteella
                // TODO
                //

                const localeUrl = locale === "en" ? url.pathname : `/${locale}${url.pathname}`
                console.log(localeUrl)
                navigate(localeUrl);
            } else {
            }

            setTimeout(() => {
                setKeyboardStream("")
            }, 1000)

        }
    }, [keyboardStream])


    // update keyboard stream on keypress
    useEffect(() => {
        if (lastKey && lastKey !== "Enter" && lastKey !== "Meta") {
            setKeyboardStream(prevValue => prevValue + lastKey)
        }
    }, [lastKey])

    return keyboardStream
}




const useStatistics = (id: string): UseStatisticsReturn => {

    const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);
    const [host, setHost] = useState<string | null>(null)

    const [busy, setBusy] = useState(false)

    const [views, setViews] = useState<number | null>(null)

    const logView = async () => {

        setBusy(true)

        const docRef = doc(db, "pageStatistics", id);

        // https://cloud.google.com/firestore/docs/manage-data/add-data
        try {

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                const updateData = {
                    views: increment(1),
                    timestamp: serverTimestamp()
                }

                const res = await updateDoc(docRef, updateData)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document! Create new...");

                const newPageStatistics: PageStatisticsType = {
                    views: 1,
                    timestamp: serverTimestamp()
                }

                // Add a new document in collection "survey"
                const res = await setDoc(doc(db, "pageStatistics", id), newPageStatistics);

            }

            // get doc to show results
            const docResults = await getDoc(docRef);

            const data = docResults.data()

            if (data && data.views) {
                setViews(data.views)
            }

            setBusy(false)
            return true

        } catch (error) {
            console.log(error)
            setBusy(false)
            return
        }
    }


    useEffect(() => {
        // log page views in production (not in localhost)
        if (typeof window !== `undefined`) {
            const hostname = window.location.hostname;
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams) {
                setUrlParams(urlParams);
            }

            if (hostname) {
                setHost(hostname)
            }

            if (hostname !== "localhost") {
                logView()
            }
        }
    }, [])

    return {
        busy,
        views,
        host,
        urlParams
    }

}




export { useKeyPress, useKey, useKeyboardStream, useStatistics }



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




type PageStatisticsType = {
    views: number
    timestamp: FieldValue
}


type UseStatisticsReturn = {
    busy: boolean
    views: number | null
    host: string | null
    urlParams: URLSearchParams | null
}