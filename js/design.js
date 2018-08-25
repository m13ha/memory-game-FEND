const dcArray = ['batman', 'shazam', 'cyborg', 'flash', 'greenlantern', 'joker', 'superman', 'wonderwoman'];

const marvelArray = ['blackpather', 'captain_america', 'hulk', 'ironman', 'spiderman', 'thanos', 'thor', 'venom'];

const deck = $('.deck');
let cards = 16;
let gameStart = false;
let clickCount = 0;

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
    cardMaker();
    cardFlip();


})

function cardMaker() {
    let theme = $('#theme').val();
    let firstArray;
    let secondArray;
    let cardArray;



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
}

function cardFlip () {
    let fcp; //FIRSTCARDPARENT
    let scp; //SECONDCARDPARENT
    let firstCard;
    let secondCard;
    let card = $('.card');
    
    card.click(function (e) {
        clickCount++;
        e.preventDefault();
        if (clickCount === 1 && $(this).hasClass("show") === false) {
            fcp = $(this);

            firstCard = $(this)
                .find(".back")
                .css("background-image");
            $(this).addClass("show");
        }

        if (clickCount === 2 && $(this).hasClass("show") === false) {
            scp = $(this);
            secondCard = $(this)
                .find(".back")
                .css("background-image");

            $(this).addClass("show");

            if (secondCard === firstCard) {
                cards = cards - 2;
                fcp.removeClass("show");
                scp.removeClass("show");

                if (cards === 0) {
                    alert("Game Over");
                }

                setTimeout(function () {
                    fcp.addClass("correct");
                    scp.addClass("correct");
                    if (cards === 0) {
                        alert("Game Over");
                    }
                }, 100);

                clickCount = 0;
            } else {
                clickCount = 0;
                setTimeout(function () {
                    fcp.removeClass("show");
                    scp.removeClass("show");
                }, 1500);
            }
        }
    });
}




















