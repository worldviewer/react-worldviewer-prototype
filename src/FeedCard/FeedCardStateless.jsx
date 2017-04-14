import React from 'react';
import './FeedCard.scss';
import share from '../../public/share.svg';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import chris from '../../public/chris.jpg';

const FeedCardStateless = React.createClass({
	getInitialState: function() {
		return {
			isTextExpanded: false
		}
	},

	handleClick: function() {
		this.setState({
			isTextExpanded: !this.state.isTextExpanded
		});
	},

	render: function() {
		const chipStyles = {
			chip: {
				margin: 4,
				fontFamily: ['Lato', 'Helvetica']
			},
			wrapper: {
				display: 'flex',
				flexWrap: 'wrap'
			},
		};

		const infoStyles = this.state.isTextExpanded ?
			{ overflowY: 'auto' } :
			{ overflow: 'hidden' };

		const imageStyles = this.state.isTextExpanded ?
			{ height: 0 } :
			{};

		const outerShareStyles = this.state.isTextExpanded ?
			{
				width: 0,
			 	height: 0,
			 	opacity: 0,
			 	margin: '18px' } :
			{
				margin: 0,
				opacity: 0.6
			};

		const innerShareStyles = this.state.isTextExpanded ?
			{
				width: 0,
			 	height: 0,
			 	opacity: 0 } :
			{
				margin: 0,
				opacity: 1
			};

		return (
			<div className="feedcard">
				<div className="image" style={imageStyles}>
					<div className="share-outer-circle" style={outerShareStyles}>
						<div className="share-inner-circle" style={innerShareStyles}>
							<img className="share" alt="share" src={share} style={innerShareStyles} />
						</div>
					</div>
				</div>

				<div className="info" style={infoStyles} onClick={this.handleClick}>
					<div className="title">Were dark matter filaments "predicted"?</div>

					<div className="breadcrumbs">The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

					<div className="ratings">
						<div style={chipStyles.wrapper}>
							<Chip style={chipStyles.chip}>
								<Avatar size={32}>9</Avatar>
								Testing
							</Chip>
						</div>
					</div>

					<div className="author">
						<div className="avatar">
							<Avatar src={chris} />
						</div>
						<div className="author-info">
							<div className="name">Chris Reeve</div>
							<div className="role">Master of Controversies</div>
						</div>
					</div>

					<div className="expand-content"></div>
				</div>
			</div>
		);
	}
});

export default FeedCardStateless;
