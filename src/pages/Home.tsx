import { useEffect, useState } from "react";
import axios from "axios";
import { filterArray, ipfs_BASEURL, pohApi_URL } from "../constants";
import WordcloudCanvas from "../components/WordcloudCanvas";
import ReasonsList from "../components/ReasonsList";
import { Reason } from "../model/Reason";
import { allPromisesKeepResults } from "../utils";
import _ from "lodash";

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
      return <span>Loading</span>;
    case "error":
      return <span>Oops</span>;
    case "success":
      return (
        <div className="w-full">
          {model.selectedDate !== null ? (
            <div>
              <div style={{ display: "flex", height: "400px" }}>
                <div style={{ flexGrow: 1 }}>
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
                <div style={{ flexGrow: 1 }}>
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
            </div>
          ) : (
            <WordcloudCanvas
              onClick={(word) => {
                setModel({ ...model, selectedWord: word });
              }}
              reasons={model.reasonsList.reasons.map(
                (reason) => reason.description
              )}
              filterWords={filterArray}
            />
          )}
          <div className="text-center">
            <input
              type="date"
              onChange={(e) => {
                setModel({ ...model, selectedDate: e.target.valueAsDate });
              }}
              min="2021-03-10"
            ></input>
          </div>

          <h2 className="text-left text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {model.selectedWord
              ? `Challenges containing ${model.selectedWord.toLocaleUpperCase()}`
              : `All challenges`}
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
