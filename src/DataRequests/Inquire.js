const XMLParser  = require('react-xml-parser');

export async function getInquireFeed() {
  return fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.inquiremedia.co.uk/feed.xml&count=200&api_key=epbvlq8t6fipg5zvtg81lzlpx35wusqytkhjjjg7',
        {
    method: 'GET',
    headers: {
        'x-requested-with': 'https://www.inquiremedia.co.uk',
    }
  })
    .then((response) => response.json());
}