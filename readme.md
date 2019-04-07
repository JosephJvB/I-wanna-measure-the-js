# How long is a piece of javacript string?

>Inspiration: https://github.com/MikaeI/mouthful/blob/master/mouthful.js

## Premise
How many characters of javascript do popular websites have?

**STEPS**
- Scrape a site and collect all it's `.js` resources.
- Request each of the collected `.js` resources and concatenate them into one string.

"It's not a script measuring contest"

Well in this case, it absolutely is.

### CURRENT:
- Compare cheerio v phantom data.json
   - which scripts did one catch that the other missed?
   - how much js were in those missed scripts?

### Gotta-do-ems:
- Design
  - probably a podium of some kind? Or a nice animated bar chart
- Front end
  - Maybe just a static html page so I can have the moral high ground, otherwise use Vue  - Lol.
- Api
  - Make api that can serve website&scriptlength
  - Route so user can add a website as data-point