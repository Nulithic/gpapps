import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

import socket, { socketListen } from "@/libs/socket";
import { postWalmartInvoice } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import DateComponent from "@/components/DatePicker";
import Results from "@/components/Results";

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

  const invoiceRef = useRef<HTMLTextAreaElement>(null);

  const handleInvoice = async () => {
    try {
      setStatus(true);
      socketListen("postWalmartInvoice", invoiceRef);
      const res = await postWalmartInvoice({ selection: selection, date: date, socketID: socket.id });
      console.log(res.data);
      if (res.status === 200) {
        setStatus(false);
        socket.off("postWalmartInvoice");
      }
    } catch (err) {
      console.log(err);
      setStatus(false);
      socket.off("postWalmartInvoice");
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-5 pt-12 rounded">
          <p className="absolute left-7 top-5 font-bold text-2xl">Invoice</p>
          <label htmlFor="pdfModal" className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
            ✕
          </label>
          <div className="flex flex-col items-center space-y-4 m-4">
            <DateComponent date={date} setDate={setDate} />
            <DownloadButton title="Submit Invoice" status={status} handleOnclick={handleInvoice} />
          </div>
          <div className="flex h-52">
            <Results textRef={invoiceRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
