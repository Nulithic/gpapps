import { useState, LegacyRef } from "react";

import Results from "@/components/Results";

interface ProcessDialogProps {
  loading: boolean;
  textRef: LegacyRef<HTMLTextAreaElement>;
  handleTransfer: () => void;
}

const ProcessDialog = ({ loading, textRef, handleTransfer }: ProcessDialogProps) => {
  const [title, setTitle] = useState("Confirmation");
  const [body, setBody] = useState<any>("Are you sure you want to proceed?");
  const [redButtonTxt, setRedButtonTxt] = useState("No");
  const [greenButtonTxt, setGreenButtonTxt] = useState("Yes");
  const [height, setHeight] = useState("h-auto");

  const [confirm, setConfirm] = useState(true);

  const handleSubmit = () => {
    setConfirm(false);
    setTitle("Transfering...");
    setBody(<Results textRef={textRef} />);
    setRedButtonTxt("Close");
    setHeight("h-48");
    handleTransfer();
  };

  const handleClose = () => {
    setConfirm(true);
    setTitle("Confirmation");
    setBody("Are you sure you want to proceed?");
    setRedButtonTxt("No");
    setHeight("h-auto");
  };

  return (
    <>
      <input type="checkbox" id="processDialog" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg pb-4">{title}</h3>
          <div className={`flex ${height}`}>{body}</div>
          <div className="modal-action">
            {loading ? (
              <progress className="progress progress-secondary w-full"></progress>
            ) : (
              <>
                {confirm ? (
                  <>
                    <label className="btn btn-mid btn-error" htmlFor="processDialog">
                      {redButtonTxt}
                    </label>
                    <label className="btn btn-mid btn-secondary" onClick={handleSubmit}>
                      {greenButtonTxt}
                    </label>
                  </>
                ) : (
                  <>
                    <label className="btn btn-mid btn-error" htmlFor="processDialog" onClick={handleClose}>
                      {redButtonTxt}
                    </label>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessDialog;
