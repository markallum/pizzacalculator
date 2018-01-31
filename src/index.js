

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class NumberInput extends React.Component {


	

	

	render() {
		return ( 	
			<div>
				<div className="calculator-input-box">

					<input type="number" class="calculator-txtbox number-box"
					data-type={this.props.type} min="0" onChange={(e) => this.props.onChange(e, this.props.type)} value={this.props.inputValue} step={this.props.step} />
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
		let stateKey = `${type}Value`;
		var stateCopy = [...this.state.calculators];

		let oldValue = parseFloat(stateCopy[calcKey][stateKey]);
		let newValue = oldValue + amount;

		if (newValue < 0) {
			newValue = 0;
		}

		
		stateCopy[calcKey][stateKey] = newValue;
		this.setState({calculators:stateCopy});

		//var newCalculators = this.state.calculators.slice();
		//var newCalculator = newCalculators[0];
		//newCalculator.priceValue = newValue;
		//newCalculators.push(newCalculator);
		//this.setState({calculators:newCalculators})

		//this.setState({calculators[0].priceValue: newValue.toFixed(2)});

	}

	handleChange(e, type) {
		let stateKey = `${type}Value`;
		let newValue = parseFloat(e.target.value);
		if (newValue < 0) {
			newValue= 0;
		}
		this.setState({[stateKey]: newValue});

	}

	calculateResults() {
		let resultRadiusPerPizza = this.state.sizeValue / 2;
		let resultAreaPerPizza = (resultRadiusPerPizza * resultRadiusPerPizza) * Math.PI;


		let resultAreaAllPizza = resultAreaPerPizza * this.state.quantityValue;
		let resultPricePerInch = this.state.priceValue / resultAreaAllPizza;

		if (isFinite(resultAreaAllPizza) && isFinite(resultPricePerInch))  {
			this.setState({
				inchesAllPizza:resultAreaAllPizza.toFixed(0),
				pricePerInch:resultPricePerInch.toFixed(2),
				errorMessage:""
			});
		} else {
			this.setState({
				inchesAllPizza:0,
				pricePerInch:0.00,
				errorMessage:"Something went wrong..."
			});
		}
		
	}

	createNewCalculator() {
		let defaultCalculator = {
			sizeValue:0,
			quantityValue:0,
			priceValue:0,
			inchesAllPizza:0,
			pricePerInch:0
		};

		var newCalculators = this.state.calculators.slice();
		newCalculators.push(defaultCalculator);
		this.setState({calculators:newCalculators})
	}

	componentDidMount() {

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
					<p>Pizzacalculator was created by Mark Allum, a web developer with a passion for the web and good value pizza. You can find out more about my projects and my work here.</p>
				</footer>
			</div>


		);
	}
}


ReactDOM.render(
	<Page />,
	document.getElementById('root')
);