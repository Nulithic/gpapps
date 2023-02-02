import DateComponent from "@/components/DatePicker";

interface ActionBarProps {
  date: Date;
  complete: boolean;
  handleComplete: () => void;
  handleDate: (date: Date) => void;
}

const ActionBar = ({ complete, date, handleDate, handleComplete }: ActionBarProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <p>Transfer Date: </p>
        <DateComponent date={date} setDate={handleDate} />
        <div className="form-control">
          <label className="btn btn-mid cursor-pointer space-x-1">
            <input type="checkbox" className="checkbox rounded" checked={complete} onChange={handleComplete} />
            <span className="label-text">Completed</span>
          </label>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-primary">Import</button>
        <label className="btn btn-mid btn-secondary" htmlFor="processDialog">
          Transfer
        </label>
      </div>
    </div>
  );
};

export default ActionBar;
