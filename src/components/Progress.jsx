import React from 'react'

export default function Progress({ index, length, points, maxPossiblePoints, answer }) {
    return (
        <>
            <header className={`progress`}>
                <progress max={length} value={index + Number(answer !== null)} />


                <p> Question <strong>{index + 1}</strong> / {length}</p>

                <p><strong>{points}</strong> / {maxPossiblePoints}</p>
            </header>

        </>
    )
}
