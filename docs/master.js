function createNode (tag) {
	return document.createElement(tag);
}

var _coins = ['ETH', 'DASH', 'BCH', 'BTC'];
var _currency = ['USD'];

var coinsListUrl = 'https://www.cryptocompare.com/api/data/coinlist/';

var coinsDataUrl = `
	https://min-
	api.cryptocompare.com/data/price
	multi?
	fsyms=${_coins.toString()}
	&tsyms=${_currency.toString()}
	`

async function goFetch(url) {
	let data;
	await fetch(url, {mode: 'cors'})
		.then(res => {
			res.json()
				.then(json => {
					data = json;
				})
		})
	return data;
}

async function getCoinsData () {
	let listInfo = await goFetch(coinsListUrl);
	let coinsData = await goFetch(coinsDataUrl);
	console.log(listInfo, coinsData);
	return _coins.map( x => {
		return {
			imgUrl: listInfo[x].ImageUrl,
			rank: listInfo[x].SortOrder,
			symbol: listInfo[x].Symbol,
			name: listInfo[x].Name,
			price: coinsData[x].USD
		}
	});
}

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
	let span1 = createSpanImg(data.imgUrl);
	let span2 = createSpan(data.rank, 'flex-1');
	let span3 = createSpan(data.symbol, 'flex-1');
	let span4 = createSpan(data.name, 'flex-2');
	let span5 = createSpan(data.price, 'flex-3');
	li.append(span1, span2, span3, span4, span5);
	list.append(li);
	return li;
}

getCoinsData().then(res => console.log(res))
