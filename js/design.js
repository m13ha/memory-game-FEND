const dcArray = ['batman', 'shazam', 'cyborg', 'flash', 'greenlantern', 'joker', 'superman', 'wonderwoman'];

const marvelArray = ['blackpanther', 'captain_america', 'hulk', 'ironman', 'spiderman', 'thanos', 'thor', 'venom'];

const deck = $('.deck');
let cards = 16;
let gameStart = false;
let clickCount = 0;
let audio = new Audio('./audio.mp3');
let audio2 = new Audio('./audio2.mp3');
let hour = $('.hour');
let minutes = $('.minutes');
let seconds = $('.seconds');
let sec = 0;
let mins = 0;
let hours = 0;
let clock;
let moves = 0;
let totalMoves = $('.moves');

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
    if( gameStart === false){
        cardMaker();
        gameSystem();
        resetGame();
        timer();
    }
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

function gameSystem() {
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
                moves++;
                cards = cards - 2;
                audio.play();
                fcp.addClass("correct");
                scp.addClass("correct");

                fcp.removeClass("show");
                scp.removeClass("show");
                clickCount = 0;

                totalMoves.text(`${moves}`);

                firstCard = undefined;
                secondCard = undefined;

                if (cards === 0) {
                    audio2.play();
                    clearInterval(clock);
                    sec = 0;
                    mins = 0;
                    hours = 0;
                }

                starCounter();
            }

            else {
                setTimeout(() => {
                    fcp.removeClass("show");
                    scp.removeClass("show");
                }, 500);
                moves++;
                totalMoves.text(`${moves}`);
                firstCard = undefined;
                secondCard = undefined;
                clickCount = 0;

                starCounter();
            }


        }

    });
}






function resetGame() {

    $(".reset").click(function (e) {
        e.preventDefault();
        gameStart = false;
        totalCard = 16;
        clickCount = 0;
        deck.empty('');
        clearInterval(clock);
        sec = 0;
        mins = 0;
        hours = 0;
        seconds.text('00');
        minutes.text('00;');
        hour.text('00:');
        starRevert();
    });
}




function timer() {

    sec++;

    if (sec === 60) {
        sec = 0;
        mins++;
        if (mins === 60) {
            mins = 0;
            hours++;
        }
    }

    seconds.text(function () {
        if (sec > 9) {
            return sec;
        } else {
            return `0${sec}`;
        }
    })

    minutes.text(function () {
        if (mins > 9) {
            return `${mins}:`;
        } else {
            return `0${mins}:`;
        }
    })

    hour.text(function () {
        if (hours > 9) {
            return `${hours}:`;
        } else {
            return `0${hours}:`;
        }
    })

    count();
}

function count() {
    clock = setTimeout(timer, 1000);
}

function starCounter() {
    if(moves === 8) {
        $('.star-one').css('display', 'none');
    }

    if (moves === 16) {
        $('.star-two').css('display', 'none');
    }
}

function starRevert() {
    moves = 0;
    totalMoves.text(`${moves}`);
    $('.star-one').css('display', 'block');
    $('.star-two').css('display', 'block');
}