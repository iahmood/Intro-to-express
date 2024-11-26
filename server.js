const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

const express = require('express')
const validator = require('validator')

const app = express()

app.get('/greetings/:name', (req, res) => {
  res.send(`Greetings ${req.params.name}.`)
})

app.get('/roll/:number', (req, res) => {
  let randomNumber = Math.floor(Math.random() * req.params.number) + 1
  if (validator.isInt(req.params.number)) {
    res.send(`You rolled: ${randomNumber}`)
  } else {
    res.send('Enter a valid number')
  }
})

app.get('/collectibles/:index', (req, res) => {
  const totalCollectibles = collectibles.length
  if (req.params.index < totalCollectibles) {
    res.send(
      `You want the ${collectibles[req.params.index].name}? For ${
        collectibles[req.params.index].price
      }. It can be yours!`
    )
  } else {
    res.send('Invalid index')
  }
})

app.get('/shoes', (req, res) => {
  const filteredShoes = []
  if (Object.keys(req.query).length !== 0) {
    shoes.forEach((shoe) => {
      if (
        (req.query['min-price']
          ? parseFloat(req.query['min-price']) < shoe.price
          : true) &&
        (req.query['max-price']
          ? parseFloat(req.query['max-price']) > shoe.price
          : true) &&
        (req.query.type ? req.query.type === shoe.type : true)
      ) {
        filteredShoes.push(shoe)
      }
    })
    res.send(
      filteredShoes.length > 0 ? filteredShoes : 'No shoes match the criteria'
    )
  } else {
    res.send(shoes)
  }
})

app.listen(3000, () => {
  console.log('Listening on Port: 3000!')
})
