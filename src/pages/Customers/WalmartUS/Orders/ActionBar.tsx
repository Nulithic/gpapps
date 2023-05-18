import SettingsDialog from "./Settings";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { postWalmartArchiveOrder } from "@/api/customers/WalmartUS";
import { toast } from "react-hot-toast";

import Dialog from "@/components/Dialog";

interface ActionBarProps {
  filterList: any[];
  selection: any[];
  tableOptions: string;
  handleTableOptions: (value: string) => void;
  handleCaseLabelFrame: () => void;
  handlePackingSlipFrame: () => void;
  handleUnderlyingBOLFrame: () => void;
  handleMasterBOLFrame: () => void;
  handlePalletLabelFrame: () => void;
}

const ActionBar = ({
  filterList,
  selection,
  tableOptions,
  handleTableOptions,
  handleCaseLabelFrame,
  handlePackingSlipFrame,
  handleUnderlyingBOLFrame,
  handleMasterBOLFrame,
  handlePalletLabelFrame,
}: ActionBarProps) => {
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
        <button className="btn btn-mid btn-primary" onClick={handlePackingSlipFrame} disabled={selection.length === 0}>
          Packing List
        </button>
        <button className="btn btn-mid btn-primary" onClick={handleUnderlyingBOLFrame} disabled={selection.length === 0}>
          Underlying BOL
        </button>
        <button className="btn btn-mid btn-primary" onClick={handleMasterBOLFrame} disabled={selection.length === 0}>
          Master BOL
        </button>

        <div className="divider divider-horizontal"></div>

        <button className="btn btn-mid btn-primary" onClick={handleCaseLabelFrame} disabled={selection.length === 0}>
          Case Label
        </button>
        <button className="btn btn-mid btn-primary" onClick={handlePalletLabelFrame} disabled={selection.length === 0}>
          Pallet Label
        </button>

        <div className="divider divider-horizontal"></div>

        <button className="btn btn-mid btn-primary" onClick={handleMasterBOLFrame} disabled={selection.length === 0}>
          Send ASN
        </button>
      </div>

      <div className="flex flex-row items-center space-x-2">
        <label className={`btn btn-mid btn-warning ${selection.length === 0 ? "btn-disabled" : null}`} htmlFor="archiveOrders">
          Archive
        </label>
        {/* <button className="btn btn-mid btn-primary" onClick={handleTest}>
          Test
        </button> */}
        <div className="divider divider-horizontal"></div>

        <label className="btn btn-mid" htmlFor="settingsDialog">
          <Cog6ToothIcon className="h-6 w-6" />
        </label>
      </div>
      <Dialog
        id="archiveOrders"
        submitID="archiveOrders"
        title="Archive Orders"
        body="Do you want to archive these orders?"
        submit="Yes"
        close="No"
        handleSubmit={handleArchiveOrders}
      />

      <SettingsDialog filterList={filterList} tableOptions={tableOptions} handleTableOptions={handleTableOptions} />
    </div>
  );
};

export default ActionBar;
