import DateComponent from "@/components/DatePicker";

const ActionBar = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <div className="form-control">
          <label className="btn cursor-pointer space-x-1">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">Completed</span>
          </label>
        </div>
        <DateComponent />
      </div>
    </div>
  );
};

export default ActionBar;
