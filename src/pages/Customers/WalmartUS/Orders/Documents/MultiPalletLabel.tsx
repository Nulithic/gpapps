import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import download from "downloadjs";

import { checkWalmartUSPalletLabel, deleteWalmartUSMultiPalletLabel, downloadWalmartUSMultiPalletLabel } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import { format } from "date-fns";

interface MultiPalletLabelProps {
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
  multiPallet: string;
  multiPalletID: number;
  sscc: string;
  date: string;
}

interface DownloadButtonProps {
  title: string;
  status: boolean;
  style: boolean;
  handleOnclick: () => void;
}

const DownloadButton = ({ title, status, style, handleOnclick }: DownloadButtonProps) => {
  return (
    <button className={`btn ${style ? "btn-primary" : "btn-error"} btn-mid ${status ? "loading" : ""}`} onClick={handleOnclick} disabled={status}>
      {title}
    </button>
  );
};

export const MultiPalletLabel = ({ selection, frame, handleFrame }: MultiPalletLabelProps) => {
  const [existingOrders, setExistingOrders] = useState<string[]>([]);
  const [palletLabels, setPalletLabels] = useState<WalmartLabel[]>([]);
  const [status, setStatus] = useState(false);

  // const [pdf, setPDF] = useState("");

  const checkMulitPallet = palletLabels.some((item) => item.multiPallet === "Yes");

  useEffect(() => {
    (async () => {
      if (frame)
        try {
          const res = await checkWalmartUSPalletLabel(selection);
          const existingPalletlabels = res.data as WalmartLabel[];

          const existingOrders = existingPalletlabels.map((item) => item.purchaseOrderNumber);
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

  const handleDownload = async () => {
    try {
      setStatus(true);
      const res = await downloadWalmartUSMultiPalletLabel(palletLabels);
      // const pdfUrl = URL.createObjectURL(res.data);
      // setPDF(pdfUrl);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Multi Pallet Label.pdf`);
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
  const handleDelete = async () => {
    try {
      setStatus(true);
      const res = await deleteWalmartUSMultiPalletLabel(palletLabels);
      if (res.status === 200) {
        setStatus(false);
        toast.success("Multi pallet label deleted.");
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
      {existingOrders.length !== 0 ? <p>Mulit pallet label detected for:</p> : null}

      {existingOrders.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      {frame && (
        <div className="modal">
          <div className="modal-box relative p-5 pt-12 rounded">
            <p className="absolute left-7 top-5 font-bold text-2xl">Multi Pallet Label</p>
            <label htmlFor="pdfModal" className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
              ✕
            </label>
            <div className="flex flex-col items-center space-y-4 m-4">
              <ExistingOrders />

              {!checkMulitPallet ? (
                <>
                  <p className="p-2">Multi Pallet Label not detected.</p>
                  <p className="p-2">Please create Multi Pallet Label on scanner or use the Single Pallet Label instead.</p>
                </>
              ) : (
                <>
                  <DownloadButton title="Download" style={true} status={status} handleOnclick={handleDownload} />
                  <DownloadButton title="Delete" style={false} status={status} handleOnclick={handleDelete} />
                </>
              )}
            </div>
            {/* <iframe src={pdf} width="100%" height="500px"></iframe> */}
          </div>
        </div>
      )}
    </>
  );
};

export default MultiPalletLabel;
