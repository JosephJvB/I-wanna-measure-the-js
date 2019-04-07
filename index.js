// https://github.com:
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

/*
  phantom more 'expensive' but can get the .js files for ads
  cheerio found a compat-bootstrap .js that phantom did not!
  but seems like overall, phantom returns more
*/
// const scraper = require('./scrapers/cheerio'),
// jsonPath = 'cheerio-data.json',
// rawPath = 'cheerio-raw'
const scraper = require('./scrapers/phantom')
jsonPath = 'phantom-data.json',
rawPath = 'phantom-raw'

const queries = [
  'https://github.com',
  'https://facebook.com',
  'https://twitter.com',
  'https://reddit.com',
  'https://instagram.com',
  'https://youtube.com',
  'https://twitch.com',
  'https://slack.com',
].map(async url => {

  const scriptUrls = await scraper(url)

  if(!scriptUrls.length) {
    throw new Error('no jabbascip found. MUH PROGRESSIVE WEB EXPERIENCE')
  }

  // fetch each collected script and sum up the contents
  const proms = scriptUrls.map(s => fetch(s).then(r => r.text()))
  const stringyJsArray = await Promise.all(proms)
  const bigassString = stringyJsArray.reduce((big, js) => big+=js, '')
  
  // write a file of all resulting js for each website
  const txtFile = path.join(__dirname, `${rawPath}/${url.split('https://')[1]}-js.txt`)
  fs.writeFile(txtFile, bigassString, err => {
    if(err) {
      throw new Error(`\n\nAT RAW ${url} WRITE\n\n` + err)
    }
  })
  
  // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_bytelength_string_encoding
  return {
    url,
    bytes: Buffer.byteLength(bigassString, 'utf8'),
    chars: bigassString.length,
    sources: scriptUrls
  }
})

/*
  EXECUTE QUERIES:
    write json with stats from queries result
    data = array [
      {
        url,
        bytes,
        chars,
        sources: ['', '', ''] .js urls
      }
    ] 
*/
Promise.all(queries)
.then(data => {
  console.log(JSON.stringify(data, null, 2))
  fs.writeFile(path.join(__dirname, jsonPath), JSON.stringify(data, null, 2), err => {
    if(err) {
      throw new Error('\n\nAT DATA JSON WRITE\n\n' + err)
    }
  })
})

