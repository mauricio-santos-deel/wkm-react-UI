import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize';
import axios from 'axios';
import { app } from './app';

export default class NewProduct extends Component {
	constructor(props) {
		super(props);

		this.state = {
			doc: {}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.save = this.save.bind(this);
	}

	save() {
		axios
			.post('/product-service/products', this.state.doc)
			.then(res => {
				app.dispatch('PRODUCT_CREATED', res.data);
			});
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		const doc = this.state.doc;
		doc[name] = value;

		this.setState({
			doc
		});
	}

    render() {
        return (
			<div>
				<h1>{'New Product'}</h1>
				<Row>
					<Input name="name"
						labelClassName="myLabel"
						onChange={this.handleInputChange}
						s={12}
						label="Name" />
					<Input
						name="description"
						labelClassName="myLabel"
						onChange={this.handleInputChange}
						s={12}
						label="Description" />
					<Button onClick={this.save}>{'Save'}</Button>
				</Row>
			</div>
		);
    }

}
