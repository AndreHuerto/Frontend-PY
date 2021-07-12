import React, { Component } from "react";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="sm:mr-16 my-8 sm:my-1">
        <span className="block ">{this.props.label}</span>
        <select
          name={this.props.name}
          id=""
          onChange={this.props.onChange}
          value={this.props.value}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-upeu-3 focus:ring focus:ring-upeu-3 focus:ring-opacity-50"
        >
          {this.props.options.map((option, key) => (
            <option key={key} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
