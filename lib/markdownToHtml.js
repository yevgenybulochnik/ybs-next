var unified = require('unified')
var parse = require('remark-parse')
var gfm = require('remark-gfm')
var remark2rehype = require('remark-rehype')
var rehypePrism = require('@mapbox/rehype-prism')
var html = require('rehype-stringify')
var raw = require('rehype-raw')


export async function markdownToHtml(markdown) {
  const result = await unified()
    .use(parse)
    .use(gfm)
    .use(remark2rehype, {allowDangerousHtml: true})
    .use(raw)
    .use(rehypePrism)
    .use(html)
    .process(markdown)

  return result.toString()
}
