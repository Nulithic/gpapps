import DateComponent from "@/components/DatePicker";

interface ActionBarProps {
  date: Date;
  setDate: (date: Date) => void;
}

const ActionBar = ({ date, setDate }: ActionBarProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <div className="form-control">
          <label className="btn btn-mid cursor-pointer space-x-1">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">Completed</span>
          </label>
        </div>
        <DateComponent date={date} setDate={setDate} />
      </div>
      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-primary">Import</button>
        <button className="btn btn-mid btn-success">Transfer</button>
      </div>
    </div>
  );
};

export default ActionBar;
