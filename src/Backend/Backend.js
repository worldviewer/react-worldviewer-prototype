// TODO: Create helper methods to retrieve metacards collection, so that
// card id's can be selected from there.
class Backend {
	constructor(id = '58b8f1f7b2ef4ddae2fb8b17') {
		this.apiUrlBase = 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/';
		this.pyramidUrlBase = 'https://controversy-cards-assets.s3.amazonaws.com/';
		this.assetsUrlBase = 'https://controversy-cards-assets.s3.amazonaws.com/';

		this.card = {
			id: id,
			metadata: {
				name: null,
				summary: null,
				graphicType: null,
				icon: null
			},
			graphics: [],
			pyramidUrl: this.pyramidUrlBase + id + '/pyramid_files/',
			assetsUrl: this.assetsUrlBase + id + '/assets/',
			iconUrl: this.assetsUrlBase + id + '/icon/'
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
		this.card.metadata.graphicType = data['graphic']['type'];
		this.card.metadata.icon = data['graphic']['icon'];
		this.card.graphics = data['graphic']['overlays']['assets'];
	}

	getAllCardData() {
		return new Promise((resolve, reject) => {
			let cardRequest = new Request(this.apiUrlBase + this.card.id);

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
