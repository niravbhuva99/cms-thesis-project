import SyntaxHighlighting from './SyntaxHighlighting'
import ModifyImage from './ModifyImage'
import React from 'react'
const modifiedHtmlComponents = {
    pre: ({ children }) => {
        const language = children.props.props?.className?.split('-')[1]
        const code = children.props.children

        return (
            <SyntaxHighlighting
                code={code}
                language={language}
            />
        )
    },
    img: (children) => {
        if (children.src.startsWith('http')) {
            return <img src={children.src} />
        } else {
            return <ModifyImage img={children.src} />
        }
    },
    td: ({ children }) => {
        if (typeof children === 'string' && children.startsWith('<FloatingImage')) {
            const match = children.match(/require\("([^"]+)"\)/)
            const path = match ? match[1] : null

            return (
                <td>
                    <ModifyImage img={path} />
                </td>
            )
        } else {
            return <td>{children}</td>
        }
    },
    ol: ({ children }) => {
        return <ol style={{ listStyleType: 'decimal' }}>{children}</ol>
    },
    ul: ({ children }) => {
        return <ul style={{ listStyleType: 'disc', paddingLeft: '0' }}>{children}</ul>
    }
}

export default modifiedHtmlComponents
