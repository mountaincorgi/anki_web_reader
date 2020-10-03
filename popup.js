/*
NOTES

Anki query options: https://docs.ankiweb.net/#/searching - happy querying!
*/

/*
TASKS
3. Search the html of a page and replace words 
*/

const magicButton = document.getElementById('magic');

magicButton.addEventListener('click', function() {
    chrome.storage.sync.get('currentDeck', function(data) {
        let currentDeck = data.currentDeck;

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
                    'query': `deck:${currentDeck} is:review`
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
});



/*
Tabs
*/
function openTab(e, tabName) {
    let i, tabContent, tabLinks;

    // Hide all tabs
    tabContent = document.getElementsByClassName('tab-content');
    for (let i=0; i<tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Remove active class from all tab links
    tabLinks = document.getElementsByClassName('tab-toggle');
    for (let i=0; i<tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' active', '')
    }

    // Show current tab, add active class to the button
    document.getElementById(tabName).style.display = 'block';
    e.currentTarget.className += ' active';
}

const infoButton = document.getElementById('info-button');
infoButton.addEventListener('click', function(e) {
    openTab(e, 'info-tab');
});

const settingsButton = document.getElementById('settings-button');
settingsButton.addEventListener('click', function(e) {
    openTab(e, 'settings-tab');
});

/*
Save settings
*/
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', function() {
    let deckName = document.getElementById('deck-input').value;

    chrome.storage.sync.set({'currentDeck': deckName}, function() {
        console.log('New deck set');
    });
});

/*
Load current deck to info page
*/
chrome.storage.sync.get('currentDeck', function(data) {
    let di = document.getElementById('deck-info');
    di.setAttribute('value', data.currentDeck);
});
