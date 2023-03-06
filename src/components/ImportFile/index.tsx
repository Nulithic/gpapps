import { Dispatch, SetStateAction } from "react";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";

import "./ImportFile.css";

interface ImportFileProps {
  label: string;
  height?: string;
  maxFiles: number;
  acceptFile: string;
  importFile: FileValidated[];
  setImportFile: Dispatch<SetStateAction<FileValidated[]>>;
}

const ImportFile = ({ height, label, maxFiles, acceptFile, importFile, setImportFile }: ImportFileProps) => {
  const updateFile = (e: FileValidated[]) => {
    setImportFile(e);
  };

  const removeImportFile = (id: string | number | undefined) => {
    setImportFile(importFile.filter((x) => x.id !== id));
  };

  return (
    <Dropzone
      minHeight={height}
      maxHeight={height}
      onChange={updateFile}
      value={importFile}
      accept={acceptFile}
      maxFiles={maxFiles}
      label={label}
      header={false}
      footer={false}
    >
      {importFile.length > 0 && importFile.map((file) => <FileItem {...file} onDelete={removeImportFile} key={file.id} alwaysActive />)}
    </Dropzone>
  );
};

export default ImportFile;
