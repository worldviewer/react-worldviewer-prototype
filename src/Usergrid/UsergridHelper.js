import UsergridClient from '../../node_modules/usergrid/lib/client';

// TODO: Create helper methods to retrieve metacards collection, so that
// card uuid's can be selected from there.
class UsergridHelper {
	constructor(uuid) {
		this.req = {
			orgId: 'controversies-of-science',
			appId: 'sandbox',
			baseUrl: 'https://apibaas-trial.apigee.net',
			endpoint: {
				metacard: {
					'singular': 'mcard',
					'plural': 'mcards'
				},
				card: {
					'singular': 'card',
					'plural': 'cards'
				}
			}
		}

		if (uuid) {
			this.card = {
				id: uuid,
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
	}

	init() {
		this.client = new UsergridClient({
		    orgId: this.req.orgId,
		    appId: this.req.appId,
			baseUrl: this.req.baseUrl
		});
	}

	downloadAsset(folder, uuid) {
		console.log('folder:')
		console.log(folder);

		console.log('uuid:');
		console.log(uuid);

	    // access the asset via entityWithAsset.asset 
		return new Promise((resolve, reject) => {
			this.client.GET(folder, uuid,
				(error, usergridResponse, entity) => {

				entity.downloadAsset(this.client, function(error, assetResponse, entityWithAsset) {
					console.log('assetResponse:');
					console.log(assetResponse);

				    if (error) { 
				        console.log('Error converting asset to image ...');
				        console.log(error);

				        reject();
				    } else { 
				    	resolve(entityWithAsset.asset);
				    } 
				});
			})
		})
	}

	getCardData() {
		return this.card;
	}

	getGraphicsFolderUrl() {
		return this.req.baseUrl + '/' +
			this.req.orgId + '/' +
			this.req.appId + '/' +
			this.card.metadata.graphicsFolderName + '/';
	}

	saveMetaData(data) {
		this.card.metadata.name = data['name'];
		this.card.metadata.summary = data['summary'];
		this.card.metadata.graphicType = data['graphicType'];
		this.card.metadata.graphicsFolderUUID =
			data['metadata']['connections']['embeds'];
		this.card.graphics = data['bubbles'];
	}

	saveFolderName(data) {
		this.card.metadata.graphicsFolderName = data;
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

    // There appears to be something very wrong with Usergrid's
    // client.getConnections() method.  That might have been a better option
    // for going from controversy card id to the list of controversy card
    // graphics.  Instead, what we have here is a series of 3 asynchronous
    // requests.
	getAllCardData() {
		return new Promise((resolve, reject) => {
			this.client.GET(this.req.endpoint.card.plural, this.card.id,
				(error, usergridResponse, entity) => {

				if (error) {
					console.log('Usergrid Error on retrieval of controversy card.')
					console.log(error);
				} else { 
					console.log('Controversy Card from Usergrid:')
					console.log(entity);

					this.saveMetaData(entity);

					this.client.GET(this.card.metadata.graphicsFolderUUID,
						(error, usergridResponse, entity) => {

						if (error) {
							console.log('Usergrid Error on retrieval of graphics folder name.')
							console.log(error);
						} else {
							this.saveFolderName(entity['name']);

							// Note that entities returns only first item (BUG?), so to get
							// all images in collection, use usergridResponse.entities
							this.client.GET(this.card.metadata.graphicsFolderName,
								(error, usergridResponse, entities) => {

								if (error) {
									console.log('Usergrid Error on retrieval of graphics folder.')
									console.log(error);
								} else {
									this.saveGraphics(usergridResponse);

									console.log('Saved into this.card:');
									console.log(this.card);

									resolve();
								} 
							});						
						} 
					});
				} 
			});
		});
	}
}

export default UsergridHelper;
