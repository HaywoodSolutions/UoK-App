const XMLParser  = require('react-xml-parser');

export async function getLectures(feedID) {
  return fetch(`https://api.rss2json.com/v1/api.json?rss_url=http://player.kent.ac.uk/Panopto/Podcast/Podcast.ashx?courseid=${feedID}&type=mp4&count=200&api_key=epbvlq8t6fipg5zvtg81lzlpx35wusqytkhjjjg7`,
        {
    method: 'GET',
    headers: {
      'x-requested-with': 'https://player.kent.ac.uk',
    },
    resolveWithFullResponse: true
  })
  .then((response) => {
    return response.json();
  }).then((rawFeed) => {
    return rawFeed.items;
  })
}
 /*         
{
  "items": [
    {
      "author": "Moodle\\djb",
      "categories": [],
      "content": "Mon, Sep 24 2018 at 12:01 PM",
      "description": "Mon, Sep 24 2018 at 12:01 PM",
      "enclosure": {
        "duration": 2971,
        "length": 34920708,
        "link": "https://player.kent.ac.uk/Panopto/Podcast/Syndication/43045886-be27-4285-a3af-a96500b6e27a.mp4?mediaTargetType=audioPodcast",
        "type": "video/mp4",
      },
      "guid": "https://player.kent.ac.uk/Panopto/Podcast/Syndication/43045886-be27-4285-a3af-a96500b6e27a.mp4",
      "link": "https://player.kent.ac.uk/Panopto/Podcast/Syndication/43045886-be27-4285-a3af-a96500b6e27a.mp4",
      "pubDate": "2018-09-24 11:05:52",
      "thumbnail": "",
      "title": "Mon, Sep 24 2018 at 12:01 PM",
    }
  ],
  "status": "ok",
}*/