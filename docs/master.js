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

createNewRow([
	'Ether',
	'Etherium',
	1,
	200,
	+5,
	'$500'
])
