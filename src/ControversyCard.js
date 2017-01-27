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
				<p className="Summary">He Was a Professional Astronomer Who<br/>Began his Career as Edwin Hubble's Assistant / While Compiling a List of Peculiar Galaxies, Arp Discovered that High-Redshift Quasars are Commonly Associated with or Even Connected by Filaments to Lower-Redshift Galaxies / Since the Big Bang Requires that Differences in Redshift Place the Objects at Different Locations, Astronomers Commonly Reject Arp's Claims / But if he is Right, then there Was No Big Bang</p>
			</div>
		);
	}
}

export default ControversyCard;
