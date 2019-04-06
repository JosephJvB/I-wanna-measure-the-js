// https://github.com:
// cheerio found a compat-bootstrap .js that phantom did not!
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const queries = [
  'https://github.com',
  'https://facebook.com',
  'https://twitter.com',
  'https://reddit.com',
  'https://instagram.com',
  'https://youtube.com',
  'https://twitch.com',
  'https://slack.com',
].map(hey)

Promise.all(queries)
.then(data => {
  fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2), err => {
    if(err) {
      console.log('writeFileError', err)
    }
  })
})

async function hey (url) {
  // store things
  const scriptUrls = []
  let bigassString = ''

  const page = await fetch(url).then(r => r.text())
  const $ = cheerio.load(page)

  $('script').each((i, el) => {
    // some script tags didnt have src attrib (maybe inline js? Not sure)
    const src = el.attribs.src
    if(src) {
      // if .js src = /static/something.js, add the url to the start
      scriptUrls.push(
        src.startsWith('https://') ? src : url + src
      )
    }
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
  
  const txtFile = path.join(__dirname, `raw/${url.split('https://')[1]}-js.txt`)
  fs.writeFile(txtFile, bigassString, err => {
    if(err) {
      console.log('error here at raw write', url)
    }
  })
  
  // console.log(
  //   bigassString.length, // chars
  //   Buffer.byteLength(bigassString, 'utf8') // bytes
  // )
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_bytelength_string_encoding
  return {
    url,
    bytes: Buffer.byteLength(bigassString, 'utf8'),
    chars: bigassString.length,
    sources: scriptUrls
  }
}
