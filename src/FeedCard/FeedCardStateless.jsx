import React from 'react';
import './FeedCard.scss';
import share from '../../public/share.svg';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import chris from '../../public/chris.jpg';

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

			cardStyles = this.state.isTextExpanded ?
				{ overflowY: 'auto' } :
				{ overflow: 'hidden' },

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
			<div className="feedcard" style={cardStyles}>
				<div className="image" style={imageStyles}>
					<div className="share-outer-circle" style={outerShareStyles}>
						<div className="share-inner-circle" style={innerShareStyles}>
							<img className="share" alt="share" src={share} style={innerShareStyles} />
						</div>
					</div>
				</div>

				<div className="info" onClick={this.handleClick}>
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

					<div className="content">{h.parse('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus tellus dui, sit amet fermentum justo venenatis ut. Cras lacinia nisl bibendum, vehicula mauris sed, mollis nisl. Donec vitae neque non ligula cursus euismod. Duis placerat rhoncus est, sit amet rhoncus mi scelerisque eu. Nullam malesuada diam metus, vel semper lacus venenatis sed. Praesent aliquam quam sed magna lacinia congue. Sed ut dolor id nulla ornare semper ut nec tellus. Etiam nisi odio, blandit vel ornare in, viverra vitae magna. Mauris facilisis, erat et consequat dictum, libero odio pellentesque leo, eget sagittis sapien purus eu est. Sed et mollis ex, eu porta mauris. Integer felis magna, fermentum vel turpis nec, consectetur consectetur leo. Vestibulum imperdiet velit libero, vel aliquam magna lobortis non. Sed porta, metus at tincidunt consectetur, sapien ligula posuere eros, sit amet porta libero nisi varius elit. Proin fringilla, leo pulvinar imperdiet commodo, ligula leo lacinia diam, non pharetra enim urna ut est.\u003c\u0062\u0072\u003e\u003c\u0062\u0072\u003eVivamus rhoncus tellus justo, et lobortis velit interdum vel. Quisque sodales diam a ipsum faucibus, ut tristique libero vestibulum. Donec imperdiet neque risus, eu auctor urna ultricies in. Nullam enim urna, volutpat id dapibus id, consectetur a nulla. Aliquam sit amet metus rutrum, congue risus ut, vestibulum erat. Sed tincidunt in sapien aliquet faucibus. Phasellus maximus, nibh sit amet interdum laoreet, purus magna sagittis leo, ac luctus massa ex commodo dui. Maecenas at feugiat leo. Praesent laoreet risus risus.\u003c\u0062\u0072\u003e\u003c\u0062\u0072\u003eQuisque ultricies venenatis ultrices. Vestibulum ut interdum ipsum, vulputate condimentum nibh. Nam sagittis ornare quam sed rutrum. Fusce eu dui non orci venenatis suscipit quis vitae mi. Praesent aliquet lorem mi, sit amet faucibus libero condimentum viverra. Nam ornare sodales est. Curabitur facilisis lorem dolor, quis vehicula nunc auctor ac. Sed egestas dui quis libero tincidunt auctor. Praesent faucibus feugiat ante at hendrerit. Suspendisse sollicitudin, quam egestas eleifend efficitur, velit arcu fermentum orci, id ultrices quam justo id justo. Proin nec orci congue, lobortis sapien at, cursus erat. Nam eu elit vulputate, gravida ligula at, auctor lectus. Vivamus ac erat vitae diam euismod vestibulum.')}</div>
				</div>
			</div>
		);
	}
});

export default FeedCardStateless;
