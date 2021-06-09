import { useEffect, useRef } from "react";
import _ from "lodash";
import WordCloud from "wordcloud";

type WordcloudProps = {
  reasons: string[];
  filterWords: string[];
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
        .filter((word) => props.filterWords.includes(word) === false);
      const frequencyDict = Object.entries(
        _.countBy(arrayOfWords, (a) => a.toLocaleLowerCase())
      ).map(([a, b]) => [a, b / arrayOfWords.length]);
      const sorted = _.sortBy(frequencyDict, ([a, b]) => -b);
      console.info(sorted);
      WordCloud(canvasRef.current, {
        list: sorted,
        click: (item) => props.onClick(item[0]),
        rotateRatio: 0,
        weightFactor: 2500,
        color: function (word, weight) {
          return (weight as number) >= 0.03 ? "#008968" : "#898989";
        },
        gridSize: 5,
        fontFamily: "Finger Paint, cursive, sans-serif",
        backgroundColor: "#fafafa",
        //@ts-ignore
      });
    }
    // eslint-disable-next-line
  }, [props.reasons]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default WordcloudCanvas;
