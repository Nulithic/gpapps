import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { postWalmartASN } from "@/api/customers/WalmartCA";
import WalmartOrder from "@/types/Walmart/OrderType";
import Results from "@/components/Results";
import socket, { socketListen } from "@/libs/socket";

interface ASNProps {
  selection: WalmartOrder[];
  frame: boolean;
  handleFrame: () => void;
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

export const ASN = ({ selection, frame, handleFrame }: ASNProps) => {
  const [status, setStatus] = useState(false);

  const asnRef = useRef<HTMLTextAreaElement>(null);

  const handleASN = async () => {
    try {
      setStatus(true);
      socketListen("postWalmartASN", asnRef);
      const res = await postWalmartASN({ selection: selection, socketID: socket.id });
      console.log(res.data);
      if (res.status === 200) {
        setStatus(false);
        socket.off("postWalmartASN");
      }
    } catch (err) {
      console.log(err);
      setStatus(false);
      socket.off("postWalmartASN");
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-5 pt-12 rounded">
          <p className="absolute left-7 top-5 font-bold text-2xl">ASN</p>
          <label htmlFor="pdfModal" className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
            ✕
          </label>
          <div className="flex flex-col items-center space-y-4 m-4">
            <DownloadButton title="Submit ASN" status={status} handleOnclick={handleASN} />
          </div>
          <div className="flex h-52">
            <Results textRef={asnRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASN;
