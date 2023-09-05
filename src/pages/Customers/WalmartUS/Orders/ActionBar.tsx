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
  handleSinglePalletLabelFrame: () => void;
  handleMultiPalletLabelFrame: () => void;
  handleASNFrame: () => void;
  handleInvoiceFrame: () => void;
  handleSyncFrame: () => void;
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
  handleSinglePalletLabelFrame,
  handleMultiPalletLabelFrame,
  handleASNFrame,
  handleInvoiceFrame,
  handleSyncFrame,
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
        <button className="btn btn-mid btn-primary" onClick={handleCaseLabelFrame} disabled={selection.length === 0}>
          Case Label
        </button>
        <button className="btn btn-mid btn-primary" onClick={handleSinglePalletLabelFrame} disabled={selection.length === 0}>
          Single Pallet Label
        </button>
        <button className="btn btn-mid btn-primary" onClick={handleMultiPalletLabelFrame} disabled={selection.length !== 1}>
          Multi Pallet Label
        </button>

        <div className="divider divider-horizontal"></div>

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

        {/* <button className="btn btn-mid btn-primary" onClick={handleASNFrame} disabled={selection.length === 0}>
          Send ASN
        </button>

        <div className="divider divider-horizontal"></div>

        <button className="btn btn-mid btn-primary" onClick={handleInvoiceFrame} disabled={selection.length === 0}>
          Send Invoice
        </button> */}
      </div>

      <div className="flex flex-row items-center space-x-2">
        {/* <button className="btn btn-mid btn-primary" onClick={handleSyncFrame} disabled={selection.length === 0}>
          Sync
        </button> */}
        <div className="divider divider-horizontal"></div>
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
