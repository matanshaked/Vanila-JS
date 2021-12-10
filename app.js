import { RecommendationsTypesOptiones, sponsoredURL } from './js/config.js';
import { RecommendationsTypes } from './js/consts.js';
import { organicResponse } from './mockData/organicResponse.js';
import Organic  from './js/widgets/Organic.js'; 
import Sponsored  from './js/widgets/Sponsored.js';


createRecommendation();


function createRecommendation () {
	const main = document.getElementById('main');

	for (const option of RecommendationsTypesOptiones) {
		if (option === RecommendationsTypes.SPONSORED) {
			getSponsoredRecommendations(sponsoredURL).then(res => {
				if (res && res.length > 0) {
					const sponsored = new Sponsored();
					sponsored.createSponsored(RecommendationsTypes.SPONSORED, res).then(sponsoredNode => {
						sponsoredNode && main.appendChild(sponsoredNode);
						main.appendChild(document.createElement('br'));
					});
				}
			});
		}

		if (option === RecommendationsTypes.ORGANIC) {
			const res = getOrganicRecommendations(organicResponse);
			if (res && res.length > 0) {
				const organic = new Organic();
				const organicNode = organic.createOrganic(RecommendationsTypes.ORGANIC, res);
				organicNode && main.appendChild(organicNode);
				main.appendChild(document.createElement('br'));
			}
		}
	}
}

async function getSponsoredRecommendations (URL)  {
	try {
		const api = URL;

		const res = await fetch(api).then(response => { return response.json(); });
		return res && res.list;
	}
	catch (err) {
		// log the err;
	}
}

function getOrganicRecommendations (res) {
	return res && res.list;
}




