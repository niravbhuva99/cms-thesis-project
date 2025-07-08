import React from 'react'

const LoadingSpinner = () => {
    return (
        <div className='spinner-container flex flex-col justify-center items-center '>
            <div className='spinner'></div>
            <p className='spinner-text'>Processing Links...</p>
        </div>
    )
}
export default LoadingSpinner
