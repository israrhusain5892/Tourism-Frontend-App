import React from "react";

const Button = (props) => {
  return (
    <button className="bg-green-800 md:my-0 my-7 text-white px-6  py-2 rounded md:ml-8 hover:bg-green-600 duration-300">
      {props.children}
    </button>
  );
};

export default Button;
