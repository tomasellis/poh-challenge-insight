import React from "react";

const Landing = () => {
  return (
    <div className={"w-full h-full"}>
      <div className={"flex flex-row border border-pink-600 w-full h-4/5"}>
        <div className={"flex-1 flex flex-col border border-indigo-600 "}>
          Div 1
        </div>
        <div className={"flex-1 flex flex-col border border-blue-600 "}>
          Div 2
        </div>
      </div>
      <div className={"flex flex-col border border-green-500 w-full h-1/5"}>
        <div
          className={
            "flex flex-row border border-red-600 w-full h-full justify-center items-center"
          }
        >
          <button>Try tutorial</button>
          <button>Go and fly</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
