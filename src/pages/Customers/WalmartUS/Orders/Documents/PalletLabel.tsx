import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import download from "downloadjs";

import { checkWalmartUSPalletLabel, getExistingWalmartUSPalletLabel, getNewWalmartUSPalletLabel, getWalmartUSPalletLabel } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import { format } from "date-fns";

interface PalletLabelProps {
  selection: WalmartOrder[];
  frame: boolean;
  handleFrame: () => void;
}

interface WalmartLabel {
  purchaseOrderNumber: string;
  buyingParty: string;
  buyingPartyStreet: string;
  buyingPartyAddress: string;
  distributionCenterNumber: string;
  purchaseOrderType: string;
  departmentNumber: string;
  wmit: string;
  vsn: string;
  numberOfCases: number;
  serialNumber: number;
  type: string;
  sscc: string;
  date: string;
}

interface DownloadButtonProps {
  title: string;
  status: boolean;
  handleOnclick: () => void;
}

const DownloadButton = ({ title, status, handleOnclick }: DownloadButtonProps) => {
  return (
    <button className={`btn btn-primary btn-mid ${status ? "loading" : ""}`} onClick={handleOnclick} disabled={status}>
      {title}
    </button>
  );
};

export const PalletLabel = ({ selection, frame, handleFrame }: PalletLabelProps) => {
  const [existingOrders, setExistingOrders] = useState<string[]>([]);
  const [palletLabels, setPalletLabels] = useState<WalmartLabel[]>([]);
  const [status, setStatus] = useState(false);

  const [pdf, setPDF] = useState("");

  const purchaseOrderDateList = selection.map((item) => item.purchaseOrderDate);
  const getUniqueValues = (array: string[]) => [...new Set(array)];
  const checkPurchaseOrderDate = getUniqueValues(purchaseOrderDateList).length > 1;

  const checkMixedOrders = existingOrders.length === selection.length || existingOrders.length === 0;

  useEffect(() => {
    (async () => {
      if (frame)
        try {
          const res = await checkWalmartUSPalletLabel(selection);
          const existingCaselabels = res.data as WalmartLabel[];

          const existingOrders = existingCaselabels.map((item) => item.purchaseOrderNumber);
          const getUniqueValues = (array: string[]) => [...new Set(array)];
          const existingUniqueOrders = getUniqueValues(existingOrders);

          setPalletLabels(res.data);
          setExistingOrders(existingUniqueOrders);
        } catch (err) {
          toast.error("Error occurred.");
          console.log(err);
        }
    })();
  }, [frame]);

  const handleFirstDownload = async () => {
    try {
      setStatus(true);
      const res = await getWalmartUSPalletLabel(selection);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Pallet Label.pdf`);
      if (res.status === 200) {
        setStatus(false);
        handleFrame();
      }
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setStatus(false);
    }
  };
  const handleExistingDownload = async () => {
    try {
      setStatus(true);
      const res = await getExistingWalmartUSPalletLabel(palletLabels);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Pallet Label.pdf`);
      // const pdfUrl = URL.createObjectURL(res.data);
      // setPDF(pdfUrl);
      if (res.status === 200) {
        setStatus(false);
        handleFrame();
      }
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setStatus(false);
    }
  };
  const handleNewDownload = async () => {
    try {
      setStatus(true);
      const res = await getNewWalmartUSPalletLabel({ palletLabels: palletLabels, selection: selection });
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Pallet Label.pdf`);
      if (res.status === 200) {
        setStatus(false);
        handleFrame();
      }
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setStatus(false);
    }
  };

  const ExistingOrders = () => (
    <>
      {existingOrders.length !== 0 ? <p>Existing serial numbers detected for:</p> : null}

      {existingOrders.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-0 pt-12 rounded">
          <p className="absolute left-2 top-2 font-bold text-2xl">Pallet Label</p>
          <label htmlFor="pdfModal" className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
            ✕
          </label>
          {frame ? (
            checkPurchaseOrderDate ? (
              <p className="p-2">Please select orders from only one PO date.</p>
            ) : (
              <div className="flex flex-col items-center space-y-4 m-4">
                <ExistingOrders />
                {checkMixedOrders ? (
                  <>
                    {existingOrders.length === 0 ? (
                      <DownloadButton title="Download" status={status} handleOnclick={handleFirstDownload} />
                    ) : (
                      <>
                        <DownloadButton title="Download Existing" status={status} handleOnclick={handleExistingDownload} />
                        <DownloadButton title="Download New" status={status} handleOnclick={handleNewDownload} />
                      </>
                    )}
                  </>
                ) : (
                  <p className="p-2">Please do not mix existing labels with new labels.</p>
                )}
              </div>
            )
          ) : null}
          {/* <iframe src={pdf} width="100%" height="500px"></iframe> */}
        </div>
      </div>
    </>
  );
};

export default PalletLabel;
