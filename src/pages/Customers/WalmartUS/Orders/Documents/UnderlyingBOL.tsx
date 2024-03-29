import { useState, useEffect } from "react";

import WalmartOrder from "@/types/Walmart/OrderType";
import Spinner from "@/components/Spinner";
import { getWalmartUnderlyingBOL } from "@/api/customers/WalmartUS";
import { toast } from "react-hot-toast";

interface UnderlyingBOLProps {
  selection: WalmartOrder[];
  frame: boolean;
  handleFrame: () => void;
}

// Create Document Component
export const UnderlyingBOL = ({ selection, frame, handleFrame }: UnderlyingBOLProps) => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPDFUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getWalmartUnderlyingBOL(selection);
        if (res.status === 200) {
          const pdfUrl = URL.createObjectURL(res.data);
          setPDFUrl(pdfUrl);
          setLoading(false);
        }
      } catch (err) {
        toast.error("Error occurred.");
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <input type="checkbox" id="pdfModal" className="modal-toggle" checked={frame} readOnly />
      <div className="modal">
        <div className="modal-box relative p-0 pt-12 rounded max-w-full max-h-full h-[calc(100vh-150px)]">
          <p className="absolute left-2 top-2 font-bold text-2xl pl-4">Underlying BOL</p>
          <label htmlFor="pdfModal" className="btn btn-sm btn-circle absolute right-2 top-2" onClick={handleFrame}>
            ✕
          </label>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner size={50} />
            </div>
          ) : (
            <iframe src={pdfUrl} width="100%" height="100%"></iframe>
          )}
        </div>
      </div>
    </>
  );
};

export default UnderlyingBOL;
