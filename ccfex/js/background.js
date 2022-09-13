
function pushmsg(msgstr) {
    var url='https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=803dfd9b-a8c6-400a-94e7-daf2b7b53458';

    var msg = { "msgtype": "text", "text": { "content": "hello extensions" }};
    fetch(url, {  
    method: 'post',  
    headers: {  
      "Content-type": "application/json"  
    },  
    body: JSON.stringify({
        "msgtype" : "text",
        "text" : { "content" : msgstr}
    })
  })
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url + request.msg:
                "from the extension" + request.msg);

    console.log(JSON.stringify(request.msg));
    if (request.greeting === "hello")
    {
      sendResponse({farewell: "goodbyedddd"});
    }
    pushmsg(request.msg);
    console.log("over");
  }
);