import React, { Component } from "react";
import "../../styles/tab.css";

export default class Tab extends Component {
  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    return (
      <li className={`inline-block pr-5 cursor-pointer mr-10  ${activeTab === label ? 'tab-list-active': ''}`} onClick={onClick}>
        {label}
        <hr className={`my-3 h-2  ${activeTab === label ? 'bg-upeu-3 w-full rounded-2xl relative': ''}`}/>
        
      </li>
    );
  }
}
