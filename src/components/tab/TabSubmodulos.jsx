import React, { useState, Children } from "react";

const TabSubmodulos = ({ onClick, activeTab, label }) => {
  const handleOnClick = () => {
    onClick(label);
  };

  return (
    <>
      <div className="flex flex-col" onClick={handleOnClick}>
        <span
          className={`border  ${
            label === activeTab ? " border-upeu-3" : "border-blue-1"
          }`}
        >
          {label}
        </span>
      </div>
    </>
  );
};

const SubModulContent = ({ children }) => {
  const [activeTab, setStateActive] = useState(children[0].props.label);
  const [clicked, setClicked] = useState(false);

  const onClickModul = (tab) => {
    setStateActive(tab);
    setClicked(!clicked);
  };

  return (
    <div>
      {clicked === false ? (
        <div>
          {Children.map(Children, (child) => {
            const { label } = child.props;

            <TabSubmodulos
              label={label}
              activeTab={activeTab}
              onclick={onClickModul}
            />;
          })}
        </div>
      ) : (
        Children.map(children, (child) => {
          if (child.props.label === activeTab) return child.props.children;
          return undefined;
        })
      )}
    </div>
  );
};

export default SubModulContent;