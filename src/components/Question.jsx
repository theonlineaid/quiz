import React from 'react'

export default function Question({ question }) {
    return (

        <>

            <h2>{question.question}</h2>

            <div className="options">
                {question.options.map(option => (
                    <button className='btn btn-option' key={option}>
                        {option}
                    </button>
                ))}
            </div>
        </>
    )
}
