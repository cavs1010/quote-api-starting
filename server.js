const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

// Get a random quote
app.get("/api/quotes/random", (req, res, next) => {
  res.send({ quote: getRandomElement(quotes) });
});

// Get all the quotes and/or filter by author
app.get("/api/quotes", (req, res, next) => {
  const person = req.query.person;
  if (!Boolean(person)) {
    res.send({ quotes: quotes });
  } else {
    const arrayResponse = quotes.filter((quote) => quote.person === person);
    if (arrayResponse) {
      res.send({ quotes: arrayResponse });
    } else {
      res.send(arrayResponse);
    }
  }
});

// Create a POST request
app.post("/api/quotes", (req, res, next) => {
  const quoteCreated = req.query.quote;
  const author = req.query.person;
  if ((quoteCreated !== "") & (author !== "")) {
    const newQuote = { quote: quoteCreated, person: author };
    console.log(newQuote);
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(404).send();
  }
});

app.use(express.static("public"));
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
