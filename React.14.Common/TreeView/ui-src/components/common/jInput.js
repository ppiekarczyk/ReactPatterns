import React, {Component} from 'react';
// import ReactDom  from 'react-dom';

class JInputRender extends Component {
 	render() {
		let inputSty = this.props.input.style ? this.props.input.style : {color: 'red'};
		let textValue = this.state.textValue;
		let colorValue = this.props.input.colorValue ? this.props.input.colorValue : '#1A3212';
		let checkedValue = (this.props.input.checkedValue != null) ? this.props.input.checkedValue : false;
		let numberValue = this.props.input.numberValue ? this.props.input.numberValue : 0;
		let radioValue = this.props.input.radioValue ? this.props.input.radioValue : '';
		let radioChecked = (this.props.input.radioChecked != null) ? this.props.input.radioChecked : false;
		let min = this.props.input.min ? this.props.input.min : 0;
		let max = this.props.input.max ? this.props.input.max : 100;
		let step = this.props.input.step ? this.props.input.step : 1;
		let inputType = this.props.input.type ? this.props.input.type : 'text';

		let returnRadio = (
				<input
					ref="inputRef"
					type={inputType}
					style={inputSty}
					checked={radioChecked}
					value={radioValue}
					onChange={this.handleValueChange} />
			)

		let returnChecked = (
				<input
					ref="inputRef"
					type={inputType}
					style={inputSty}
					checked={checkedValue}
					onChange={this.handleCheckedChange} />
			)

		let returnColor = (
				<input
					type={inputType}
					ref="inputRef"
					style={inputSty}
					value={colorValue}
					onChange={this.handleValueChange} />
			)

		let returnNumber = (
				<input
					type={inputType}
					ref="inputRef"
					style={inputSty}
					value={numberValue}
					min={min} max={max} step={step}
					onChange={this.handleValueChange} />
			)

		let returnText = (
				<input
					type={inputType}
					ref="inputRef"
					style={inputSty}
					value={textValue}
					onChange={this.handleTextValueChange} />
			)
		let returnIt = {};
		switch (inputType) {
			case 'checkbox': returnIt = returnChecked; break;
			case 'radio': returnIt = returnRadio; break;
			case 'color': returnIt = returnColor; break;
			case 'number':
			case 'range': returnIt = returnNumber; break;
			default: returnIt = returnText; break;
		}

		return (returnIt);
	}
}

export default class JInput extends JInputRender {
	constructor() {
	  super();
		this.state = {textValue: ''};
	}

	componentDidMount() {
		if (this.props.input.textValue) this.setState({textValue: this.props.input.textValue});
		if (this.props.input.focus) this.refs.inputRef.focus();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.input.textValue && (this.state.textValue != nextProps.input.textValue))
			{this.setState({textValue: nextProps.input.textValue});}
	}

	handleCheckedChange = (event) => { this.props.handleChange(this.props.input.name, event.target.checked); }
	handleTextValueChange = (event) => {
		let newValue = event.target.value;
		this.setState({textValue: newValue});
		this.props.handleChange(this.props.input.name, newValue);
	}
	handleValueChange = (event) => { this.props.handleChange(this.props.input.name, event.target.value); }
}
