function createNode (tag) {
	return document.createElement(tag);
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

//var _coinsData = getCoinsData();

function createSpan (content, className) {
	let span = createNode('span');
	span.textContent = content;
	span.classList.add(className);
	return span;
}
function createSpanImg (src) {
	let span = createNode('span');
	span.classList.add('flex-1');
	let img = createNode('img');
	img.setAttribute('src', src);
	return span;
}

function createList (data) {
	let li = createNode('li');
	//let span1 = createSpanImg(data.imgUrl);
	let span1 = createSpan('logo', 'flex-1');
	let span2 = createSpan(data.rank, 'flex-1');
	let span3 = createSpan(data.symbol, 'flex-1');
	let span4 = createSpan(data.name, 'flex-2');
	let span5 = createSpan(data.price, 'flex-3');
	li.append(span1, span2, span3, span4, span5);
	list.append(li);
	return li;
}

function renderCoinsData(dataArray) {

}

createList(
	{
		imgUrl: 'asdf',
		rank: 1,
		symbol: 'ETH',
		name: 'Ethereum',
		price: 500
	}
)
createList(
	{
		imgUrl: 'asdf',
		rank: 1,
		symbol: 'ETH',
		name: 'Ethereum',
		price: 500
	}
)