import React, { useState, cloneElement, Children } from "react";


const Faq = ({ children }) => {
  const [open, setIsOpen] = useState([]);
  const isOpen = (index) => {
    return open.includes(index) ? true : false;
  };
  const onToggle = (index) => {
    if (open.includes(index)) {
      setIsOpen(open.filter((item) => item !== index));
    } else {
      setIsOpen([...open, index]);
    }
  };

  return (
    <dl className="my-5">
      {Children.map(children, (child, index) => {
        return cloneElement(child, {
          isOpen: isOpen(index),
          onToggle: () => onToggle(index),
        });
      })}
    </dl>
  );
};

function QaItem({ children, isOpen, onToggle }) {
  return Children.map(children, (child) => {
    return cloneElement(child, {
      isOpen: isOpen,
      onToggle: onToggle,
    });
  });
}

function Question({ children, isOpen, answerId, onToggle,getDocentes }) {
  
  return (
    <dt>
      <button
        className="w-full flex items-center focus:outline-none accordion font__proyecto"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={() => {
          onToggle();
          getDocentes();
        }}
      >
        {children(isOpen, onToggle)}
      </button>
    </dt>
  );
}

function Answer({ children, id, isOpen }) {
  return (
    <dd className="">
      <section
        className={` 
        
        ${isOpen
            ? "panel-on"
            : "panel"
        }`}
        id={id}
      >
        <div className="p-4 space-y-3">
          {React.Children.map(children, (child) => {
                return child;
              
            })}

        </div>

      

      </section>
    </dd>
  );
}

Faq.QAItem = QaItem;
Faq.Question = Question;
Faq.Answer = Answer;

export default Faq;
