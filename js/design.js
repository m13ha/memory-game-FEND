const dcArray = ['batman', 'shazam', 'cyborg', 'flash', 'greenlantern', 'joker', 'superman', 'wonderwoman'];

const marvelArray = ['blackpanther', 'captain_america', 'hulk', 'ironman', 'spiderman', 'thanos', 'thor', 'venom'];

const deck = $('.deck');
let cards = 16;
let gameStart = false;
let clickCount = 0;
let audio = new Audio('./audio.mp3');
let audio2 = new Audio('./audio2.mp3');

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
    resetGame();


})

function cardMaker() {
    let theme = $('#theme').val();
    let firstArray;
    let secondArray;
    let cardArray;



    if (gameStart === false) {
        gameStart = true;

        if (theme === 'dc') {
            deck.html('');
            firstArray = shuffleArray(dcArray);
            secondArray = shuffleArray(dcArray);
            cardArray = firstArray.concat(secondArray);
            characterArray = shuffleArray(cardArray);

            characterArray.forEach(function (element) {
                deck.append(`<div class="card"><div class="front dc"></div> <div class="back ${element}"></div></div>`)
            })
        }

        if (theme === 'marvel') {
            deck.html('');
            firstArray = shuffleArray(marvelArray);

            secondArray = shuffleArray(marvelArray);

            cardArray = firstArray.concat(secondArray);

            characterArray = shuffleArray(cardArray);

            characterArray.forEach(function (element) {
                deck.append(`<div class="card"><div class="front marvel"></div> <div class="back ${element}"></div></div>`)
            })
        }

    }
}

function cardFlip() {
    let fcp; //FIRSTCARDPARENT
    let scp; //SECONDCARDPARENT
    let firstCard;
    let secondCard;
    let card = $('.card');

    card.click(function (e) {
        e.preventDefault();
        if (clickCount === 0 && $(this).hasClass("show") === false) {
            fcp = $(this);

            firstCard = $(this)
                .find(".back")
                .css("background-image");
            $(this).addClass("show");
            clickCount++
        }

        if (clickCount === 1 && $(this).hasClass("show") === false) {
            scp = $(this);
            secondCard = $(this)
                .find(".back")
                .css("background-image");

            $(this).addClass("show");

            if (secondCard === firstCard) {
                cards = cards - 2;
                audio.play();
                fcp.addClass("correct");
                scp.addClass("correct");

                fcp.removeClass("show");
                scp.removeClass("show");
                clickCount = 0;



                firstCard = undefined;
                secondCard = undefined;

                if (cards === 0) {
                    audio2.play();
                    alert("Game Over");
                }
            }

            else {
                setTimeout(() => {
                    fcp.removeClass("show");
                    scp.removeClass("show");
                }, 500);

                firstCard = undefined;
                secondCard = undefined;

                clickCount = 0;


            }


        }

    });
}






function resetGame() {

    $(".restart").click(function () {
        gameStart = false;
        totalCard = 16;
        clickCount = 0;
        deck.empty();


    });
}







