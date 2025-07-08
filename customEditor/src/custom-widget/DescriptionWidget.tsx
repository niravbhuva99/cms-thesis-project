// In a separate JavaScript file (e.g., description-widget.js)
import React from 'react'

const DescriptionControl = ({ forID, classNameWrapper, value, onChange }) => (
    <div className={classNameWrapper}>
        <textarea
            className='w-full'
            id={forID}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder='Enter description here...'
        />
    </div>
)

const DescriptionPreview = ({ value }) => (
    <div>
        <p>
            <strong>Description:</strong>
        </p>
        <p>{value}</p>
    </div>
)

export { DescriptionControl, DescriptionPreview }
