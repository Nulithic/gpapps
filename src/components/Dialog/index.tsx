import { ReactNode } from "react";

interface DialogProps {
  id: string;
  submitID?: string;
  title: ReactNode;
  body: ReactNode;
  loading?: boolean;
  close?: string;
  submit?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
}

const Dialog = ({ id, submitID, title, body, loading, close, submit, handleClose, handleSubmit }: DialogProps) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg pb-4">{title}</h3>
          <div className="flex h-48">{body}</div>
          <div className="modal-action">
            {loading ? (
              <progress className="progress progress-secondary w-full"></progress>
            ) : (
              <>
                {close ? (
                  <label className="btn btn-mid btn-error" htmlFor={id} onClick={handleClose}>
                    {close}
                  </label>
                ) : null}
                {submit ? (
                  <label className="btn btn-mid btn-secondary" htmlFor={submitID} onClick={handleSubmit}>
                    {submit}
                  </label>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
