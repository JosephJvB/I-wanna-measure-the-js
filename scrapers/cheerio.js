const fetch = require('node-fetch')
const cheerio = require('cheerio')

module.exports = async (url) => {
  
  // get page, parse results
  const page = await fetch(url).then(r => r.text())
  const $ = cheerio.load(page)
  
  // collect script resource links
  const scriptUrls = []
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

  return scriptUrls
}