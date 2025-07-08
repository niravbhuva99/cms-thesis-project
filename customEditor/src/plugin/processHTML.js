import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
const visit = require('unist-util-visit')
import { processLink } from './modifyLinksPlugin'

const processHTML = async (html) => {
    try {
        const tree = unified().use(rehypeParse, { fragment: true }).parse(html.children[0].value)

        const promises = []
        visit(tree, 'element', async (node) => {
            const elementNode = node
            if (elementNode.tagName === 'a' && !elementNode.properties?.href?.startsWith('http')) {
                const href = elementNode.properties?.href
                if (href) {
                    const promise = processLink(elementNode, href).then((res) => {
                        if (elementNode.properties) {
                            elementNode.properties.href = res
                        }
                    })
                    promises.push(promise)
                }
            }
        })

        await Promise.all(promises)
        // Convert hast back to HTML
        const modifiedHtmlString = unified().use(rehypeStringify).stringify(tree)

        return modifiedHtmlString
    } catch (error) {
        console.error('Error processing HTML:', error)
    }
}

export default processHTML
