const phantom = require('phantom')

module.exports = async url => {
  const instance = await phantom.create();
  const page = await instance.createPage();

  const scriptUrls = []
  await page.on('onResourceRequested', data => {
    if(data.url.endsWith('.js')) {
      scriptUrls.push(data.url)
    }
  })

  const status = await page.open(url)
  console.log('status', status)
  await instance.exit()
  
  return scriptUrls
}