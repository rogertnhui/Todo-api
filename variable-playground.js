var todos = [{
	description: 'Lunch with mum',
	completed: true
}, {
	description: 'walk the dog',
	completed: false
}]

function updateArray (array) {
	// array = [{
	// 	description: 'Lunch with mum',
	// 	completed: false
	// }, {
	// 	description: 'walk the dog',
	// 	completed: false
	// }, {
	// 	description: 'walk the cat',
	// 	completed: false
	// }]
	array.push({
		description: 'walk the cat', 
		completed: false
	})
	debugger; 
}

updateArray (todos); 
console.log (todos); 