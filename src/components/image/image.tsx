import React from 'react'

type Props = {
    src: string
    alt?: string
    height?: string
    maxHeight?: string
    width?: string
    maxWidth?: string
}

export default function Image({ src, alt, height, width, maxHeight, maxWidth }: Props) {
    return (
        <img
            src={src}
            alt={alt}
            height={height ? height : '100%'}
            width={width ? width : '100%'}
            style={{ maxWidth: maxWidth, maxHeight: maxHeight }}
        />
    )
}
