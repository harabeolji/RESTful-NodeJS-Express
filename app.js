const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const database = [
	{name: 'John Doe', age: 25},
	{name: 'Jane Doe', age: 23},
];

// CREATE
app.post('/', (req, res) => {
	const { name, age } = req.body;
	database.push({ name, age })
	res.redirect('/');
});

// READ
// Index
app.get('/', (req, res) => {
	const data = database;
	res.render('index', {data});
});

// Show
app.get('/:name', (req, res) => {
	const name = req.params.name;
	const data = database.find( data => data.name === name);
	if (!data) res.redirect('/');
	else res.render('show', {data});
})

// Edit
app.get('/:name/edit', (req, res) => {
	const { name } = req.params;
	const data = database.find( data => data.name === name);
	if (!data) res.redirect('/');
	else res.render('edit', {data});
})

// UPDATE
app.patch('/:name', (req, res) => {
	const name = req.params.name;
	const newAge = req.body.age;
	const data = database.find( data => data.name === name);
	data.age = newAge;
	res.redirect('/');
});

// DELETE
app.delete('/:name', (req, res) => {
	const { name } = req.params;
	const data = database.find( data => data.name === name);
	const deleteIndex = database.indexOf(data);
	database.splice(deleteIndex, 1);
	res.redirect('/');
});


app.listen(3000, () => {
	console.log('Server started');
});