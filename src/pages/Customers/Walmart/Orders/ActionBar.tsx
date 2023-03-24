import SettingsDialog from "./Settings";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { postWalmartArchiveOrder, postWalmartPackingList } from "@/api/customers/Walmart";
import { toast } from "react-hot-toast";

interface ActionBarProps {
  filterList: any[];
  selection: any[];
  tableOptions: string;
  handleTableOptions: (value: string) => void;
  handlePackingListFrame: () => void;
}

const ActionBar = ({ filterList, selection, tableOptions, handleTableOptions, handlePackingListFrame }: ActionBarProps) => {
  const handleTest = () => {
    console.log(selection);
  };

  const handlePackingList = async () => {
    console.log(selection);
    handlePackingListFrame();
  };

  const handleArchiveOrders = async () => {
    try {
      await postWalmartArchiveOrder(selection);
      toast.success("Orders have been archived.");
    } catch (err) {
      toast.error("Archiving Failed.");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-primary" disabled={selection.length === 0}>
          Case Load Label
        </button>
        <button className="btn btn-mid btn-primary" onClick={handlePackingList} disabled={selection.length === 0}>
          Packing List
        </button>
        <button className="btn btn-mid btn-primary" disabled={selection.length === 0}>
          Underlying BOL
        </button>
        <button className="btn btn-mid btn-primary" disabled={selection.length === 0}>
          Master BOL
        </button>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <button className="btn btn-mid btn-warning" onClick={handleArchiveOrders} disabled={selection.length === 0}>
          Archive
        </button>
        {/* <button className="btn btn-mid btn-primary" onClick={handleTest}>
          Test
        </button> */}
        <div className="divider divider-horizontal"></div>

        <label className="btn btn-mid" htmlFor="settingsDialog">
          <Cog6ToothIcon className="h-6 w-6" />
        </label>
      </div>
      <SettingsDialog filterList={filterList} tableOptions={tableOptions} handleTableOptions={handleTableOptions} />
    </div>
  );
};

export default ActionBar;
