import React, { Component, Fragment,Children,useEffect } from "react";
import { Link } from "react-router-dom";

function NavActice(props) {
  const { label, activeButton, onClick,to } = props;


  return (
    <li>
      <Link
        to={to}
        className={`transition duration-500 ease select-none focus:outline-none focus:ring-offset-upeu-3 ${
          activeButton === label
            ? "border px-2 py-1 rounded-3xl text-white bg-upeu-3 "
            : "border px-2 py-1 rounded-3xl text-black bg-gray-50 hover:bg-gray-300 "
        }`}
        onClick={() => {
          onClick(label);
        }}
      >

        {label}

      </Link>

    </li>

  );
}

export default class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeButton: this.props.children[0].props.label,
      username: '',
      rol : ''
    };

  }

  onClick = (tab) => {
    this.setState({ activeButton: tab });
    
  };


  render() {
    const {
      onClick,
      props: { children },
      state: { activeButton },
    } = this;
    return (
      <>
        <nav className="h-14">
          <ul className="mx-10 flex h-full items-center space-x-6">
            {children.map((child) => {
              const { label,to } = child.props;

              return (
                <NavActice
                  activeButton={activeButton}
                  key={label}
                  label={label}
                  onClick={onClick}
                  to={to}
                />
              );
            })}
          </ul>
        </nav>
        <section>
          {children.map((child) => {
            if (child.props.label !== activeButton) return undefined;
            return child.props.children;
          })}
        </section>
      </>
    );
  }
}
