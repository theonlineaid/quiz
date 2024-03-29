import React from 'react'

export default function QuizStart({ dispatch, length }) {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{length} questions to test your React mastery</h3>
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "Start" })}
            >
                Let's start
            </button>
        </div>
    )
}
