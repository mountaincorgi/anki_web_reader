/*
NOTES

Anki query options: https://docs.ankiweb.net/#/searching - happy querying!
*/

/*
TASKS

1. For selected decks, get all cards in review

2. For these cards, load the selected fields into memory as an array

3. Search the html of a page and replace words 
*/

const magicButton = document.getElementById('magic');

magicButton.addEventListener('click', function() {
    let myPromise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            let response = JSON.parse(xhr.responseText);
            if (response) {
                resolve(response.result);
                console.log(response);
            } else {
                reject('error');
            }
        });
        xhr.open('POST', 'http://localhost:8765');
        xhr.send(JSON.stringify({
            'action': 'findCards',
            'version': 6,
            'params': {
                'query': 'deck:thai1000words is:review'
            }
        }));
    }).then(function(cardIds) {
        return new Promise(function(resolve, reject) {
            let xhr2 = new XMLHttpRequest();
            xhr2.addEventListener('load', () => {
                let response = JSON.parse(xhr2.responseText);
                if (response) {
                    resolve(response.result);
                    console.log(response);
                } else {
                    reject('error');
                }
            });
            xhr2.open('POST', 'http://localhost:8765');
            xhr2.send(JSON.stringify({
                'action': 'cardsInfo',
                'version': 6,
                'params': {
                    'cards': cardIds
                }
            }));
        });
    }).then(function(cardInfos) {
        console.log(cardInfos);

        const tPairs = [];
        for (let i=0; i<cardInfos.length; i++) {
            let p = {};
            p.native = cardInfos[i].fields.word_eng.value;
            p.translation = cardInfos[i].fields.word_tha.value;
            tPairs.push(p);
        }
        console.log(tPairs);
    });
});






