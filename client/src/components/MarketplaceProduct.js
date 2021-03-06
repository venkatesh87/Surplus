import React, { Component } from "react";
import PropTypes from 'prop-types';
import * as f from '../constants/functions';
// import { Pagination } from 'react-materialize';

// Presentational Component
const MarketplaceProduct = ({
	product,
	onAddToCart,
	isSelected
}) => {
	return (
		<div id={product._id} className={`item-container ${product.quantity < 1 && 'sold-out'}`}>
			<a href={`products/${product._id}`}>
				<div className="row img-holder">
					<img className="product-img" src={product.img_cloud ||
					"https://storage.googleapis.com/surplus-6507a.appspot.com/assets/placeholder.png"}
						alt={product.title} />
				</div>
				<div className="product-title">{product.title}</div>
				<div className="product-price">
					{
						product.old_price > 0 ?
						(<SalePrice price={product.price} discount={product.old_price} />) : 
						(
							<span className="nodiscount-price">
								${product.price ? f.formatMoney(product.price,2,'.',',') : null}
							</span>
						) 
					
					}
				</div>
				<div className={`rating stars-4-5`}></div>
			</a>
			<button
				disabled={product.quantity < 1 || isSelected}
				className={`btn green add-to-cart-btn`}
				onClick={() => onAddToCart()}
			>
				Add to Cart
			</button>
			{ isSelected && 
				<i className="fas fa-check-circle fa-3x in-cart"></i>
			}
		</div>
	)
};

const SalePrice = ({ 
	price, 
	discount 
}) => (
	<div>
	<span className="current-price">
		Sale ${price ? f.formatMoney(price,2,'.',',') : null}
	</span>
	{"  "}
	<span className="old-price">
		${f.formatMoney((price + discount),2,'.',',')}
	</span>
	</div>
);

class MarketplaceProductContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelected: false,
		}
	}
	componentDidMount() {
		const { store } = this.context;
		this.unsubscribe = store.subscribe(() =>
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const { store } = this.context;
		// const state = store.getState();

		return(
			<MarketplaceProduct
				product={props.product}
				onAddToCart={() => {
					store.dispatch({
	            type: 'ADD_TO_CART',
	            product: props.product,
							qty: 1
					});
					localStorage.setItem('cart',JSON.stringify(store.getState()));
					this.setState({ isSelected: true });
				}}
				isSelected={this.state.isSelected}
			/>
		);
	};
};
MarketplaceProductContainer.contextTypes = {
  store: PropTypes.object
};

// Presentational Component
const ProductsList = ({
	products
}) => (
  <div>
    <div className="row productslist">
			{!products
				? <i className="fas fa-spinner fa-spin fa-5x"></i>
				: products.length
					? products.map(product =>
						<MarketplaceProductContainer
							key={product._id}
							product={product}
						/>)
					: `We are currently adding more products. Check back later!`
			}
    </div>
		{/*<Pagination items={5} activePage={1} maxButtons={5} />*/}
  </div>
);

export default MarketplaceProduct;

export {
	ProductsList,
}
