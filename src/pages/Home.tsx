import { useEffect, useState } from "react";
import axios from "axios";
import { filterArray, ipfs_BASEURL, pohApi_URL } from "../constants";
import WordcloudCanvas from "../components/WordcloudCanvas";
import ReasonsList from "../components/ReasonsList";

export type Reason = {
  description: string;
  createdAt: Date;
};

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
        <div className="Home">
          <input
            type="date"
            onChange={(e) => {
              setModel({ ...model, selectedDate: e.target.valueAsDate });
            }}
            min="2021-03-10"
          ></input>
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
              <div>
                <ReasonsList
                  filterF={(reason) =>
                    model.selectedWord
                      ? reason.description
                          .toLowerCase()
                          .includes(model.selectedWord)
                      : true
                  }
                  reasons={model.reasonsList.reasons}
                />
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
        </div>
      );
  }
};

const query = `query {
    challenges(first: 1000 where: {reason_not:"None"}) {
      request (where: {}) {
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

  const challenges = res.data.data.challenges;
  const bigBoy: Reason[] = [];
  for (let i = 0; i < challenges.length; i++) {
    let request = challenges[i].request;
    if (
      request.evidence.length > 1 &&
      request.evidence["1"].URI.search(".json") !== -1
    ) {
      let evidenceURI = request.evidence["1"].URI;
      try {
        let evidenceRes = await axios.get(`${ipfs_BASEURL}${evidenceURI}`);
        bigBoy.push({
          description: evidenceRes.data.description,
          createdAt: new Date(request.creationTime * 1000),
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
  return bigBoy;
};

export default Home;
