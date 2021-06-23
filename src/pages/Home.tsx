import { useEffect, useState } from "react";
import axios from "axios";
import { filterArray, ipfs_BASEURL, pohApi_URL } from "../constants";
import WordcloudCanvas from "../components/WordcloudCanvas";
import ReasonsList from "../components/ReasonsList";
import { Reason } from "../model/Reason";
import { allPromisesKeepResults } from "../utils";
import _ from "lodash";
import { RefreshIcon } from "@heroicons/react/outline";

type HomeModel = {
  reasonsList:
    | { type: "loading" }
    | { type: "error" }
    | {
        type: "success";
        reasons: Reason[];
      };
  selectedDate: null | Date;
  selectedWord: null | string;
};

const Home = () => {
  const [model, setModel] = useState<HomeModel>({
    reasonsList: { type: "loading" },
    selectedDate: null,
    selectedWord: null,
  });
  //eslint-disable-next-line
  const go = async () => {
    const reasons = await getChallengesReasons();
    setModel({ ...model, reasonsList: { type: "success", reasons: reasons } });
  };

  useEffect(() => {
    go();
    //eslint-disable-next-line
  }, []);

  switch (model.reasonsList.type) {
    case "loading":
      return (
        <div>
          <div
            className="lds-roller"
            style={{
              display: "flex",
              height: "100vh",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
            }}
          >
            <div>L</div>
            <div>o</div>
            <div>a</div>
            <div>d</div>
            <div>i</div>
            <div>n</div>
            <div>g</div>
            <div>🛠</div>
          </div>
        </div>
      );
    case "error":
      return (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
          }}
        >
          Oops 😩 there was an error
        </span>
      );
    case "success":
      return (
        <div className="w-full" style={{ backgroundColor: "#ec9b36" }}>
          <div
            style={{
              textAlign: "center",
              fontFamily: "News of the World",
              fontSize: "5rem",
              backgroundColor: "#fff",
            }}
          >
            Challenge Insight
          </div>
          {model.selectedDate !== null ? (
            <div>
              <div
                style={{
                  display: "flex",
                  height: "400px",
                }}
              >
                <div style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontFamily: "Junegull", fontSize: "1.5rem" }}>
                    Most used words before{" "}
                    {`${model.selectedDate.toUTCString()}`}
                  </span>

                  <WordcloudCanvas
                    onClick={(word) => {
                      setModel({ ...model, selectedWord: word });
                    }}
                    reasons={model.reasonsList.reasons
                      .filter(
                        (r) =>
                          r.createdAt.valueOf() < model.selectedDate!.valueOf()
                      )
                      .map((reason) => reason.description)}
                    filterWords={filterArray}
                  />
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontFamily: "Junegull", fontSize: "1.5rem" }}>
                    Most used words after{" "}
                    {`${model.selectedDate.toUTCString()}`}
                  </span>
                  <WordcloudCanvas
                    onClick={(word) => {
                      setModel({ ...model, selectedWord: word });
                    }}
                    reasons={model.reasonsList.reasons
                      .filter(
                        (r) =>
                          r.createdAt.valueOf() >= model.selectedDate!.valueOf()
                      )
                      .map((reason) => reason.description)}
                    filterWords={filterArray}
                  />
                </div>
              </div>
              <div className="text-center mt-16">
                <span
                  style={{
                    fontSize: "1.3rem",
                    marginRight: "1rem",
                    fontFamily: "Junegull",
                  }}
                >
                  Select a date and compare the words!{"   "}
                </span>
                <input
                  className="rounded"
                  style={{
                    padding: "0.5rem",
                    border: "2px solid",
                  }}
                  type="date"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      selectedDate: e.currentTarget.valueAsDate,
                    });
                  }}
                  min="2021-03-10"
                ></input>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <WordcloudCanvas
                  onClick={(word) => {
                    setModel({ ...model, selectedWord: word });
                  }}
                  reasons={model.reasonsList.reasons.map(
                    (reason) => reason.description
                  )}
                  filterWords={filterArray}
                />
              </div>
              <div className="text-center ">
                <span
                  style={{
                    fontSize: "1.3rem",
                    marginRight: "1rem",
                    fontFamily: "Junegull",
                  }}
                >
                  Select a date and compare the words!{"  "}
                </span>
                <input
                  className="rounded"
                  style={{
                    padding: "0.5rem",
                    border: "2px solid",
                  }}
                  type="date"
                  onChange={(e) => {
                    setModel({
                      ...model,
                      selectedDate: e.currentTarget.valueAsDate,
                    });
                  }}
                  min="2021-03-10"
                ></input>
              </div>
            </div>
          )}
          <h2 className="p-2 text-left text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            <button></button>
            {model.selectedWord ? (
              <div className="flex">
                Filtering by challenges that include:{" "}
                {model.selectedWord.toLocaleUpperCase()}
                {"  "}
                <button>
                  <RefreshIcon
                    className="ml-1 h-6 w-6 text-blue-500"
                    onClick={(e) => setModel({ ...model, selectedWord: null })}
                  />
                </button>
              </div>
            ) : (
              `You can filter the challenges by clicking on a word! Now seeing all of 'em!`
            )}
          </h2>
          <ReasonsList
            filterF={(reason) =>
              model.selectedWord
                ? reason.description.toLowerCase().includes(model.selectedWord)
                : true
            }
            reasons={_.sortBy(
              model.reasonsList.reasons,
              (reason) => -reason.klerosCase
            )}
          />
        </div>
      );
  }
};

const query = `query {
  challenges(first: 1000 where: {reason_not:"None"} orderBy:creationTime orderDirection: desc) {
  disputeID  
  request {
    submission {
      id
    }
    creationTime
    evidence (orderBy:creationTime) {
      URI
    }
    }
  }
}`;

const getChallengesReasons = async (): Promise<Reason[]> => {
  const res = await axios({
    url: pohApi_URL,
    method: "post",
    data: {
      query: query,
    },
  });

  const challenges: any[] = res.data.data.challenges;

  const buildReasonPromise = async (challenge: any): Promise<Reason> => {
    const request = challenge.request;
    if (request.evidence.length > 1) {
      const evidenceURI = request.evidence[1].URI;
      const evidenceRes = await axios.get(`${ipfs_BASEURL}${evidenceURI}`);
      return {
        description: evidenceRes.data.description,
        createdAt: new Date(request.creationTime * 1000),
        klerosCase: challenge.disputeID,
        pohAddress: request.submission.id,
      };
    } else {
      return Promise.reject("no evidence");
    }
  };

  const reasons = await allPromisesKeepResults(
    challenges.map(buildReasonPromise)
  );

  return reasons;
};

export default Home;
