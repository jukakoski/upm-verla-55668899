import { collection, onSnapshot, getDoc, doc, setDoc, updateDoc, increment, serverTimestamp, FieldValue } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from "../firebase"
import { AnswerModel } from '../templates/product'
import { ThreeDots } from 'react-loader-spinner'
import { AnimatePresence, motion } from "framer-motion"

const SimpleSurvey: React.FC<SimpleSurveyProps> = ({ id, answers, title, question, thanksText, locale }) => {

    const [submitted, setSubmitted] = useState(false)

    const [busy, setBusy] = useState(false)

    const [answerResults, setAnswerResults] = useState<null | Answer[]>()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "survey"), (snapshot) => {
            console.log(snapshot)
        })

        return unsub
    }, [])

    const handleSubmit = async (answer: string) => {

        setBusy(true)

        const docRef = doc(db, "survey", id);

        // https://cloud.google.com/firestore/docs/manage-data/add-data
        try {

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {

                // you must use dot notation
                const answerName = `answers.${answer}`

                const updateData = {
                    [answerName]: increment(1),
                    timestamp: serverTimestamp()
                }

                const res = await updateDoc(docRef, updateData)

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document! Create new...");

                const newSurvey: Survey = {
                    question,
                    answers: {
                        [answer]: 1
                    },
                    timestamp: serverTimestamp()
                }

                // Add a new document in collection "survey"
                const res = await setDoc(doc(db, "survey", id), newSurvey);

            }

            // get doc to show results
            const docResults = await getDoc(docRef);

            const data = docResults.data()

            if (data && data.answers) {

                const answerArr: Answer[] = []

                for (let answer of Object.entries(data.answers)) {
                    answerArr.push({ text: answer[0], value: answer[1] })
                }

                answerArr.sort((a, b) => b.value - a.value)

                setAnswerResults(answerArr)
            }

            setSubmitted(true)
            setBusy(false)

        } catch (error) {
            console.log(error)
            setBusy(false)
            return
        }

    }

    return (
        <AnimatePresence >
            {!submitted ?
                <>
                    <h2 className="text-3xl md:text-3xl text-accent-1 lg:text-3xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
                        {title}
                    </h2>
                    <h3 className="text-2xl md:text-2xl lg:text-2xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
                        {question}
                    </h3>
                    {!busy ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {answers.map(answer => {
                                return (
                                    <button
                                        disabled={busy}
                                        key={answer.name}
                                        style={{ backgroundColor: busy ? "gray" : undefined, transitionDuration: "0.4s" }}
                                        className="bg-accent-2 hover:bg-accent-3 hover:scale-110 min-w-24 w-24 m-3 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={() => handleSubmit(answer.name)}
                                    >
                                        {answer[locale as keyof AnswerModel]}
                                    </button>
                                )
                            })}
                        </div>
                        :
                        <ThreeDots wrapperStyle={{ display: 'flex', justifyContent: "center" }} color="#7aba28" height="100" width="100" />
                    }
                </>
                :
                <motion.div
                    initial={{ opacity: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 0, y: 0 }}
                    transition={{
                        type: "keyframes",
                        duration: 0.5
                    }}
                >
                    <h2 className="text-3xl md:text-3xl text-accent-1 lg:text-3xl font-bolder tracking-tighter leading-tight md:leading-none mb-6 text-center">
                        {thanksText}
                    </h2>
                    {answerResults && answerResults.map(answer => {
                        const localAnswerText = answers.filter(item => item.name === answer.text)

                        if (localAnswerText && localAnswerText[0] && localAnswerText[0][locale as keyof AnswerModel]) {
                            return (
                                <h4 className="text-2xl md:text-2xl text-accent-3 lg:text-2xl font-bolder tracking-tighter leading-tight md:leading-none mb-1 text-center">
                                    {localAnswerText[0][locale as keyof AnswerModel]}: {answer.value}
                                </h4>)
                        } else {
                            return null
                        }

                    })}
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default SimpleSurvey

interface SimpleSurveyProps {
    id: string
    title: string
    question: string
    answers: AnswerModel[]
    thanksText: string
    locale: string
}

type Survey = {
    question?: string
    answers: object
    timestamp: FieldValue
}

type Answer = {
    text: string
    value: any
}
