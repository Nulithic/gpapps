import { useState, useEffect } from "react";

import WalmartOrder from "@/types/WalmartUS/OrderType";
import { toast } from "react-hot-toast";

interface PalletCaseLabelDialogProps {
  selection: WalmartOrder[];
  palletCaseLabelDialog: boolean;
  handlePalletCaseLabelDialog: () => void;
}

interface SelectionWithLabels extends WalmartOrder {
  [key: string]: any;
  pallet: boolean;
  cases: boolean;
  multiPallet: boolean;
}

const PalletCaseLabelDialog = ({ selection, palletCaseLabelDialog, handlePalletCaseLabelDialog }: PalletCaseLabelDialogProps) => {
  const [selectionWithLabels, setSelectionWithLabels] = useState<SelectionWithLabels[]>([]);

  const handlePalletCheckbox = (index: number) => {
    const updated = [...selectionWithLabels];
    updated[index].pallet = !updated[index].pallet;
    setSelectionWithLabels(updated);
  };
  const handleCaseCheckbox = (index: number) => {
    const updated = [...selectionWithLabels];
    updated[index].cases = !updated[index].cases;
    setSelectionWithLabels(updated);
  };
  const handleMultiPalletCheckbox = (index: number) => {
    const updated = [...selectionWithLabels];
    updated[index].multiPallet = !updated[index].multiPallet;
    setSelectionWithLabels(updated);
  };

  const handleAllPalletCheckbox = () => {
    const list = selectionWithLabels.map((item) => item.pallet);
    const anySelected = list.some((item) => item === true);

    const updated = [...selectionWithLabels];

    if (anySelected) {
      for (const item of updated) item.pallet = false;
      setSelectionWithLabels(updated);
    } else {
      for (const item of updated) item.pallet = true;
      setSelectionWithLabels(updated);
    }
  };
  const handleAllCaseCheckbox = () => {
    const list = selectionWithLabels.map((item) => item.cases);
    const anySelected = list.some((item) => item === true);

    const updated = [...selectionWithLabels];

    if (anySelected) {
      for (const item of updated) item.cases = false;
      setSelectionWithLabels(updated);
    } else {
      for (const item of updated) item.cases = true;
      setSelectionWithLabels(updated);
    }
  };
  const handleAllMultiPalletCheckbox = () => {
    const list = selectionWithLabels.map((item) => item.multiPallet);
    const anySelected = list.some((item) => item === true);

    const updated = [...selectionWithLabels];

    if (anySelected) {
      for (const item of updated) item.multiPallet = false;
      setSelectionWithLabels(updated);
    } else {
      for (const item of updated) item.multiPallet = true;
      setSelectionWithLabels(updated);
    }
  };

  const getAllCheckboxStates = (checkBoxName: string) => {
    const list = selectionWithLabels.map((item) => item[checkBoxName]);
    const anySelected = list.some((item) => item === true);
    return anySelected;
  };

  useEffect(() => {
    setSelectionWithLabels(
      selection.map((selection) => ({ ...selection, pallet: selection.floorOrPallet === "P" ? true : false, cases: true, multiPallet: false }))
    );
  }, []);

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={palletCaseLabelDialog} readOnly />
      <div className="modal">
        <div className="modal-box relative max-h-full h-full max-w-full w-full p-0 pt-12 rounded">
          <label htmlFor="pdfModal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handlePalletCaseLabelDialog}>
            ✕
          </label>
          <table className="table w-full">
            <thead>
              <tr>
                <th className="font-bold text-lg">PO Number</th>
                <th className="font-bold text-lg">Pallet Labels</th>
                <th className="font-bold text-lg">Case Labels</th>
                <th className="font-bold text-lg">Multi-Pallet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <button className="btn btn-primary btn-mid" onClick={handleAllPalletCheckbox}>
                    {getAllCheckboxStates("pallet") ? "Clear All" : "Select All"}
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary btn-mid" onClick={handleAllCaseCheckbox}>
                    {getAllCheckboxStates("cases") ? "Clear All" : "Select All"}
                  </button>
                </td>
                <td>
                  <button className="btn btn-primary btn-mid" onClick={handleAllMultiPalletCheckbox}>
                    {getAllCheckboxStates("multiPallet") ? "Clear All" : "Select All"}
                  </button>
                </td>
              </tr>
              {selectionWithLabels.map((item, index) => (
                <tr key={index}>
                  <td>{item.purchaseOrderNumber}</td>
                  <td>
                    <input type="checkbox" checked={item.pallet} onChange={() => handlePalletCheckbox(index)} className="checkbox rounded" />
                  </td>
                  <td>
                    <input type="checkbox" checked={item.cases} onChange={() => handleCaseCheckbox(index)} className="checkbox rounded" />
                  </td>
                  <td>
                    <input type="checkbox" checked={item.multiPallet} onChange={() => handleMultiPalletCheckbox(index)} className="checkbox rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-row-reverse p-4">
            <button className="btn btn-mid btn-primary">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PalletCaseLabelDialog;
