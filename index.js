// https://github.com:
// cheerio found 3 script urls, total length = 628189
const fetch = require('node-fetch')
const cheerio = require('cheerio')

hey()
async function hey () {
  const scriptUrls = []
  let jabbaScrip = ''

  const page = await fetch('https://github.com').then(r => r.text())
  const $ = cheerio.load(page)

  $('script').each((i, el) => {
    // scriptUrls.push($(el).attr('src')) also works but you have to do another parse
    scriptUrls.push(el.attribs.src) // this better prob
  })

  if(!scriptUrls.length) {
    throw new Error('no jabbascip found. MUH PROGRESSIVE WEB EXPERIENCE')
  }
  const proms = scriptUrls.map(async s => {
   const oneScriptyBoi = await fetch(s).then(r => r.text())
   jabbaScrip += oneScriptyBoi
  })
  await Promise.all(proms)
  console.log(jabbaScrip.length)
  return jabbaScrip
}
