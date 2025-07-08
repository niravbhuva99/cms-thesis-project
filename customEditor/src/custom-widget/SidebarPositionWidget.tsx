import React from 'react'

const SidebarPosition = ({ onChange, forID, classNameWrapper, value }: { onChange: any; forID: any; classNameWrapper: any; value: any }) => {
    const handleChange = (e: any) => {
        onChange(e.target.value)
    }

    return (
        <input
            id={forID}
            className={classNameWrapper}
            type='text'
            value={value}
            onChange={handleChange}
            placeholder='Enter SidebarPosition'
        />
    )
}

export default SidebarPosition
