var COINMARKETCAP_API_URI = "https://api.coinmarketcap.com/v1/ticker/?limit=10";

var CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com/data/all/coinlist";


function fetchCoinsData(arr) {
	return fetch(COINMARKETCAP_API_URI)
		.then(res => res.json())
		.then(data => {
			for(let i = 0; i < data.length; i++) {
			  arr.push(data[i]);
			}
		});
}

function fetchCoinsImages(array) {
	return fetch(CRYPTOCOMPARE_API_URI)
		.then(res => res.json())
		.then(data => {
			for(let i =0; i < array.length; i++) {
				let symbol = array[i].symbol

				// symbol may not match
				if(data.Data[symbol] === undefined) {
					return undefined;
				}

				array[i].ImageUrl = data.Data[symbol].ImageUrl;
			}
		});
}

async function fetchCompleteCoinsData() {
	var _coinsData = [];
	await fetchCoinsData(_coinsData);
	await fetchCoinsImages(_coinsData);
	return _coinsData;
}

fetchCompleteCoinsData()
	.then(data => {
		renderTopTenCrypto(data);
	});

function renderTopTenCrypto(array) {
	for(let i = 0; i < array.length; i++) {
		newList(array[i]);
	}
}

function newList (data) {
	var _parent = el('li');
	var _rank = fullSpan(data.rank, 'w-2');
	var _crypto = cryptoSpan(data.ImageUrl, data.symbol);
	var _name = fullSpan(data.name, 'flex-1', 'hidden', 'screen-medium');
	var _price = fullSpan(data.price_usd, 'flex-1');
	var _hour = pctSpan(data.percent_change_1h, 'hidden', 'screen-large');
	var _day = pctSpan(data.percent_change_24h);
	var _week = pctSpan(data.percent_change_7d, 'hidden', 'screen-small');
	var _cap = marketCap(data.market_cap_usd);
	append(
		_parent,
		_rank,
		_crypto,
		_name,
		_price,
		_hour,
		_day,
		_week,
		_cap
	);
	myList.appendChild(_parent);
}

function el(tag) {
	return document.createElement(tag);
}

function fullSpan(content, ...classNames) {
	var span = el('span');
	span.textContent = content;
	span.classList.add(...classNames);
	return span;
}

function cryptoSpan(url, symbol) {
	var span = el('span');
	var img = el('img');
	var p = el('p');
	img.setAttribute('src', `https://www.cryptocompare.com${url}`);
	img.setAttribute('alt', 'logo');
	p.textContent = symbol;
	span.appendChild(img);
	span.appendChild(p);
	span.classList.add('flex-1')
	return span;
}

function pctSpan(num, ...classNames) {
	var span = el('span');
	var colorClass = num < 0 ? 'red' : 'green';
	var content = `${num}%`;
	span.textContent = content;
	span.classList.add('flex-1', colorClass, ...classNames);
	return span;
}

function marketCap(cap) {
	var span = el('span');
	span.classList.add('flex-2', 'hidden', 'screen-larger');
	span.textContent = cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return span;
}

function append(parent, ...children) {
	for(let i = 0; i < children.length; i++) {
		parent.appendChild(children[i]);
	}
}