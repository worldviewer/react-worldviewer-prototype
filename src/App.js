import React from 'react';
import './App.scss';
import ControversyCard from './ControversyCard';
import mobiscroll from './mobiscroll.custom-3.0.1.min';
import './mobiscroll.custom-3.0.1.min.css';

var App = React.createClass({
	prev: function() {
		this.refs.menustrip.instance.prev();
	},
	next: function(event, inst) {
		this.refs.menustrip.instance.next();
	},
	render: function() {
		return (
			<div className="App">
				<div className="md-prevnext">
					<div className="md-apps-ul">

						<mobiscroll.Menustrip
							theme="mobiscroll"
							display="top"
							ref="menustrip"
							type="tabs"
							onItemTap={	() => { console.log('tap'); }}
	                    >
	                        <li data-tab="tab-ngc4319" data-selected="true">1: NGC4319</li>
	                        <li data-tab="tab-ngc7603">2: NGC7603</li>
	                        <li data-tab="tab-stephansquintet">3: Stephans Quintet</li>
	                        <li data-tab="tab-arp41">4: Arp41</li>
	                        <li data-tab="tab-ngc7319-quasar">5: NGC7319 Quasar</li>
	                        <li data-tab="tab-lensing-claims">6: Lensing Claims</li>
	                        <li data-tab="tab-fingers-of-god">7: Fingers of God</li>
	                        <li data-tab="tab-quasar-ejection-model">8: Quasar Ejection Model</li>
	                        <li data-tab="tab-arp-quote">Arp Quote</li>
						</mobiscroll.Menustrip>

						<ControversyCard bubbles={8} />
						<div 
							onClick={this.prev}
							className="md-prev md-np mbsc-ic mbsc-ic-arrow-left5">
						</div>
	                    <div
	                    	onClick={this.next}
	                    	className="md-next md-np md-n mbsc-ic mbsc-ic-arrow-right5">
                    	</div>
	                </div>
				</div>
			</div>
		);
	}
});

export default App;
