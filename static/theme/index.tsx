import React from 'react'
import Link from '@docusaurus/Link'
// @ts-ignore
import { findFirstCategoryLink, useDocById } from '@docusaurus/theme-common/internal'
import { translate } from '@docusaurus/Translate'

function CardContainer({ href, children }) {
    return (
        <Link
            href={href}
            className={'card shadow group border p-4 h-full text-gray-500 hover:cursor-pointer duration-200 transition-all hover:no-underline no-underline hover:bg-primary-500'}>
            {children}
        </Link>
    )
}
function CardLayout({ href, icon, title, description }) {
    return (
        <CardContainer href={href}>
            <h2
                title={title}
                className='text-primary-500 group-hover:text-white'>
                {icon} {title}
            </h2>
            {description && (
                <p
                    className='pt-4 text-sm text-gray-500 text-left group-hover:text-white'
                    title={description}>
                    {description}
                </p>
            )}
        </CardContainer>
    )
}
function CardCategory({ item }) {
    const href = findFirstCategoryLink(item)
    // Unexpected: categories that don't have a link have been filtered upfront
    if (!href) {
        return null
    }
    return (
        <CardLayout
            href={href}
            icon='🗃️'
            title={item.label}
            description={translate(
                {
                    message: '{count} items',
                    id: 'theme.docs.DocCard.categoryDescription',
                    description: 'The default description for a category card in the generated index about how many items this category includes'
                },
                { count: item.items.length }
            )}
        />
    )
}

function CardLink({ item }) {
    const doc = useDocById(item.docId ?? undefined)
    return (
        <CardLayout
            icon={''}
            href={item.href}
            title={item.label}
            description={doc?.description}
        />
    )
}

export default function DocCard({ item }) {
    switch (item.type) {
        case 'link':
            return <CardLink item={item} />
        case 'category':
            return <CardCategory item={item} />
        default:
            throw new Error(`unknown item type ${JSON.stringify(item)}`)
    }
}
