import React from 'react';
import './FeedCard.scss';
import share from '../../public/share.svg';

const FeedCardStateless = React.createClass({
	render: function() {
		return (
			<div className="feedcard">
				<div className="image">
					<div className="share-container">
						<img className="share" alt="share" src={share} />
					</div>
				</div>

				<div className="title">Were dark matter filaments "predicted"?</div>

				<div className="breadcrumbs">The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

				<div className="ratings"></div>

				<div className="author">
					<div className="avatar"></div>
					<div className="info">
						<div className="name"></div>
						<div className="role"></div>
					</div>
				</div>

				<div className="expand-content"></div>
			</div>
		);
	}
});

export default FeedCardStateless;
