const magicButton = document.getElementById('magic');

const originField = 'word_eng';
const translationField = 'word_tha';

magicButton.addEventListener('click', function() {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8765');
    xhr.send(JSON.stringify(
        {
            'action': 'findCards',
            'version': 6,
            'params': {
                'query': 'deck:current'
            }
        }
    ));
    debugger;
});
