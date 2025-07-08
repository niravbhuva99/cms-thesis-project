import React from 'react'

const TagsControl = ({ field, onChange, forID, classNameWrapper, value }: { field: any; onChange: any; forID: any; classNameWrapper: any; value: any }) => {
    const handleChange = (e: any) => {
        const separator = field.get('separator', ', ')
        onChange(e.target.value.split(separator).map((e: any) => e.trim()))
    }

    const separator = field.get('separator', ', ')
    return (
        <input
            id={forID}
            className={classNameWrapper}
            type='text'
            value={value ? value.join(separator) : ''}
            onChange={handleChange}
            placeholder='Enter tags separated by commas, and add one space after each comma. (e.g.docusaurus, plugin)'
        />
    )
}

const TagsPreview = ({ value }: { value: string[] }) => {
    return (
        <ul>
            {value.map((tag, index) => (
                <li key={index}>{tag}</li>
            ))}
        </ul>
    )
}

export { TagsControl, TagsPreview }
