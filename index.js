// https://github.com:
// cheerio found a compat-bootstrap .js that phantom did not!
const fetch = require('node-fetch')
const cheerio = require('cheerio')

hey()
async function hey () {
  // store things
  const scriptUrls = []
  let bigassString = ''

  const page = await fetch('https://github.com').then(r => r.text())
  const $ = cheerio.load(page)

  $('script').each((i, el) => {
    // scriptUrls.push($(el).attr('src')) also works but you have to do another parse
    scriptUrls.push(el.attribs.src) // this prob better
  })

  if(!scriptUrls.length) {
    throw new Error('no jabbascip found. MUH PROGRESSIVE WEB EXPERIENCE')
  }

  // fetch js content from all found resource-urls
  const proms = scriptUrls.map(async s => {
    const singleyStringy = await fetch(s).then(r => r.text())
    bigassString += singleyStringy
  })
  await Promise.all(proms)
  
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_bytelength_string_encoding
  console.log(
    bigassString.length, // chars
    Buffer.byteLength(bigassString, 'utf8') // bytes
  )

  return {
    bytes: Buffer.byteLength(bigassString, 'utf8'),
    chars: bigassString.length
  }
}
