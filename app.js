// require packages used in this project 
const express = require('express');
const app = express();
const port = 3000;

// require express-handlebars
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

//route setting 
app.get('/', (req, res) => {
  res.render('index', {restaurant: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log('req.params.restaurant_id:',req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {restaurant: restaurants, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})