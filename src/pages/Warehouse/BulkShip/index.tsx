import { useState, useEffect } from "react";
import { FileValidated } from "@dropzone-ui/react";

import ImportFile from "@/components/ImportFile";

const BulkShip = () => {
  const [importFile, setImportFile] = useState<Array<FileValidated>>([]);

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <ImportFile label="Drop File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
      <div className="flex flex-row space-x-2">
        <button className="btn btn-mid">Template</button>
        <button className="btn btn-mid">Submit</button>
      </div>
    </div>
  );
};

export default BulkShip;
