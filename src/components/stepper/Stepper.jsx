import React, { Fragment, useState } from "react";
import swal from "sweetalert";
import { ReactComponent as Check } from "../../assets/icons/check.svg";

const Stepper = ({ steps, showNumber, activeStep, onSelect, valid }) => {
  const lastIndexOfSteps = steps.length - 1;

  const onClick = (index) => {
    if (valid === false) {
      swal("No puedes entrar aqui!");
      return;
    }
    return onSelect.bind(null, index + 1);
  };

  return (
    <>
      <div className="flex justify-center items-center p-3 w-3/6 mx-auto">
        {steps.map((step, index) => {
          return (
            <Fragment key={index}>
              <div className="flex flex-col cursor-pointer  mx-auto w-5/12 justify-center items-center">
                <button
                  className="flex flex-col focus:outline-none"
                  onClick={() =>
                    step.valid === true
                      ? onSelect(index + 1)
                      : swal("No puedes entrar aqui!")
                  }
                >
                  <picture
                    className={`border-black rounded-full border shadow-xl w-max p-5 opacity-50  ${
                      activeStep === index + 1
                        ? "opacity-100"
                        : index + 1 < activeStep
                        ? "opacity-50"
                        : "opacity-50"
                    }`}
                  >
                    {index + 1 < activeStep && (
                      <div className="absolute">
                        <Check />{" "}
                      </div>
                    )}

                    {step.component}
                  </picture>
                </button>

                <span
                  className={`text-center py-1 ${
                    activeStep === index + 1 ? "text-upeu-3" : ""
                  }`}
                >
                  {step.title}
                </span>

              </div>
              <hr
                  className={`flex justify-center ${
                    step.end === "end"
                      ? "hidden"
                      : "border bg-gray-800 w-28 h-1 mx-4"
                  }`}
                />
              {lastIndexOfSteps === index ? (
                ""
              ) : (
                <div className="stepper-item-outer"> </div>
              )}
            </Fragment>
          );
        })}
      </div>
      
    </>

  );

};

export default Stepper;
