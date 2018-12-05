export async function getRadioPlaying() {
  result = {};
  return fetch('http://www.csrfm.com/live/api/now/index.php', {
    method: 'GET',
    headers: {
        'x-requested-with': 'https://www.inquiremedia.co.uk',
    }
  }).then((response) => {
    result.current: response.json();
    return fetch('http://www.csrfm.com/live/api/previous/index.php', {
      method: 'GET',
      headers: {
          'x-requested-with': 'https://www.inquiremedia.co.uk',
      }
    }).then((response) => {
      result.previous: response.json();
      return fetch('http://www.csrfm.com/live/api/next/index.php', {
        method: 'GET',
        headers: {
            'x-requested-with': 'https://www.inquiremedia.co.uk',
        }
      }).then((response) => {
        result.next: response.json();
        return result;
      });
    });
  });
}