import React from 'react'

const GradientBackground: React.FC = () => {
    return (
        <>
            <div
                className='absolute w-[50vh] h-[50vh] bg-gradient-to-bl from-[#FFAD84]  to-[#FFE382]
                        -right-32 -top-32 z-0 blur-3xl opacity-15'
            />
            <div
                className='absolute w-[50vh] h-[50vh] bg-gradient-to-tr from-red-500  to-purple-500
                         -left-32 -bottom-32 z-0 blur-3xl opacity-[8%]'
            />
            <div
                className='absolute w-[50vh] h-[50vh] bg-gradient-to-tr from-blue-500  to-purple-500
                         -left-0 bottom-72 z-0 blur-3xl opacity-[12%]'
            />
        </>
    )
}

export default GradientBackground