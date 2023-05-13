import { memo, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import download from "downloadjs";

import { checkWalmartUSCaseLabel, getWalmartUSCaseLabel } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import { format } from "date-fns";

interface PackingListProps {
  selection: WalmartOrder[];
}

interface WalmartCaseLabel {
  purchaseOrderNumber: string;
  buyingParty: string;
  buyingPartyStreet: string;
  buyingPartyAddress: string;
  distributionCenterNumber: string;
  purchaseOrderType: string;
  departmentNumber: string;
  wmit: string;
  vsn: string;
  serialNumber: number;
  type: string;
  sscc: string;
  date: string;
}

export const CaseLabel = ({ selection }: PackingListProps) => {
  const [existingOrders, setExistingOrders] = useState<string[]>([]);
  const [caseLabels, setCaseLabels] = useState<WalmartCaseLabel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await checkWalmartUSCaseLabel(selection);
        const existingCaselabels = res.data as WalmartCaseLabel[];

        const existingOrders = existingCaselabels.map((item) => item.purchaseOrderNumber);
        const getUniqueValues = (array: string[]) => [...new Set(array)];
        const existingUniqueOrders = getUniqueValues(existingOrders);

        console.log(res.data);
        setCaseLabels(res.data);
        setExistingOrders(existingUniqueOrders);
      } catch (err) {
        toast.error("Error occurred.");
        console.log(err);
      }
    })();
  }, []);

  const handleFirstDownload = async () => {
    try {
      setLoading(true);
      const res = await getWalmartUSCaseLabel(selection);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Case Label.pdf`);
      if (res.status === 200) setLoading(false);
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setLoading(false);
    }
  };
  const handleOldDownload = async () => {
    try {
      setLoading(true);
      const res = await getWalmartUSCaseLabel(selection);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Case Label.pdf`);
      if (res.status === 200) setLoading(false);
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setLoading(false);
    }
  };
  const handleNewDownload = async () => {
    try {
      setLoading(true);
      const res = await getWalmartUSCaseLabel(selection);
      download(new Blob([res.data]), `${format(new Date(), "MM.dd.yyyy")} - Walmart Case Label.pdf`);
      if (res.status === 200) setLoading(false);
    } catch (err) {
      toast.error("Error occurred.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 m-4">
      {existingOrders.length !== 0 ? <p>Existing serial numbers detected for:</p> : null}

      {existingOrders.map((item) => (
        <p key={item}>{item}</p>
      ))}

      {existingOrders.length === 0 ? (
        <button
          className={`btn btn-primary btn-mid ${loading ? "loading" : ""}`}
          onClick={handleFirstDownload}
          disabled={existingOrders.length !== 0 || loading || caseLabels.length !== 0}
        >
          Download
        </button>
      ) : (
        <>
          <button
            className={`btn btn-primary btn-mid ${loading ? "loading" : ""}`}
            onClick={handleOldDownload}
            disabled={existingOrders.length !== 0 || loading || caseLabels.length !== 0}
          >
            Download Old
          </button>

          <button
            className={`btn btn-primary btn-mid ${loading ? "loading" : ""}`}
            onClick={handleNewDownload}
            disabled={existingOrders.length !== 0 || loading || caseLabels.length !== 0}
          >
            Download New
          </button>
        </>
      )}
    </div>
  );
};

export default memo(CaseLabel);
