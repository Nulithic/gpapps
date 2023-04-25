import { useState, useEffect } from "react";

import WalmartOrder from "@/types/WalmartUS/OrderType";

interface PalletCaseLabelDialogProps {
  selection: WalmartOrder[];
  palletCaseLabelDialog: boolean;
  handlePalletCaseLabelDialog: () => void;
}

interface SelectionWithLabels extends WalmartOrder {
  pallet: boolean;
  cases: boolean;
  multiPallet: boolean;
}

const PalletCaseLabelDialog = ({ selection, palletCaseLabelDialog, handlePalletCaseLabelDialog }: PalletCaseLabelDialogProps) => {
  const [selectionWithLabels, setSelectionWithLabels] = useState<SelectionWithLabels[]>([]);

  useEffect(() => {
    setSelectionWithLabels(selection.map((selection) => ({ ...selection, pallet: true, cases: true, multiPallet: false })));
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
              <tr></tr>
              {selectionWithLabels.map((item, key) => (
                <tr key={key}>
                  <td>{item.purchaseOrderNumber}</td>
                  <td>
                    <input type="checkbox" checked={item.pallet} className="checkbox rounded" />
                  </td>
                  <td>
                    <input type="checkbox" checked={item.cases} className="checkbox rounded" />
                  </td>
                  <td>
                    <input type="checkbox" checked={item.multiPallet} className="checkbox rounded" />
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
