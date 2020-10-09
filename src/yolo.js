import React from 'react'

function yolo() {
    return (
        <div>
            <div className="app">
                <div className="app__heading">
                    <h1>XYZ Machine Problem</h1>
                    <p>by Miguel Angelo P. Laplana</p>
                    <p>for 98 Labs' job interview/application</p>
                </div>
                <div className="app__inputs">
                    <form action="">
                        {["pattern", "size", "direction"].map(input => (
                            <div className="app__formItem">
                                <label htmlFor={input}>{input}</label>
                                <input id={input} type="text" />
                            </div>
                        ))}
                    </form>
                </div>
                <div className="app__button">
                    <button onClick={generate}>Generate!</button>
                </div>
                <div className="app__result">

                </div>
            </div>
    )
}

export default yolo
