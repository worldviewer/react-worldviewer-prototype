// Code comes from https://github.com/sambernard/react-preload
// Code has been modified to retrieve assets via Usergrid. To do so,
// ImageHelper and ImageCache have been refactored into classes.

import { PropTypes, Component } from 'react';
import ImageHelper from './ImageHelper';
import Backend from '../Backend/Backend';

const propTypes = {
    // Rendered on success
    children: PropTypes.element.isRequired,

    // Rendered during load
    loadingIndicator: PropTypes.node.isRequired,

    // Controversy card ID
    cardId: PropTypes.string.isRequired,

    // If set, the preloader will automatically show
    // the children content after this amount of time
    autoResolveDelay: PropTypes.number,

    // Error callback. Is passed the error
    onError: PropTypes.func,

    // Success callback
    onSuccess: PropTypes.func,

    // Whether or not we should still show the content
    // even if there is a preloading error
    resolveOnError: PropTypes.bool,

    // Whether or not we should mount the child content after
    // images have finished loading (or after autoResolveDelay)
    mountChildren: PropTypes.bool,
};

const defaultProps = {
    resolveOnError: true,
    mountChildren: true,
    loadingIndicator: null,
};

class Preload extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	ready: false,
        	card: null,
        	urls: []
        };

        this._handleSuccess = this._handleSuccess.bind(this);
        this._handleError = this._handleError.bind(this);
        this._mounted = false;

        this.imageHelper = new ImageHelper();
    }

    componentWillMount() {
        if (!this.props.images || this.props.images.length === 0) {
            this._handleSuccess();
        }
    }

    componentDidMount() {
        this._mounted = true;

		this.backend = new Backend();

        if (!this.state.ready) {
			this.backend.getAllCardData()
				.then(() => {
					let card = this.backend.getCardData();

					let urls = card.graphics.map(graphic =>
						this.backend.getAssetsUrlBase() + graphic['source']);

                    let icon = card.icon;

					this.setState({
						card,
						urls,
                        icon
					});

					this.props.setSlideHandler(card.graphics, icon);

					this.imageHelper.loadImages(urls)
		            	.then(this._handleSuccess, this._handleError);
				});

            if (this.props.autoResolveDelay && this.props.autoResolveDelay > 0) {
                this.autoResolveTimeout = setTimeout(this._handleSuccess, this.props.autoResolveDelay);
            }
        }
    }

    componentWillUnmount() {
        this._mounted = false;
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
        }
    }

    _handleSuccess() {
        if (this.autoResolveTimeout) {
            clearTimeout(this.autoResolveTimeout);
            console.warn('images failed to preload, auto resolving');
        }

        if (this.state.ready || !this._mounted) {
            return;
        }

        this.setState({
            ready: true,
        });

        if (this.props.onSuccess) {
            this.props.onSuccess();
        }
    }

    _handleError(err) {

        if(!this._mounted) {
            return;
        }

        if (this.props.resolveOnError) {
            this._handleSuccess();
        }

        if (this.props.onError) {
            this.props.onError(err);
        }
    }

    render() {
        return (this.state.ready && this.props.mountChildren ? this.props.children : this.props.loadingIndicator);
    }
}

Preload.propTypes = propTypes;
Preload.defaultProps = defaultProps;

export default Preload;
