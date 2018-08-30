const dcArray = ['batman', 'shazam', 'cyborg', 'flash', 'greenlantern', 'joker', 'superman', 'wonderwoman'];

const marvelArray = ['blackpanther', 'captain_america', 'hulk', 'ironman', 'spiderman', 'thanos', 'thor', 'venom'];

// global variables required
const deck = $('.deck');
let cards = 8;
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

// shuffle function
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

// game initialization
$('.start').click(function (e) {
    e.preventDefault();
    gameConstruct();
})

// game initialization function
function gameConstruct() {
    if (gameStart === false) {
        cardMaker();
        gameSystem();
        resetGame();
        timer();
        playAgain();
    }
}


// card creation function
function cardMaker() {
    // get theme
    let theme = $('.theme').val();
    let firstArray;
    let secondArray;
    let cardArray;

    if (gameStart === false) {
        gameStart = true;

        // determine array to use 
        if (theme === 'dc') {
            deck.html('');
            firstArray = shuffleArray(dcArray);

            secondArray = shuffleArray(dcArray);

            cardArray = firstArray.concat(secondArray);

             // final shuffled array to be displayed
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
            // final shuffled array to be displayed
            characterArray = shuffleArray(cardArray);

            characterArray.forEach(function (element) {
                deck.append(`<div class="card"><div class="front marvel"></div> <div class="back ${element}"></div></div>`)
            })
        }

    }
}

// card flip system the integral part of the game
function gameSystem() {
    let fcp; //FIRSTCARDPARENT
    let scp; //SECONDCARDPARENT
    let firstCard;
    let secondCard;
    let card = $('.card');

    card.click(function (e) {
        e.preventDefault();

        // check card
        if (clickCount === 0 && $(this).hasClass("show") === false) {
            // store card
            fcp = $(this);

            //get value of cards  back image
            firstCard = $(this)
                .find(".back")
                .css("background-image");


            // flip card
            $(this).addClass("show");


            clickCount++
        }

        // make sure second card isnt the same card clicked before
        if (clickCount === 1 && $(this).hasClass("show") === false) {
            // disable all cards
            card.addClass('disable');
            // store card
            scp = $(this);

            // get value of cards back image
            secondCard = $(this)
                .find(".back")
                .css("background-image");

            // flip card
            $(this).addClass("show");

            // compare cards
            if (secondCard === firstCard) {
                // increment moves and decrement cards
                moves++;
                cards--;
                // play sfx
                audio.play();
                // add class of correct
                fcp.addClass("correct");
                scp.addClass("correct");
                // remove class of show
                fcp.removeClass("show");
                scp.removeClass("show");
                // reset click count
                clickCount = 0;
                // update moves
                totalMoves.text(`${moves}`);
                // remove values for cards
                firstCard = undefined;
                secondCard = undefined;
                // card track function
                cardTracker();
                // star counting function
                starCounter();

                setTimeout(() =>{
                // remove class of disable
                    $('.card').removeClass('disable');
                },500 )

            }

            else {
                setTimeout(() => {
                  // remove class of show
                    fcp.removeClass("show");
                    scp.removeClass("show");
                  // remove class of disable
                    card.removeClass('disable')
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

// timer function
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

    // update seconds
    seconds.text(function () {
        if (sec > 9) {
            return sec;
        } else {
            return `0${sec}`;
        }
    })

    // update minutes
    minutes.text(function () {
        if (mins > 9) {
            return `${mins}`;
        } else {
            return `0${mins}`;
        }
    })

    // update hour
    hour.text(function () {
        if (hours > 9) {
            return `${hours}`;
        } else {
            return `0${hours}`;
        }
    })

    count();
}

function count() {
    // start timer
    clock = setTimeout(timer, 1000);
}


function cardTracker() {
    if (cards === 0) {
        //stop timer
        clearInterval(clock);
        // play sfx
        audio2.play();
        sec = 0;
        mins = 0;
        hours = 0;
        cards = 8;
        // show modal
        modalShow();
        gameStart = false;
    }
}


// reset function
function reset() {
    gameStart = false;
    cards = 8;
    clickCount = 0;
    deck.empty('');
    clearInterval(clock);
    sec = 0;
    mins = 0;
    hours = 0;
    seconds.text('00');
    minutes.text('00');
    hour.text('00');
    moves = 0;
    totalMoves.text(`${moves}`);
    starRevert();
}

// reset function with event listener
function resetGame() {
    $('.reset').click(function (e) {
        e.preventDefault();
        reset();
    })
}


// star reduction function
function starCounter() {
    if (moves === 8) {
        $('.star-one').css('display', 'none');
    }

    if (moves === 12) {
        $('.star-two').css('display', 'none');
    }
}

// star revert function
function starRevert() {
    $('.star-one').css('display', 'block');
    $('.star-two').css('display', 'block');
}

// play again function
function playAgain() {
    $('.yes-play').click(function (e) {
        e.preventDefault();
        reset();
        modalHide();
    })
}

// not playing again function
$('.no-play').click(function (e) {
    e.preventDefault();
    modalHide();
})

// modal dismissing function
function modalHide() {
    $('.modal').css('display', 'none');
}

// modal showing function
function modalShow() {
    $('.modal').css('display', 'block');
}