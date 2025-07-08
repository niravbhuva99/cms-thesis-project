import React from 'react'
const NotFoundComponent: React.FC<{ componentName: string }> = ({ componentName }) => {
    return (
        <div className='bg-red-50 border border-red-200 text-red-500 px-4 py-2 rounded-md'>
            component <span className='font-bold'>{componentName}</span> is not supported.
        </div>
    )
}

export default NotFoundComponent
