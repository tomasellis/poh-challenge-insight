import {
  ClipboardListIcon,
  ChartPieIcon,
  FingerPrintIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={"flex flex-col w-screen h-screen"}>
      <div className={"flex-1 flex flex-col w-full xl:flex-row xl:h-4/6"}>
        <div className={"LeftText flex-1 flex flex-col items-center"}>
          <div
            className={
              "w-full text-3xl sssm:text-4xl pl-5 ssm:pl-7 pt-10 ssm:text-5xl sm:text-7xl sm:pl-20 sm:pt-20 md:pl-12 md:pt-20 md:text-8xl lg:pt-24 xl:pt-20 xl:pl-20 xl:text-7xl 2xl:pl-24 2xl:pt-24 2xl:text-8xl leading-snug"
            }
          >
            <span className={"px-3 bg-gray-400"}>Easily</span> accessible{" "}
          </div>
          <div
            className={
              "w-full text-3xl sssm:text-4xl pl-5 pt-3 ssm:pl-7 ssm:text-5xl ssm:pt-8 sm:text-7xl sm:pt-10 sm:pl-20 md:pl-12 md:pt-16 md:text-8xl xl:text-7xl xl:pl-20 2xl:pl-24 2xl:pt-16 2xl:text-8xl leading-snug"
            }
          >
            <span className={"px-3 bg-black text-white"}>PoH</span> challenges{" "}
          </div>
          <div
            className={
              "w-full text-3xl sssm:text-4xl pl-5 pt-3 ssm:pl-7 ssm:text-5xl ssm:pt-8 sm:text-7xl sm:pt-10 sm:pl-20 md:pl-12 md:pt-16 md:text-8xl xl:text-7xl xl:pl-20 2xl:pl-24 2xl:pt-16 2xl:text-8xl leading-snug"
            }
          >
            <span className={"px-3 bg-yellow-400"}>information.</span>{" "}
          </div>
          <div
            className={
              "w-full text-base pl-5  sssm:text-xl sssm:pl-7 pt-4 ssm:pt-6 ssm:text-2xl sm:text-3xl sm:pl-20 md:text-4xl md:pt-10 md:pl-12 lg:pt-12 lg:text-5xl xl:pt-10 xl:pl-20 xl:text-4xl 2xl:pl-24 2xl:pt-14 2xl:text-5xl"
            }
          >
            <span>Justice is worth finding.</span>
          </div>
        </div>
        <div className={"LeftText flex-1 flex flex-col items-center"}>
          <div
            className={
              "w-full pt-8 sm:pt-20 lg:pt-24 xl:pl-10 flex flex-row flex-nowrap"
            }
          >
            <div className={"w-1/5 flex flex-col items-center"}>
              <span className={"text-center"}>
                <ClipboardListIcon
                  className={
                    "h-8 sssm:h-10 ssm:h-12 sm:h-14 lg:h-20 xl:h-14 2xl:h-20 text-black"
                  }
                />
              </span>
            </div>
            <div className={"w-4/5 sm:mr-20"}>
              <div
                className={
                  "font-bold sm:font-normal text-xl ssm:text-2xl sm:text-4xl md:text-5xl xl:text-3xl 2xl:text-4xl"
                }
              >
                Every challenge justification
              </div>{" "}
              <div
                className={
                  "text-sm w-5/6 ssm:text-xl ssm:w-11/12 sm:w-11/12 xl:w-auto sm:text-xl md:text-3xl xl:text-xl 2xl:text-2xl 2xl:w-11/12 md:w-full"
                }
              >
                At the tip of your fingers, straight from the Source, you can
                read each and every challenge justification in detail.
              </div>{" "}
            </div>
          </div>
          <div
            className={
              "w-full pt-8 lg:pt-12 xl:pl-10 flex flex-row flex-nowrap"
            }
          >
            <div className={"w-1/5 flex flex-col items-center"}>
              <span className={"text-center"}>
                <ChartPieIcon
                  className={
                    "h-8 sssm:h-10 ssm:h-12 sm:h-14 lg:h-20 xl:h-14 2xl:h-20 text-black"
                  }
                />
              </span>
            </div>
            <div className={"w-4/5 sm:mr-20"}>
              <div
                className={
                  "font-bold sm:font-normal text-xl ssm:text-2xl sm:text-4xl md:text-5xl xl:text-3xl 2xl:text-4xl"
                }
              >
                Graphics galore
              </div>{" "}
              <div
                className={
                  "text-sm w-5/6 ssm:w-11/12 ssm:text-xl xl:w-auto sm:text-xl md:text-3xl xl:text-xl md:w-full 2xl:text-2xl 2xl:w-11/12"
                }
              >
                Who doesn’t love a good graphic, displaying data with colors has
                never been easier.
              </div>{" "}
            </div>
          </div>
          <div
            className={
              "w-full pt-8 lg:pt-12 xl:pl-10 flex flex-row flex-nowrap"
            }
          >
            <div className={"w-1/5 flex flex-col items-center"}>
              <span className={"text-center"}>
                <FingerPrintIcon
                  className={
                    "h-8 sssm:h-10 ssm:h-12 sm:h-14 lg:h-20 xl:h-14 2xl:h-20 text-black"
                  }
                />
              </span>
            </div>
            <div className={"w-4/5 sm:mr-20"}>
              <div
                className={
                  "font-bold sm:font-normal text-xl ssm:text-2xl sm:text-4xl md:text-5xl xl:text-3xl 2xl:text-4xl"
                }
              >
                Gather your evidence
              </div>{" "}
              <div
                className={
                  "text-sm w-5/6 sm:w-11/12 xl:w-auto ssm:text-xl md:text-3xl xl:text-xl md:w-full 2xl:text-2xl 2xl:w-11/12"
                }
              >
                A puppeteer arrived in town? Check your suspicions by filtering
                the challenges to your heart’s content.
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-row w-full justify-center items-center py-12 ssm:py-8 sm:py-16 lg:m-0 lg:py-10 lg:h-1/5 xl:h-2/6 xl:pt-14"
        }
      >
        <Link
          to="/home"
          className="flex justify-center items-center bg-black hover:bg-yellow-400 hover:text-black text-white font-bold py-2 px-4 text-xs ssm:text-sm w-64 mx-2 h-12 sm:text-xl sm:h-16 sm:w-48 sm:mx-10 rounded md:w-4/12 lg:h-20 lg:w-6/12 lg:text-4xl xl:text-xl xl:h-16 xl:w-64 2xl:text-3xl 2xl:h-2/5 2xl:w-1/4"
        >
          <span className="text-center">Try our starter's guide!</span>
        </Link>

        <Link
          to="/home"
          className={
            "flex justify-center items-center border border-gray-700 hover:bg-gray-400 text-black font-bold py-2 px-4  w-64 mx-2 h-12 text-xs ssm:text-sm sm:text-xl sm:w-48 sm:mx-10 rounded sm:h-16 md:w-4/12 lg:w-6/12 lg:h-20 lg:text-4xl xl:text-xl xl:h-16 xl:w-64 2xl:text-3xl 2xl:h-2/5 2xl:w-1/4"
          }
        >
          <span className={"text-center"}>I know how to use it.</span>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
