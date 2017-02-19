import Usergrid from 'usergrid';

class UsergridHelper {
	constructor() {
		this.endpoint = {
			metacard: {
				'singular': 'mcard',
				'plural': 'mcards'
			},
			card: {
				'singular': 'card',
				'plural': 'cards'
			}
		};
	}

	init() {
		Usergrid.init({
		    orgId: 'controversies-of-science',
		    appId: 'sandbox',
			URI: 'https://apibaas-trial.apigee.net'
		});
	}	
}

export default UsergridHelper;