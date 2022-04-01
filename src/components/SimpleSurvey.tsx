import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from "../firebase"

const SimpleSurvey: React.FC<SimpleSurveyProps> = ({ options, title, question, thanksText }) => {

    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {


        const unsub = onSnapshot(collection(db, "survey"), (snapshot) => {
            console.log(snapshot)
        })

        return unsub

    }, [])



    const firestoreWriter = async (question: string, answer: string) => {

        // Add a new document with a generated id.
        /*         const res = await db.collection('cities').add({
                    name: 'Tokyo',
                    country: 'Japan'
                }); */


    }

    const handleSubmit = async (answer: string) => {

        const result = {
            question,
            answer
        }

        try {
            const docRef = await addDoc(collection(db, "survey"), {
                question: question,
                answer: answer
            })

            console.log(docRef)

        } catch (error) {
            console.log(error)
        }





        // addDoc(collection(db, "survey")).

        // firestoreWriter(question, answer)

        /*         await db.collection("survey").add({
                    question,
                    answer,
                  }); */

        setSubmitted(true)
    }

    return (
        <div >
            {!submitted ?
                <>
                    <h2 className="text-3xl md:text-3xl text-accent-1 lg:text-3xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
                        {title}
                    </h2>
                    <h3 className="text-2xl md:text-2xl lg:text-2xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
                        {question}
                    </h3>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {options.map(option => {
                            return (
                                <button
                                    key={option}
                                    className="bg-accent-2 hover:bg-accent-1 min-w-24 w-24 m-3 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={() => handleSubmit(option)}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                </>
                :
                <h2 className="text-3xl md:text-3xl text-accent-1 lg:text-3xl font-bolder tracking-tighter leading-tight md:leading-none mb-12 text-center">
                    {thanksText}
                </h2>
            }
        </div>
    )
}

export default SimpleSurvey

interface SimpleSurveyProps {
    title: string
    question: string
    options: string[]
    thanksText: string
}
