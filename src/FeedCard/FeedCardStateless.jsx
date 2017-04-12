import React from 'react';
import './FeedCard.scss';
import share from '../../public/share.svg';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const FeedCardStateless = React.createClass({
	render: function() {
		const chipStyles = {
			chip: {
				margin: 4
			},
			wrapper: {
				display: 'flex',
				flexWrap: 'wrap'
			},
		};

		return (
			<div className="feedcard">
				<div className="image">
					<div className="share-container">
						<img className="share" alt="share" src={share} />
					</div>
				</div>

				<div className="title">Were dark matter filaments "predicted"?</div>

				<div className="breadcrumbs">The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

				<div className="ratings">
					<Chip style={chipStyles}>
						<Avatar size={32}>9</Avatar>
						Testing
					</Chip>
				</div>

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
