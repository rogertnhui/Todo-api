var express=require('express');
var bodyParser = require('body-parser');
var app=express(); 
var PORT=process.env.PORT || 3000; 
var todoNextId = 1; 
var todos = []; 

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root'); 
}); 

// GET /todos 
app.get('/todos', function (req, res) {
	res.json(todos); 
}); 

// GET /todos/:id 
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10); 
	var matchedTodo
	todos.forEach(function(todo){
		console.log ('checking id ' + todo.id); 
		if (todoId === todo.id) {
			matchedTodo = todo; 
			console.log ('Match found'); 
		};
	})
	if (matchedTodo) {
		res.send(matchedTodo); 
	} else {
		console.log('404');
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = req.body;
	body.id = todoNextId; 
	todoNextId++; 
	todos.push (body); 
	//add id field 
	//push body into array 
	console.log('description: ' + body.description);
	res.json(body); 
}); 


app.listen(PORT, function () {
	console.log ('Express listening on port ' + PORT + '!'); 
}); 
