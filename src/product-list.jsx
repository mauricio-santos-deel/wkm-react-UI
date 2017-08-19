import React, { Component } from 'react';
import { Col, Preloader, Collection, CollectionItem, Pagination } from 'react-materialize';
import axios from 'axios';

import { app } from './app';

export default class ProductList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			currentPage: 1,
			totalPages: 0,
			fetching: true
		};

		this.onPaginationSelect = this.onPaginationSelect.bind(this);
		this.productCreatedListener = this.productCreatedListener.bind(this);
	}

	componentDidMount() {
		app.add(this.productCreatedListener);

		axios.get('/product-service/products?size=10&page=' + (this.state.currentPage - 1))
		.then(res => {
			console.log(res);
			this.setState({
				products: res.data._embedded.products,
				totalPages: res.data.page.totalPages,
				fetching: false
			});
		});
	}

	componentWillUnmount() {
		app.remove(this.productCreatedListener);
	}

	productCreatedListener(action) {
		if (action !== 'PRODUCT_CREATED') {
			return;
		}

		this.setState({
			fetching: true
		});

		axios.get('/product-service/products?size=10&page=' + (this.state.totalPages - 1))
		.then(res => {
			this.setState({
				products: res.data._embedded.products,
				totalPages: res.data.page.totalPages,
				fetching: false,
				currentPage: res.data.page.totalPages
			});
		});
	}

	onPaginationSelect(currentPage) {
		const self = this;

		self.setState({
			fetching: true
		});

		axios.get('/product-service/products?size=10&page=' + (currentPage - 1))
		.then(res => {
			self.setState({
				products: res.data._embedded.products,
				currentPage: currentPage,
				fetching: false
			});
		});
	}

    render() {

		if (this.state.fetching) {
			return (
				<Col s={12}>
					<Preloader flashing/>
				</Col>);
		}

        return (
			<div className="row" style={{ marginBottom: '0px' }}>
				<Pagination
					className="centerText"
					items={this.state.totalPages}
					activePage={this.state.currentPage}
					maxButtons={4}
					onSelect={this.onPaginationSelect}
					active={false} />
				<Collection>
					{
						this.state.products.map((item, i) => {
							return <CollectionItem key={i}>{item.name}</CollectionItem>;
						})
					}
				</Collection>
			</div>
		);
    }

}
