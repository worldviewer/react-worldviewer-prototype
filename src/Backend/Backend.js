// TODO: Create helper methods to retrieve metacards collection, so that
// card uuid's can be selected from there.
class Backend {
	constructor(uuid) {
		this.url = 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/';

		this.card = {
			id: uuid || "58b8f1f7b2ef4ddae2fb8b17",
			metadata: {
				name: null,
				summary: null,
				graphicsFolderName: null,
				graphicsFolderUUID: null,
				graphicType: null
			},
			UUIDHash: {},
			graphics: []
		};
	}

	downloadAsset(folder, uuid) {

	}

	getCardData() {
		return this.card;
	}

	saveMetaData(data) {
		this.card.metadata.name = data['name'];
		this.card.metadata.summary = data['summary'];
		this.card.metadata.graphicType = data['graphicType'];
		this.card.metadata.graphicsFolderUUID =
			data['metadata']['connections']['embeds'];
		this.card.graphics = data['bubbles'];
	}

	saveGraphics(data) {
		let base = this.getGraphicsFolderUrl(),
			hash = {};

		// Use hash to reliably link filename to Usergrid asset uuid
		for (var i=0; i<data.entities.length; i++) {
			hash[data.entities[i]['name']] = data.entities[i]['uuid'];
		}

		for (i=0; i<this.card.graphics.length; i++) {
			this.card.graphics[i]['uuid'] = base + hash[this.card.graphics[i]['source']];
		}
	}

	getAllCardData() {
		return new Promise((resolve, reject) => {
			let cardRequest = new Request(this.url + this.card.id);

			fetch(cardRequest)
				.then(response => response.json())
				.then(json => {
					saveMetaData(json['body']);
				})
		});
	}
}

export default Backend;
