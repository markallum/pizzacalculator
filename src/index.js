

import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class NumberInput extends React.Component {



	handleChange(e) {
		this.setState({inputValue: e.target.value});
	}

	changeValue(amount) {
		let oldValue = parseFloat(this.state.inputValue);
		let newValue = oldValue + amount;

		if (newValue < 0) {
			newValue = 0;
		}
		this.setState({inputValue: newValue.toFixed(2)});
	}

	render() {
		return ( 	
			<div>
				<div className="calculator-input-box">

					<input type="number" class="calculator-txtbox number-box"
					data-type={this.props.type} min="0" onChange={this.handleChange} value={this.state.inputValue} step={this.props.step} />
				</div>
				
				<div class="calculator-button-box">
					<input type="button" class="calculator-number-button-add" value="+" onClick={() => this.changeValue(1)}  />
					<input type="button" class="calculator-number-button-subtract" value="-" onClick={() => this.changeValue(-1)} />
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
								 />
							</div>

						</div>
					</div>

				</div>
		);
	}
}

class Calculator extends React.Component {
	render() {
		return (
			<div>
				

				<div>
					<InputGroup />
				</div>
				

				<div class="results-row">
					<span class="results-section"><b>0</b> in<sup>2</sup> of pizza</span>
					<b>0.00</b> per in<sup>2</sup>
				</div>

				<div class="line-spacer"></div>

				<p>
					<input type="button" value="Add new set" class="standard-button" />
				</p>
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