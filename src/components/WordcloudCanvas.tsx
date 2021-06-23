import { useEffect, useRef } from "react";
import _ from "lodash";
import WordCloud from "wordcloud";

type WordcloudProps = {
  reasons: string[];
  filterWords: string[];
  shape?: undefined | ((theta: number) => number);
  onClick: (word: string) => void;
};
const WordcloudCanvas = (props: WordcloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current !== null) {
      //Our first draw
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;

      const reasons = props.reasons;
      const arrayOfWords = reasons
        .flatMap((reason) => reason.split(/[\s\n]+/))
        .filter(
          (word) => props.filterWords.includes(word.toLowerCase()) === false
        );
      const frequencyDict = Object.entries(
        _.countBy(arrayOfWords, (a) => a.toLocaleLowerCase())
      ).map(([a, b]) => [a, b / arrayOfWords.length]);
      const sorted = _.sortBy(frequencyDict, ([a, b]) => -b);
      WordCloud(canvasRef.current, {
        list: sorted,
        click: (item) => props.onClick(item[0]),
        //@ts-ignore
        rotateRatio: 0,
        weightFactor: 3000,
        color: function (word, weight) {
          return (weight as number) >= 0.03
            ? "#FFC107"
            : (weight as number) >= 0.01
            ? "#b3c5cc"
            : "#343A40";
        },
        gridSize: 15,
        fontFamily: "Finger Paint, cursive, sans-serif",
        backgroundColor: "#fff",
        //@ts-ignore
      });
    }
    // eslint-disable-next-line
  }, [props.reasons]);

  return (
    <canvas
      className="shadow-2xl border-b border-gray-200"
      ref={canvasRef}
      style={{
        width: "96%",
        height: "100%",
        margin: "1rem",
        borderRadius: "0.5rem",
      }}
    />
  );
};

export default WordcloudCanvas;
