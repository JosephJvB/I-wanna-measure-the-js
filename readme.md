# How long is a piece of javacript string?

>Inspiration: https://github.com/MikaeI/mouthful/blob/master/mouthful.js

## Premise
How many characters of javascript do popular websites have?

**STEPS**
- Scrape a site and collect all it's `.js` resources.
- Request each of the collected `.js` resources and concatenate them into one string.

"It's not a script measuring contest"

Well in this case, it absolutely is.

### Gotta-do-ems:
- Design
  - probably a podium of some kind? Or a nice animated bar chart
- Front end
  - Maybe just a static html page so I can have the moral high ground, otherwise use Vue  - Lol.
- Api
  - Make api that can serve website&scriptlength
  - Route so user can add a website as data-point
- Dependencies
  - currently using phantom headless browser.
  - If I can avoid using a headless browser, then creating an api that gets new data-points will be easier. Deploying a server that runs a headless browser was tricky last time I did it, and simplicity is ka-pai.
  - use node-fetch since it's small as bro.