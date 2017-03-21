// TODO: Create helper methods to retrieve metacards collection, so that
// card uuid's can be selected from there.
class Backend {
	constructor(uuid = '58b8f1f7b2ef4ddae2fb8b17') {
		this.apiUrl = 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/';
		this.pyramidUrl = 'https://controversy-cards-assets.s3.amazonaws.com/';
		this.assetsUrl = 'https://controversy-cards-assets.s3.amazonaws.com/';

		this.card = {
			id: uuid,
			metadata: {
				name: null,
				summary: null,
				graphicType: null
			},
			graphics: [],
			pyramidUrl: this.pyramidUrl + uuid + '/pyramid_files/',
			assetsUrl: this.assetsUrl + uuid + '/assets/',
			iconUrl: this.assetsUrl + uuid + '/icon/'
		};
	}

	getPyramidUrl() {
		return this.card.pyramidUrl;
	}

	getAssetsUrlBase() {
		return this.card.assetsUrl;
	}

	getCardData() {
		return this.card;
	}

	getIconUrlBase() {
		return this.card.iconUrl;
	}

	saveMetaData(data) {
		this.card.metadata.name = data['name'];
		this.card.metadata.summary = data['summary'];
		this.card.metadata.graphicType = data['graphicType'];
		this.card.graphics = data['graphic']['overlays']['assets'];
		this.card.icon = data['graphic']['icon'];
	}

	getAllCardData() {
		return new Promise((resolve, reject) => {
			let cardRequest = new Request(this.apiUrl + this.card.id);

			fetch(cardRequest)
				.then(response => response.json())
				.then(json => {
					console.log(json);
					this.saveMetaData(json['body'][0]);
					console.log(this.card);
					resolve(this.card);
				})
				.catch(error => {
					reject(error);
				})
		});
	}
}

export default Backend;
