function createNode (tag) {
	return document.createElement(tag);
}

function addContent (node, content) {
	node.textContent = content;
	return node;
}

function append (parent, child) {
	return parent.appendChild(child);
}

function newTD (parent, content) {
	var td = createNode('td');
	addContent(td, content);
	return append(parent, td);
}

function createNewRow(array) {
	var tr = createNode('tr');
	for(let i = 0; i < array.length; i++) {
		let content = array[i];
		newTD(tr, content);
	}
	return append(tbody, tr);
}

var currency = ['ETH', 'DASH', 'BCH', 'BTC'];
var convertion = ['USD', 'EUR'];

var url = `
	https://min-
	api.cryptocompare.com/data/price
	multi?
	fsyms=${currency.toString()}
	&tsyms=${convertion.toString()}
	`

console.log(url);


fetch(url)
	.then(res => {
		res.json().then(data => {
			console.log(data, data['ETH']);

		});
	})
