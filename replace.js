chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    console.log(sender);

    let pairs = request.pairs;
    var text = document.body.innerHTML;
    for (let i=0; i<pairs.length; i++) {
        let regex = new RegExp(`\\s${pairs[i].native}\\s`, 'gi');
        text = text.replace(regex, ` ${pairs[i].translation} `);
    }
    document.body.innerHTML = text;

    sendResponse({result: 'success'});
});
