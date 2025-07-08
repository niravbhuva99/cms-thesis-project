import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
const SyntaxHighlighting = ({ code, language }) => {
    return (
        <Highlight
            theme={themes.vsDark}
            code={code}
            language={language || 'js'}>
            {({ style, tokens, getLineProps, getTokenProps }) => (
                <pre style={style}>
                    {tokens.map((line, i) => (
                        <div
                            key={i}
                            {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

export default SyntaxHighlighting
