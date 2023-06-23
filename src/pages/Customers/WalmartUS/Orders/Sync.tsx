import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import socket, { socketListen } from "@/libs/socket";
import { postWalmartSync } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import Results from "@/components/Results";

interface SyncProps {
  selection: WalmartOrder[];
  frame: boolean;
  handleFrame: () => void;
}

interface ButtonProps {
  title: string;
  status: boolean;
  handleOnclick: () => void;
}

const SyncButton = ({ title, status, handleOnclick }: ButtonProps) => {
  return (
    <button className={`btn btn-primary btn-mid ${status ? "loading" : ""}`} onClick={handleOnclick} disabled={status}>
      {title}
    </button>
  );
};

export const Sync = ({ selection, frame, handleFrame }: SyncProps) => {
  const [status, setStatus] = useState(false);

  const syncRef = useRef<HTMLTextAreaElement>(null);

  const handleSync = async () => {
    try {
      setStatus(true);
      socketListen("postWalmartSync", syncRef);
      const res = await postWalmartSync({ selection: selection, socketID: socket.id });
      console.log(res.data);
      if (res.status === 200) {
        setStatus(false);
        socket.off("postWalmartSync");
      }
    } catch (err) {
      console.log(err);
      setStatus(false);
      socket.off("postWalmartSync");
      toast.error("Error occurred.");
    }
  };

  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-5 pt-12 rounded">
          <p className="absolute left-7 top-5 font-bold text-2xl">Sync</p>
          <label className={`btn btn-sm btn-circle absolute right-2 top-2 ${status ? "btn-disabled" : ""}`} onClick={handleFrame}>
            ✕
          </label>
          <div className="flex flex-col items-center space-y-4 m-4">
            <SyncButton title="Sync" status={status} handleOnclick={handleSync} />
          </div>
          <div className="flex h-52">
            <Results textRef={syncRef} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sync;
