interface ActionBarProps {}

const ActionBar = ({}: ActionBarProps) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-primary">Case Load Label</button>
        <button className="btn btn-mid btn-primary">Packing List</button>
        <button className="btn btn-mid btn-primary">Underlying BOL</button>
        <button className="btn btn-mid btn-primary">Master BOL</button>
      </div>
      <div className="flex flex-row items-center space-x-2"></div>
    </div>
  );
};

export default ActionBar;
