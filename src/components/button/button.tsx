import React from 'react'

export type Props = {
    text: string
    href: string
    fitWidth?: boolean // Allows non-full-width size
    newWindow?: boolean // Allows to open the link in a new window
}

export default function Button({ text, href, fitWidth, newWindow }: Props) {
    var width: string = 'w-full'
    if (fitWidth) width = 'px-4'

    return (
        <a
            href={href}
            target={newWindow ? '_blank' : '_self'}>
            <button
                className={`font-bold border block border-blue-500 py-2 rounded bg-blue-500 text-white my-4 hover:bg-white hover:text-blue-500 transition duration-300 shadow ${width}`}>
                {text}
            </button>
        </a>
    )
}
