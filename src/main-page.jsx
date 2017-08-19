import React, { Component } from 'react';
import { Button } from 'react-materialize';
import axios from 'axios';

import './css/main.css';

import ProductList from './product-list';
import NewProduct from './new-product';
import { app } from './app';

export default class MainPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: null
		};

		this.showCreateForm = this.showCreateForm.bind(this);
		this.productCreatedListener = this.productCreatedListener.bind(this);
	}

	componentDidMount() {
		app.add(this.productCreatedListener);
	}

	componentWillUnmount() {
		app.remove(this.productCreatedListener);
	}

	showCreateForm() {
		this.setState({
			content: <NewProduct />
		});
	}

	productCreatedListener(action) {
		if (action !== 'PRODUCT_CREATED') {
			return;
		}

		this.setState({
			content: null
		});
	}

    render() {
        return (
			<div className="row" style={{ marginBottom: '0px' }}>

				<div style={{ paddingTop: '15px', height: '100%', backgroundColor: '#90a4ae' }} className="col s3">
					<ProductList />
					<Button onClick={this.showCreateForm} style={{ width: '100%' }} waves="light">{'Create'}</Button>
				</div>

				<div style={{ height: '100%', backgroundColor: 'rgb(241, 241, 241)' }} className="col s9">
					{this.state.content}
				</div>

			</div>
		);
    }

}
