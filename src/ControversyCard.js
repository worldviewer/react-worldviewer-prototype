import React, { Component } from 'react';
import base from '../graphic/halton-arp-the-modern-galileo-bbal-card.jpg';
import './ControversyCard.scss';

class ControversyCard extends Component {
	render() {
		return (
			<div className="Card">
				<img src={base} className="Base-Layer"
					alt="Controversy Card: Halton Arp, the Modern Galileo" />
				<p className="Title Left">Halton<br/>Arp</p>
				<p className="Title Right">The<br/>Modern<br/>Galileo</p>
			</div>
		);
	}
}

export default ControversyCard;
