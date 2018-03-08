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

function fetchCoinsImages(arr) {
	return fetch(CRYPTOCOMPARE_API_URI)
		.then(res => res.json())
		.then(data => {
			arr.map(x => {
				x.ImageUrl = data.Data[x.symbol].ImageUrl;
			})
		});
}

async function fetchCompleteCoinsData() {
	var _coinsData = [];
	await fetchCoinsData(_coinsData);
	await fetchCoinsImages(_coinsData);
	return _coinsData;
}

renderCoinsList()
	.then(res => console.log(res));