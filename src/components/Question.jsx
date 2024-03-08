import React from 'react'
import Options from './Options'

export default function Question({ question, dispatch, answer }) {
    return (

        <>

            <h2>{question.question}</h2>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </>
    )
}
