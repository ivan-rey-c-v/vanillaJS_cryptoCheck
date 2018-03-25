var COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v1/ticker/?limit=10";

var CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data/all/coinlist";


// Refactor

function makePreList(slots) {
	for(let i = 0; i < 10; i++) {
		var li = document.createElement('li');
		li.setAttribute(id, `rank-${i+1}`);
		makeSlots(li, slots);
	}
}

function makeSlots(parent, array) {
	for(let i = 0; i < array.length; i++) {
		var span = document.createElement('span');
		span.classList.add(array[i]);
		parent.appendChild(parent);
	}
	return parent;
}

function getList(rank) {
	return document.getElementById(`rank-${rank}`);
}

function setSlot(parent, slot, text) {
	var el = parent.getElementByClassName(slot);
	el.textContent = text;
	return el;
}

function setPctSlot(parent, slot, num) {
	var colorClass = num < 0 ? 'red' : 'green';
	var content = `${num}%`;
	var el = setSlot(parent, slot, content);
	el.classList.add(colorClass);
	return el;
}

function setCrypto(parent, symbol) {
	var img = document.createElement('img');
	var p = document.createElement('p');
	img.setAttribute('alt', 'logo');
	p.textContent = symbol;

	var slot = parent.getElementByClassName('crypto-slot');
	slot.appendChild(img);
	slot.appendChild(p);
	return slot;
}

function updateList(data) {
	var parent = getList(data.rank);
	setCrypto(parent, data.symbol);
	setSlot(parent, 'name-slot', data.name);
	setSlot(parent, 'price-slot', data.price_usd);
	setPctSlot(parent, 'hour-slot', data.percent_change_1h);
	setPctSlot(parent, 'day-slot', data.percent_change_24h);
	setPctSlot(parent, 'week-slot', data.percent_change_7d);
	setPctSlot(parent, 'cap-slot', data.market_cap_usd);
}

function renderTopTenCrypto(array) {
	for(let i = 0; i < array.length; i++) {
		updateList(array[i]);
	}
	return array;
}

function updateCryptoImage(cryptoArray, data) {
	for(let i = 0; i < cryptoArray.length; i++) {
		var symbol = cryptoArray[i].symbol;
		var cryptoData = data[symbol];
		if(cryptoData) {
			var list = getList(`rank-${i + 1}`);
			var img = list.getElementsByTagName('img');
			img.setAttribute('src', cryptoData.ImageUrl);
		}
	}
}

var slots = ['rank', 'crypto', 'name', 'price', 'hour', 'day', 'week', 'cap'];

makePreList(slots);

fetch(COINMARKETCAP_API_URI)
.then(res => res.json())
.then(renderTopTenCrypto)
.then(nodesArray => {
	fetch(CRYPTOCOMPARE_API_URI)
	.then(res => res.json())
	.then(data => {
		updateCryptoImage(nodesArray, data)
	})
})
