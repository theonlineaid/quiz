import React from 'react'

export default function NextButton({ dispatch, answer }) {

    if (answer == null) return null

    return (
        <button className='btn btn-ui' onClick={() => dispatch({ type: "NextQuestion" })}>NextButton</button>
    )
}
