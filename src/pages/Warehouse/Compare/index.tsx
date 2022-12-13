import { useState, useEffect } from "react";
import { FileValidated } from "@dropzone-ui/react";

import ImportFile from "@/components/ImportFile";

const Compare = () => {
  const [importFile, setImportFile] = useState<Array<FileValidated>>([]);

  return (
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <select className="select select-bordered select-mid w-full">
        <option>Han Solo</option>
        <option>Greedo</option>
        <option>Han Solo</option>
        <option>Greedo</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <ImportFile label="Drop File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
      <div className="flex flex-row space-x-2">
        <button className="btn btn-mid">Template</button>
        <button className="btn btn-mid">Submit</button>
      </div>
    </div>
  );
};

export default Compare;
