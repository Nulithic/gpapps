import SettingsDialog from "./Settings";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface ActionBarProps {
  filterList: any[];
  selection: any[];
}

const ActionBar = ({ filterList, selection }: ActionBarProps) => {
  const handleTest = () => {
    console.log(selection);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-primary" onClick={handleTest}>
          Test
        </button>
        <button className="btn btn-mid btn-primary">Case Load Label</button>
        <button className="btn btn-mid btn-primary">Packing List</button>
        <button className="btn btn-mid btn-primary">Underlying BOL</button>
        <button className="btn btn-mid btn-primary">Master BOL</button>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <label className="btn btn-mid" htmlFor="settingsDialog">
          <Cog6ToothIcon className="h-6 w-6" />
        </label>
      </div>
      <SettingsDialog filterList={filterList} />
    </div>
  );
};

export default ActionBar;
