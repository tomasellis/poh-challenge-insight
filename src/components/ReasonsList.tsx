import { Reason } from "../pages/Home";

type ReasonsListProps = {
  reasons: Reason[];
  filterF: (reason: Reason) => boolean;
};
const ReasonsList = (props: ReasonsListProps) => {
  return (
    <div>
      {props.reasons.filter(props.filterF).map((reason) => (
        <div>{reason.description}</div>
      ))}
    </div>
  );
};

export default ReasonsList;
