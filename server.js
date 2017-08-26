var express=require('express');
var bodyParser=require('body-parser');
var _ = require('underscore'); 

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
	var matchedTodo = _.findWhere(todos, {"id": todoId});
	// var matchedTodo
	// todos.forEach(function(todo){
	// 	console.log ('checking id ' + todo.id); 
	// 	if (todoId === todo.id) {
	// 		matchedTodo = todo; 
	// 		console.log ('Match found'); 
	// 	};
	// })
	if (matchedTodo) {
		res.send(matchedTodo); 
	} else {
		console.log('404');
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, "description", "completed"); // user _.pick to only pick description and completed 


	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send(); 
	}

	body.id = todoNextId++; 
	
	// set body.description to be trimmed value 
	body.description = body.description.trim(); 

	todos.push (body); 
	//add id field 
	//push body into array 
	console.log('description: ' + body.description);
	res.json(body); 
}); 


// DELETE /todos/:id 

app.delete('/todos/:id', function(req, res) {
	var deleteTodoId = parseInt(req.params.id, 10); 
	var matchedDeleteTodo = _.findWhere(todos, {"id": deleteTodoId}); 
	if (matchedDeleteTodo){
		todos = _.without(todos, matchedDeleteTodo);
		res.send(todos);
	} else {
		res.status(404).send(); 
	}
}); 

// PUT 

app.put('/todos/:id', function(req, res) {
	var TodoId = parseInt(req.params.id, 10); 
	var matchedTodo = _.findWhere(todos, {"id": TodoId});
	var body = _.pick(req.body, "description", "completed", "id");
	var validAttributes = {};

	if (!matchedTodo){
		return res.status(404).send(); 
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed=body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	} 

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description=body.description.trim(); 
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send(); 
	}

	_.extend(matchedTodo, validAttributes);
	res.json(matchedTodo); 
});



app.listen(PORT, function () {
	console.log ('Express listening on port ' + PORT + '!'); 
}); 
