import React, { useState, Children } from "react";
import { ReactComponent as Preinsc } from "../../assets/icons/preinscripcion.svg";
import swal from "sweetalert";

const TabIco = ({
  onClick,
  activeTab,
  label,
  component,
  end,
  center,
  status,
  activeStep,
  onSelect,
}) => {
  const handleClick = () => {
    if (!status) {
      swal("No puedes entrar aqui!");
    } else {
      onClick(label);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <picture
          onClick={handleClick}
          className={`border-black rounded-full border shadow-xl w-max p-5 " ${
            activeTab === label && status === true
              ? "opacity-100"
              : "opacity-50"
          } ${center === "center" ? "mx-auto" : ""}`}
        >
          {component}
        </picture>
        <span className="text-center">{label}</span>
      </div>

      <hr
        className={`${
          end === "end" ? "hidden" : "border bg-gray-800 w-28 h-1 mx-4"
        }`}
      />
    </>
  );
};

const TabsIcons = ({ children }) => {
  const [activeTab, setStateActive] = useState(children[0].props.label);
  const [istatus, setStatus] = useState(children[0].props.status);

  const onClickTabItem = (tab) => {
    if (!istatus) {
      swal("Hello world!");
    } else {
      setStateActive(tab);
    }
  };

  return (
    <div className="">
      <ol className="">
        <section className="flex mx-auto w-5/12 justify-center items-center">
          {Children.map(children, (child) => {
            const {
              label,
              component,
              end,
              center,
              status,
              activeStep,
              onSelect,
            } = child.props;

            return (
              <TabIco
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
                component={component}
                end={end}
                center={center}
                status={status}
                istatus={istatus}
              />
            );
          })}
        </section>
      </ol>
      <div className="tab-content">
        {Children.map(children, (child) => {
          // if (child.props.label !== activeTab && child.props.istatus === false) return undefined;
          if (child.props.label === activeTab && child.props.status === true)
            return child.props.children;
          return undefined;
        })}
      </div>
    </div>
  );
};

export default TabsIcons;
