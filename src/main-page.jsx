import React, { Component } from 'react';
import { Collection, CollectionItem, Pagination, Button, Icon } from 'react-materialize';
import axios from 'axios';

import './css/main.css'

import ProductList from './product-list';

export default class MainPage extends Component {
	constructor(props) {
		super(props);
	}

    render() {
        return (
			<div className="row" style={{ marginBottom: '0px' }}>

				<div style={{ paddingTop: '15px', height: '100%', backgroundColor: '#90a4ae' }} className="col s3">
					<Button style={{ width:'100%' }} waves='light'>{'Create'}</Button>
					<ProductList />
				</div>

				<div style={{ height: '100%', backgroundColor: '#26a69a' }} className="col s9">
					<div className="container">
						<h1>{'Title here'}</h1>
					</div>
				</div>

			</div>
		);
    }

}
