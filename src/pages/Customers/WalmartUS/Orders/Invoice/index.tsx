import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

import socket, { socketListen } from "@/libs/socket";
import { postWalmartInvoice } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import DateComponent from "@/components/DatePicker";

interface InvoiceProps {
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

export const Invoice = ({ selection, frame, handleFrame }: InvoiceProps) => {
  const [status, setStatus] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleInvoice = async () => {
    try {
      const res = await postWalmartInvoice({ selection: selection, date: date, socketID: socket.id });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-0 pt-12 rounded">
          <p className="absolute left-2 top-2 font-bold text-2xl">Invoice</p>
          <label htmlFor="pdfModal" className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
            ✕
          </label>

          <DownloadButton title="Submit Invoice" status={status} handleOnclick={handleInvoice} />
          <DateComponent date={date} setDate={setDate} />
        </div>
      </div>
    </>
  );
};

export default Invoice;
