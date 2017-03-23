// TODO: Create helper methods to retrieve metacards collection, so that
// card id's can be selected from there.
class StatelessBackend {
	constructor(id = '58b8f1f7b2ef4ddae2fb8b17') {
		this.base = {
			api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
			background: 'https://controversy-cards-assets.s3.amazonaws.com/',
			overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
		};

		this.card = {
			id: id,
			metadata: {
				name: null,
				summary: null,
				type: null,
				icon: null
			},
			graphics: [],
			urls: {
				background: this.base.background + id + '/pyramid_files/',
				overlay: this.base.overlay + id + '/assets/',
				icon: this.base.overlay + id + '/icon/'
			}
		};
	}

	getBackgroundUrl() {
		return this.card.urls.background;
	}

	getOverlayBase() {
		return this.card.urls.overlay;
	}

	getCardData() {
		return this.card;
	}

	getIconBase() {
		return this.card.urls.icon;
	}

	saveMetaData(data) {
		this.card.metadata.name = data['name'];
		this.card.metadata.summary = data['summary'];
		this.card.metadata.type = data['graphic']['type'];
		this.card.metadata.icon = data['graphic']['icon'];
		this.card.graphics = data['graphic']['overlays']['assets'];
	}

	getAllCardData() {
		return new Promise((resolve, reject) => {
			let cardRequest = new Request(this.base.api + this.card.id);

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

export default StatelessBackend;
