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


var _coins = ['ETH', 'DASH', 'BCH', 'BTC'];
var _currency = ['USD', 'EUR'];

var coinListUrl = 'https://www.cryptocompare.com/api/data/coinlist/';

var coinDataUrl = `
	https://min-
	api.cryptocompare.com/data/price
	multi?
	fsyms=${_coins.toString()}
	&tsyms=${_currency.toString()}
	`

function goFetch (url) {
	let data;
	fetch(url)
		.then(res => {
			res.json()
				.then(json => {
					data = json;
				})
		})
	return data;
}

function getCoinsData () {
	let listInfo = goFetch(coinListUrl);
	let coinsData = goFetch(coinsDataUrl);
	return _coins.map( x => {
		return {
			imgUrl: listInfo[x].imageUrl,
			data: coinsData[x]
		}
	});
}

var _coinsData = getCoinsData();

function renderCoinsData(dataArray) {

}