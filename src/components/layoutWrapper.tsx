import Layout from '@theme/Layout'
import React, { ReactNode } from 'react'

export type Props = {
    children: ReactNode | ReactNode[]
    title: string
    description: string
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'sapit-feedback-submission-dialog': {
                id: string
                endpoint: string
                'topic-id'?: string
                'use-topic-id'?: boolean
                'show-success-message'?: boolean
                'topic-matchstring'?: string
            }
        }
    }
}

export default function LayoutWrapper({ children, title, description }: Props) {
    return (
        <Layout
            title={title}
            description={description}>
            {children}
        </Layout>
    )
}
