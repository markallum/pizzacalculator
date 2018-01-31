

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class NumberInput extends React.Component {


	

	

	render() {
		return ( 	
			<div>
				<div className="calculator-input-box">

					<input type="number" class="calculator-txtbox number-box"
					data-type={this.props.type} min="0" onChange={(e) => this.props.onChange(e, this.props.type, this.props.calcKey)} value={this.props.inputValue} step={this.props.step} />
				</div>
				
				<div class="calculator-button-box">
					<input type="button" class="calculator-number-button-add" value="+" onClick={() => this.props.changeValue(1, this.props.type, this.props.calcKey)}  />
					<input type="button" class="calculator-number-button-subtract" value="-" onClick={() => this.props.changeValue(-1, this.props.type, this.props.calcKey)} />
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
								calcKey={this.props.calcKey}
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
								calcKey={this.props.calcKey}
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
								calcKey={this.props.calcKey}
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

		
	}

	showBestValueSticker() {
		if (this.props.valueMessage == 1) {
			return (
				<div className="best-value-sticker">Best Value</div>
			);
		}
		
	}

	

	

	render() {
		return (
			<div>
				

				<div>
					<InputGroup
					calcKey={this.props.calcKey}
					changeValue={this.props.changeValue.bind(this)}
					handleChange={this.props.handleChange.bind(this)}
					priceValue={this.props.priceValue}
					quantityValue={this.props.quantityValue}
					sizeValue={this.props.sizeValue}
					 />
					
				</div>
				

				<div class="results-row">
					<span class="results-section"><b>{this.props.inchesAllPizza}</b> in<sup>2</sup> of pizza</span>
					£<b>{this.props.pricePerInch}</b> per in<sup>2</sup>
				</div>

				<div>
					{this.props.errorMessage}
				</div>

				<div>
					{this.showBestValueSticker()}
				</div>

				<div class="line-spacer"></div>

				
	
			</div>
		);
	}
}


class Page extends React.Component {


	constructor(props) {
		super(props);

		

		this.state = {
			calculators: []
		};

		//this.createNewCalculator();
		
	}

	changeValue(amount, type, calcKey) {
		let propertyName = `${type}Value`;
		var calculatorCopy = [...this.state.calculators];

		let oldValue = parseFloat(calculatorCopy[calcKey][propertyName]);
		let newValue = oldValue + amount;

		if (newValue < 0) {
			newValue = 0;
		}

		
		calculatorCopy[calcKey][propertyName] = newValue;
		this.setState({calculators:calculatorCopy});

	}

	handleChange(e, type, calcKey) {
		let propertyName = `${type}Value`;
		var calculatorCopy = [...this.state.calculators];

		let newValue = parseFloat(e.target.value);
		if (newValue < 0) {
			newValue= 0;
		}

		calculatorCopy[calcKey][propertyName] = newValue;
		this.setState({calculators:calculatorCopy});

	}

	calculateResults() {
		var calculatorCopy = [...this.state.calculators];
		var bestValueAmount = 0;
		var bestValueKey = 0;

		for (var i = 0, l = calculatorCopy.length; i < l; i++) {
			let resultRadiusPerPizza = calculatorCopy[i].sizeValue / 2;
			let resultAreaPerPizza = (resultRadiusPerPizza * resultRadiusPerPizza) * Math.PI;


			let resultAreaAllPizza = resultAreaPerPizza * calculatorCopy[i].quantityValue;
			let resultPricePerInch = calculatorCopy[i].priceValue / resultAreaAllPizza;

			if (isFinite(resultAreaAllPizza) && isFinite(resultPricePerInch))  {
				calculatorCopy[i].inchesAllPizza = resultAreaAllPizza.toFixed(0);
				calculatorCopy[i].pricePerInch = resultPricePerInch.toFixed(2);
				calculatorCopy[i].errorMessage = "";

				if (calculatorCopy[i].pricePerInch <= bestValueAmount || bestValueAmount == 0) {

					bestValueAmount = calculatorCopy[i].pricePerInch;
					bestValueKey = i;
				}

				this.setState({calculators:calculatorCopy});
			} else {

				calculatorCopy[i].inchesAllPizza = 0
				calculatorCopy[i].pricePerInch = 0.00
				calculatorCopy[i].errorMessage = "";
				
				this.setState({calculators:calculatorCopy});
			}

			calculatorCopy[i].valueMessage = 0;
		}

		calculatorCopy[bestValueKey].valueMessage = 1;

	}

	createNewCalculator() {
		let defaultCalculator = {
			sizeValue:0,
			quantityValue:0,
			priceValue:0,
			inchesAllPizza:0,
			pricePerInch:0,
			valueMessage:0
		};

		var newCalculators = this.state.calculators.slice();
		newCalculators.push(defaultCalculator);
		this.setState({calculators:newCalculators})
	}

	

	renderCalculators() {
		return (
			this.state.calculators.map((item, i) => 
				<Calculator 
					calcKey={i}
					sizeValue={item.sizeValue}
					priceValue={item.priceValue}
					quantityValue={item.quantityValue}
					changeValue={this.changeValue.bind(this)}
					handleChange={this.handleChange.bind(this)}
					inchesAllPizza={item.inchesAllPizza}
					pricePerInch={item.pricePerInch}
					errorMessage={item.errorMessage}
					valueMessage={item.valueMessage}
				/>
			)
		);
	}

	render() {
		return (
			<div class="page-wrapper">
				<header class="title-wrapper">
					<h1>pizzacalculator</h1>
				</header>
				<main class="content-wrapper">
					<h2>Pizza should be easy</h2>
					<p>Calculate how much pizza you are getting for your money and compare deals, because math is hard.</p>

					<div class="line-spacer"></div>

					{this.renderCalculators()}

					<div class="cf">
					<div class="left">
						<input type="button" value="Calculate" class="standard-button" onClick={() => this.calculateResults()} />
					</div>
					<div class="right">
						<input type="button" value="Add new set" class="standard-button" onClick={() => this.createNewCalculator()} />
					</div>
				</div>

				</main>
				<footer class="footer-wrapper">
					<p>Pizzacalculator was created by Mark Allum, a developer with a passion for the web and good value pizza. You can find out more about my projects and my work here.</p>
				</footer>
			</div>


		);
	}
}


ReactDOM.render(
	<Page />,
	document.getElementById('root')
);