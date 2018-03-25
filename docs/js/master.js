var COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v1/ticker/?limit=10";

//var CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data/all/coinlist";

// Refactor

function makePreList(slots) {
	var myList = document.getElementById('myList');

	for(let i = 0; i < 10; i++) {
		var li = makeSlots(slots, i+1);
		myList.appendChild(li);
	}
}

function makeSlots(array, rank) {
	var li = document.createElement('li');
	li.setAttribute('id', `rank-${rank}`);

	for(let i = 0; i < array.length; i++) {
		var span = document.createElement('span');
		span.classList.add(`${array[i]}-slot`);
		li.appendChild(span);
	}
	return li;
}

function getList(rank) {
	return document.getElementById(`rank-${rank}`);
}

function setSlot(parent, slot, text) {
	var el = parent.querySelector(`.${slot}`);
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

function setCrypto(parent, symbol, id) {
	var img = document.createElement('img');
	var p = document.createElement('p');
	img.setAttribute('alt', 'logo');
	var imgUrl = `${IMG_URL}${id}.png`;
	img.setAttribute('src', imgUrl);
	p.textContent = symbol;

	var slot = parent.querySelector('.crypto-slot');
	slot.appendChild(img);
	slot.appendChild(p);
	return slot;
}

var IMG_URL = "https://raw.githubusercontent.com/dziungles/cryptocurrency-logos/master/coins/16x16/";

function updateList(data) {
	var parent = getList(data.rank);
	setSlot(parent, 'rank-slot', data.rank);
	setCrypto(parent, data.symbol, data.id);
	setSlot(parent, 'name-slot', data.name);
	setSlot(parent, 'price-slot', data.price_usd);
	setPctSlot(parent, 'hour-slot', data.percent_change_1h);
	setPctSlot(parent, 'day-slot', data.percent_change_24h);
	setPctSlot(parent, 'week-slot', data.percent_change_7d);
	setSlot(parent, 'cap-slot', data.market_cap_usd);
}

function renderTopTenCrypto(array) {
	console.log(array);
	for(let i = 0; i < array.length; i++) {
		updateList(array[i]);
	}
	return array;
}

function updateCryptoImage(cryptoArray, data) {
	for(let i = 0; i < cryptoArray.length; i++) {
		var symbol = cryptoArray[i].symbol;
		var cryptoData = data.Data[symbol];
		if(cryptoData) {
			var list = getList(i+1);
			var img = list.querySelector('img');
			img.setAttribute('src', `${CRYPTOCOMPARE_API_URI}${cryptoData.ImageUrl}`);
			void img.offsetWidth;
			console.log(img);
		}
	}
}

var slots = ['rank', 'crypto', 'name', 'price', 'hour', 'day', 'week', 'cap'];

makePreList(slots);



fetch(COINMARKETCAP_API_URI)
.then(res => res.json())
.then(renderTopTenCrypto)
.catch(error => console.log(error));
