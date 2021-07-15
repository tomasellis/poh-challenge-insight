import React from "react";
import {
  ClipboardListIcon,
  ChartPieIcon,
  FingerPrintIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={"w-full h-full"}>
      <div className={"flex flex-row w-full h-4/5"}>
        <div className={"LeftText flex-1 flex flex-col items-center"}>
          <div className={"w-full text-7xl pl-20 pt-16 leading-snug"}>
            <span className={"px-3 bg-gray-400"}>Easily</span> accessible{" "}
          </div>
          <div className={"w-full text-7xl pl-20 pt-4 leading-snug"}>
            <span className={"px-3 bg-black text-white"}>PoH</span> challenges{" "}
          </div>
          <div className={"w-full text-7xl pl-20 pt-4 leading-snug"}>
            <span className={"px-3 bg-yellow-400"}>information.</span>{" "}
          </div>
          <div className={"w-full text-3xl pt-5 pl-20 "}>
            <span>Justice is worth finding.</span>
          </div>
        </div>
        <div className={"LeftText flex-1 flex flex-col items-center"}>
          <div className={"w-full pt-16 flex flex-row flex-nowrap"}>
            <div className={"w-1/5 flex flex-col items-center"}>
              <span className={"text-center"}>
                <ClipboardListIcon className={"h-12 w-12 text-blue-500"} />
              </span>
            </div>
            <div className={"w-4/5 mr-20"}>
              <div className={"text-4xl"}>Every challenge justification</div>{" "}
              <div className={"text-xl"}>
                At the tip of your fingers, straight from the Source, you can
                read each and every challenge justification in detail.
              </div>{" "}
            </div>
          </div>
          <div className={"w-full pt-8 flex flex-row flex-nowrap"}>
            <div className={"w-1/5 flex flex-col  items-center"}>
              <span className={"text-center"}>
                <ChartPieIcon className={"h-12 w-12 text-blue-500"} />
              </span>
            </div>
            <div className={"w-4/5 mr-20"}>
              <div className={"text-4xl"}>Graphics galore</div>{" "}
              <div className={"text-xl"}>
                Who doesn’t love a good graphic, displaying data with colors has
                never been easier.
              </div>{" "}
            </div>
          </div>
          <div className={"w-full pt-8 flex flex-row flex-nowrap"}>
            <div className={"w-1/5 flex flex-col items-center"}>
              <span className={"text-center"}>
                <FingerPrintIcon className={"h-12 w-12 text-blue-500"} />
              </span>
            </div>
            <div className={"w-4/5 mr-20"}>
              <div className={"text-4xl"}>Gather your evidence</div>{" "}
              <div className={"text-xl"}>
                A puppeteer arrived in town? Check your suspicions by filtering
                the challenges to your heart’s content.
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-row w-full h-1/5 justify-center items-center"}>
        <Link
          to="/home"
          className="flex justify-center items-center bg-black hover:bg-yellow-400 hover:text-black text-white font-bold text-xl py-2 px-4 h-3/6 w-1/5 mx-10 rounded"
        >
          <span>Try our starter's guide!</span>
        </Link>

        <Link
          to="/home"
          className={
            "flex justify-center items-center border border-gray-700 hover:bg-gray-400 text-black font-bold text-xl py-2 px-4 h-3/6 w-1/5 mx-10 rounded"
          }
        >
          <span>I know how to use it.</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
