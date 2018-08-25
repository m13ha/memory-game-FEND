const dcArray = ['batman', 'darkseid', 'deadshot', 'flash', 'greenlantern', 'joker', 'superman', 'wonderwoman'];

const marvelArray = ['Blackpather', 'captain_america', 'hulk', 'ironman', 'spiderman', 'thanos', 'thor', 'venom'];

const deck = $('.deck');
let theme = $('#theme').val();
let level = $('#level').val();
let cards = 16;
let firstArray;
let secondArray;
let cardArray;
let gameStart = false;

function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


$('#start').click(function (e) {
    e.preventDefault();
    if (gameStart === false) {
        gameStart = true;

        if (theme === 'dc') {
            firstArray = shuffleArray(dcArray);
            secondArray = shuffleArray(dcArray);
            cardArray = firstArray.concat(secondArray);

            cardArray.forEach(function (element) {
                deck.append(`<div class="card"><div class="front dc"></div> <div class= ${element}></div></div>`)
            })
        }

        if (theme === 'marvel') {
            firstArray = shuffleArray(marvelArray);

            secondArray = shuffleArray(marvelArray);

            cardArray = firstArray.concat(secondArray);

            cardArray.forEach(function (element) {
                deck.append(`<div class="card"><div class="front marvel"></div> <div class= ${element}></div></div>`)
            })
        }
        
    }

})






















