export async function getRadioPlaying() {
  //result = {};
  return fetch('http://www.csrfm.com/live/api/now/index.php', {
    method: 'GET',
    headers: {
        'x-requested-with': 'https://www.inquiremedia.co.uk',
    }
  }).then((response) => {
    var json = response.json();
    if (json.ExtArtworkB64 == "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABSlJREFUeNrsnUFu20YUhukmKFAgQXiDMJsuCqSQTiD6BHZPIOcElU8g6wS2T2DlBGFOQOYEUrPIspVXXUrJpmgAQyWhN9GfKSlIlmRT0vcBLyaHnCHF+efNmxlFPJpOpwEcLj\/wCBCA40tu0w3ZCx7tVvi46TrCA+ABAAHMGMn2r7kdrWGfebRbYeP1ggfAAwACAAQACAAQACAAQACAAAABAAIABAAIABAA7CtPZftTbl9t+x8ezV4yzO2Zbd8V\/xzxpVC6AEAAgAAAAQACAAQACAAQACAAQACAAAABAAIABAAIABAAIABAAIAAAAEAAgAEAAgAEAAgAEAAgAAAAQACAAQAu8DTGtxDmFvDtrOS9Ekw+3\/tqxLb36GVscx9TLb8Ge\/7WbZH8fsAj2zxdE5ckp7eo8yGlNlZ4vxubu8e4DOmNXje31nduoAbay3r8nvFdpWnuNjQdekC1iSyCutVuNGz3E5s\/31u\/Qq3fSruv2HmXG9RxkvL35WKj2y\/4G0we4NKKALqiWBauX2wPCd2XlH+teXTc06kO3I0LL14g8cVXcCMsbjtqMRtDmz\/L7OppfnlndmxG2\/bHU9LrufT9cpy96T5tZyBbEeWv+waRZ5Q7j+mC5gztBbtugKlY60mye2VWWJpHe\/ctniIRDyC7+KLlnps7t8FoK88D9LyuopQWnNsZRR5mrmd2\/FL7zq\/ea08Nc\/xxgt6GQbaQ5zYw21LunP715J27R1zbtxV0ERcfyiVqvkzc9MqCtdtuLIyEYNfhnZBV554AhNgYmJ0omnYdRLmAf7PxETg+upVaXstLZUhZrvEA5TxVoLHyASQWMW2pGKXYVSRFi0RnB7sRFC\/xDUOS1p7yzumorky1+7MeZVoiesnXlnvzUs4LzISkZxWzDss6uaaVkZnyfs5mCAwrRjHpxZYjSWgu5EgK7Q8pxIk+te4tGOXErzF3rXGFrydekGdfz+XXlCaWtpYyu16waT\/GcuC04MNAifW4odeSzmXdBewJdYyz2y7KX2wc9e9CreeyXAtk3xD8xihzAe4+KAv5ySW5lr\/sR13gai7x+KcW\/lb9hn7ZtFjewF+KZS1gJ0lXuBRHnK+vSGeZbJrD3GXPUDVjWfmih+K1MR4XIdx\/SF5AMeFt3+LYz8sAfQWdBFtC7JGEghGln4rQV4RVL60c+JgvlZwIpNB1zK51JVgcbep2\/LkCqZLyGqhDAl1zn5q6WXDTh0apjKcTGV41\/WGowPbHtdlXn8floPv2wen3syfW0toWt\/ctP2bFSekjmVmMrbZu9CONc1CuoB6xQCRVYqOu93YPw6+X+BZxAeZutWIP5C5gJGUiwBqEgPEASzNPn4pdChCcO5Zv3f4h6Sp11gG5w1aJeUigJpQROpuaXZgEfsgmE\/1DsWdF2v371box53r70hePMAjkS2YeDmX2OBC0nrWit+YUM6sr+8H8\/UBf61A5\/Ezy+uGjpmXd+dgLYAYABAAIABAAIAAAAEAAgAEAAgAEAAgAEAAgAAAAQACAAQACAAQACAAQACAAAABAAIABAAIABAAIABAAIAAAAEAAoDdEsDHYPbrm4W95tHsJROp4xd4AEAACAAQACAAQACAAAABAAIABAAIABAAIABAALDP6CtjfpTtX7z9VSl+W\/+Ox7txinr5aY38T\/wEfV\/Al9yeb+hGizdwfKa+Nk7xnY3Xm6wjugC6gG\/8LS7iz9z+XaNc3P92+JTb1zXy\/2x1fOfqiFfGMAqAQ+Y\/AQYAtdaEP\/LydHgAAAAASUVORK5CYII=")
      json.url = "http://www.csrfm.com/logo.png";
    return json;
  });
  /*
    return fetch('http://www.csrfm.com/live/api/previous/index.php', {
      method: 'GET',
      headers: {
          'x-requested-with': 'https://www.inquiremedia.co.uk',
      }
    }).then((response) => {
      result.previous = response.json();
      return fetch('http://www.csrfm.com/live/api/next/index.php', {
        method: 'GET',
        headers: {
            'x-requested-with': 'https://www.inquiremedia.co.uk',
        }
      }).then((response) => {
        result.next = response.json();
        return result;
      });
    });
  });*/
}