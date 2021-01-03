const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote-text")
const authorText = document.getElementById("author")
const twitterButton = document.getElementById("twitter")
const quoteButton = document.getElementById("new-quote")





// get quote from api

async function getQuote() {
    const proxyUrl = "https://tranquil-garden-89684.herokuapp.com/"
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);


        // assigning it to DOM

        authorText.innerText = data.quoteAuthor ? data.quoteAuthor : "unknown";

        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        }
        else {
            quoteText.classList.remove("long-quote");
        }

        quoteText.innerText = data.quoteText;
    }
    catch (error) {
        getQuote();
        console.log(error);
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const url = `https://twitter.com/intent/tweet?text=${quote +"-" +author}`

    window.open(url,"_blank")
}
// event listeners 

quoteButton.addEventListener('click',getQuote)

twitterButton.addEventListener('click',tweetQuote)


//  onLoad

getQuote();