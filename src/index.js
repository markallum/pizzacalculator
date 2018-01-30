

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class NumberInput extends React.Component {

	constructor(props) {
		super(props);



		//this.state = {inputValue: 0};
	}


	

	

	render() {
		return ( 	
			<div>
				<div className="calculator-input-box">

					<input type="number" class="calculator-txtbox number-box"
					data-type={this.props.type} min="0" onChange={(e) => this.props.onChange(e, this.props.type)} value={this.props.inputValue} step={this.props.step} />
				</div>
				
				<div class="calculator-button-box">
					<input type="button" class="calculator-number-button-add" value="+" onClick={() => this.props.changeValue(1, this.props.type)}  />
					<input type="button" class="calculator-number-button-subtract" value="-" onClick={() => this.props.changeValue(-1, this.props.type)} />
				</div>
			</div>
		);
	}
}





class InputGroup extends React.Component {

	

	render() {



		return ( 
			<div class="calculator-wrapper cf">
					<div class="calculator-cell">
						<div class="calculator-input-wrapper cf">
							<div class="calculator-header">
								Price
							</div>
							
							<div>
								<NumberInput
								type="price"
								step="0.01"
								changeValue={this.props.changeValue.bind(this)}
								onChange={this.props.handleChange.bind(this)}
								inputValue={this.props.priceValue}
								 />
								
								
							</div>

						</div>
					</div>

					<div class="calculator-cell">
						
						
						<div class="calculator-input-wrapper cf">
						<div class="calculator-header">
							Quantity
						</div>

							<div>
								<NumberInput
								type="quantity"
								step="1"
								changeValue={this.props.changeValue.bind(this)}
								onChange={this.props.handleChange.bind(this)}
								inputValue={this.props.quantityValue}
								 />
							</div>

						</div>
					</div>

					<div class="calculator-cell">
						
						
						<div class="calculator-input-wrapper cf">

							<div class="calculator-header">
								Size <div class="calculator-subheader">(inches)</div>
							</div>
							
							<div>
								<NumberInput
								type="size"
								step="0.1"
								changeValue={this.props.changeValue.bind(this)}
								onChange={this.props.handleChange.bind(this)}
								inputValue={this.props.sizeValue}
								 />
							</div>

						</div>
					</div>

				</div>
		);
	}
}

class Calculator extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			priceValue: 0,
			quantityValue: 0,
			sizeValue: 0,
			inchesAllPizza: 0,
			pricePerInch: 0,
		};

		
	}

	calculateResults() {
		let resultRadiusPerPizza = this.state.sizeValue / 2;
		let resultAreaPerPizza = (resultRadiusPerPizza * resultRadiusPerPizza) * Math.PI;


		let resultAreaAllPizza = resultAreaPerPizza * this.state.quantityValue;
		let resultPricePerInch = this.state.priceValue / resultAreaAllPizza;

		this.setState({
			inchesAllPizza:resultAreaAllPizza.toFixed(0),
			pricePerInch:resultPricePerInch.toFixed(2)
		});
	}

	changeValue(amount, type) {
		let stateKey = `${type}Value`;

		let oldValue = parseFloat(this.state[stateKey]);
		let newValue = oldValue + amount;

		if (newValue < 0) {
			newValue = 0;
		}
		this.setState({[stateKey]: newValue.toFixed(2)});

	}

	handleChange(e, type) {
		let stateKey = `${type}Value`;
		let newValue = parseFloat(e.target.value);
		if (newValue < 0) {
			newValue= 0;
		}
		this.setState({[stateKey]: newValue});

	}

	

	render() {
		return (
			<div>
				

				<div>
					<InputGroup
					changeValue={this.changeValue.bind(this)}
					handleChange={this.handleChange.bind(this)}
					priceValue={this.state.priceValue}
					quantityValue={this.state.quantityValue}
					sizeValue={this.state.sizeValue}
					 />
					
				</div>
				

				<div class="results-row">
					<span class="results-section"><b>{this.state.inchesAllPizza}</b> in<sup>2</sup> of pizza</span>
					<b>{this.state.pricePerInch}</b> per in<sup>2</sup>
				</div>

				<div class="line-spacer"></div>

				<div class="cf">
					<div class="left">
						<input type="button" value="Calculate" class="standard-button" onClick={() => this.calculateResults()} />
					</div>
					<div class="right">
						<input type="button" value="Add new set" class="standard-button" />
					</div>
				</div>
	
			</div>
		);
	}
}


class Page extends React.Component {
	render() {
		return (
			<div class="page-wrapper">
				<div class="title-wrapper">
					<h1>pizzacalculator</h1>
				</div>
				<div class="content-wrapper">
					<h2>Pizza should be easy</h2>
					<p>Calculate how much pizza you are getting for your money and compare deals, because math is hard.</p>

					<div class="line-spacer"></div>

					<Calculator />

				</div>
				<div class="footer-wrapper">
					<p>Pizzacalculator was created by Mark Allum, a web developer with a passion for the web and good value pizza. You can find out more about my projects and my work here.</p>
				</div>
			</div>


		);
	}
}


ReactDOM.render(
	<Page />,
	document.getElementById('root')
);