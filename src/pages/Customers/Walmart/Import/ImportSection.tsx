import { LegacyRef, Dispatch, SetStateAction } from "react";
import { FileValidated } from "@dropzone-ui/react";

import ImportFile from "@/components/ImportFile";
import Results from "@/components/Results";

interface ImportSectionProps {
  label: string;
  disabled: boolean;
  loading: boolean;
  acceptFile: string;
  maxFiles: number;
  textRef: LegacyRef<HTMLTextAreaElement>;
  importFile: FileValidated[];
  setImportFile: Dispatch<SetStateAction<FileValidated[]>>;
  handleSubmit: () => void;
}

const ImportSection = ({ label, disabled, loading, textRef, importFile, acceptFile, maxFiles, setImportFile, handleSubmit }: ImportSectionProps) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <ImportFile height="15rem" label={label} maxFiles={maxFiles} acceptFile={acceptFile} importFile={importFile} setImportFile={setImportFile} />
      <div className="flex flex-row w-full h-44">
        <Results textRef={textRef} />
      </div>
      <button className={`btn btn-primary btn-mid ${loading ? "loading" : ""}`} onClick={handleSubmit} disabled={disabled}>
        Submit
      </button>
    </div>
  );
};

export default ImportSection;
