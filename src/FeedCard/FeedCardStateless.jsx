import React from 'react';
import './FeedCard.scss';
import share from '../../public/share.svg';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import chris from '../../public/chris.jpg';
import 'font-awesome-sass-loader';

// Permits HTML markup encoding in feed text
import { Parser as HtmlToReactParser } from 'html-to-react';

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

	componentDidMount: function() {
		// this.info.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });

		// this.content.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });

		// this.author.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });

		// this.title.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });

		// this.breadcrumbs.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });

		// this.ratings.addEventListener('touchmove', function(e) {
		// 	e.preventDefault();
		// });
	},

	render: function() {
		const
			h = new HtmlToReactParser(),

			chipStyles = {
				chip: {
					margin: 4,
					fontFamily: ['Lato', 'Helvetica']
				},
				wrapper: {
					display: 'flex',
					flexWrap: 'wrap'
				},
			},

			// cardStyles = this.state.isTextExpanded ?
			// 	{ overflowY: 'auto' } :
			// 	{ overflow: 'hidden' },

			imageStyles = this.state.isTextExpanded ?
				{ height: 0 } :
				{},

			outerShareStyles = this.state.isTextExpanded ?
				{
					width: 0,
				 	height: 0,
				 	opacity: 0,
				 	margin: '18px' } :
				{
					margin: 0,
					opacity: 0.6
				},

			innerShareStyles = this.state.isTextExpanded ?
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

				<div className="info" onClick={this.handleClick} ref={node => this.info = node}>

					<div className="chevron-outer-circle">
						<div className="chevron-inner-circle">
							<i className="chevron fa fa-chevron-up" aria-hidden="true"></i>
						</div>
					</div>

					<div className="title" ref={node => this.title = node}>Were dark matter filaments "predicted"?</div>

					<div className="breadcrumbs" ref={node => this.breadcrumbs = node}>The History of the Birkeland Current > Clash of Worldviews > Noteworthy Online Discussions</div>

					<div className="ratings" ref={node => this.ratings = node}>
						<div style={chipStyles.wrapper}>
							<Chip style={chipStyles.chip}>
								<Avatar size={32}>9</Avatar>
								Testing
							</Chip>
						</div>
					</div>

					<div className="author" ref={node => this.author = node}>
						<div className="avatar">
							<Avatar src={chris} />
						</div>
						<div className="author-info">
							<div className="name">Chris Reeve</div>
							<div className="role">Master of Controversies</div>
						</div>
					</div>

					<div className="content" ref={node => this.content = node}>{h.parse('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus tellus dui, sit amet fermentum justo venenatis ut. Cras lacinia nisl bibendum, vehicula mauris sed, mollis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}</div>
				</div>
			</div>
		);
	}
});

export default FeedCardStateless;
