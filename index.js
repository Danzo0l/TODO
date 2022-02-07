
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRouts = require('./routes/todos')
const path = require('path')

const PORT = process.env.PORT || 8000
const app = express()

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRouts)

async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://danzo0l:8462@cluster0.mgwpw.mongodb.net/myFirstDatabase', 
			{
			useNewUrlParser: true,
			//useFindAndModify: false,
			}
		)
		app.listen(PORT, () => {
			console.log(`> server runned on http://localhost:${PORT}`)
		})
		
	} catch (e) {
		console.log('> cannot connect')
	}
}

start()

