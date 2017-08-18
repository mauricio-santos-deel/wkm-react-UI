import React, { Component } from 'react';
import { Collection, CollectionItem, Pagination } from 'react-materialize';
import axios from 'axios';

export default class ProductList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			currentPage: 1,
			totalPages: 0
		};

		this.onPaginationSelect = this.onPaginationSelect.bind(this);
	}

	componentDidMount() {
		axios.get('/product-service/products?size=10&page=' + (this.state.currentPage - 1))
		.then(res => {
			console.log(res);
			this.setState({ products: res.data._embedded.products, totalPages: res.data.page.totalPages });
		});
	}

	onPaginationSelect(currentPage) {
		const self = this;

		axios.get('/product-service/products?size=10&page='+ (currentPage - 1))
		.then(res => {
			self.setState({ products: res.data._embedded.products, currentPage: currentPage });
		});
	}

    render() {
        return (
			<div className="row" style={{ marginBottom: '0px' }}>
				<Collection>
					{
						this.state.products.map((item, i) => {
							return <CollectionItem key={i}>{item.name}</CollectionItem>;
						})
					}
				</Collection>
				<Pagination 
					className='centerText'
					items={this.state.totalPages} 
					activePage={this.state.currentPage} 
					maxButtons={4} 
					onSelect={this.onPaginationSelect}
					active={false} />
			</div>
		);
    }

}
