import UsergridClient from '../../node_modules/usergrid/lib/client';

// TODO: Create helper methods to retrieve metacards collection, so that
// card uuid's can be selected from there.
class UsergridHelper {
	constructor() {
		this.req = {
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

		// Halton Arp card
		this.cardID = '5dd8d904-f6d8-11e6-9a38-0ad881f403bf';
	}

	init() {
		this.client = new UsergridClient({
		    orgId: 'controversies-of-science',
		    appId: 'sandbox',
			baseUrl: 'https://apibaas-trial.apigee.net'
		});
	}

	getCardData() {
		this.client.GET(this.req.endpoint.card.plural, this.cardId,
			(error, usergridResponse, entity) => {

			console.log('Usergrid Response:');
			console.log(usergridResponse);

			if (error) {
				console.log('Usergrid Error on getEntity ...')
				console.log(error);
			} else { 
				console.log('Backend GET returned:')
				console.log(entity);

				// resolve(result['_data']);
			} 
		});
	}
}

export default UsergridHelper;