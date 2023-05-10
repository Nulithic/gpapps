import { useState, useEffect, useRef } from "react";
import { FileValidated } from "@dropzone-ui/react";

import socket, { socketListen, socketListenSaleOrder, socketListenSaleOrderLine } from "@/libs/socket";
import ImportFile from "@/components/ImportFile";
import Results from "@/components/Results";
import { postHSNImport } from "@/api/customers/HSN";

const Import = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [importFile, setImportFile] = useState<Array<FileValidated>>([]);
  const [importData, setImportData] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(false);

  const handleHSNImport = async () => {
    try {
      setLoading(true);
      socketListen("postHSNImport", textRef);
      socketListenSaleOrder("postDearSaleOrderAPI", textRef);
      socketListenSaleOrderLine("postDearSaleOrderLinesAPI", textRef);

      const res = await postHSNImport(importData, socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    socket.off("postDearSaleOrderAPI");
    socket.off("postDearSaleOrderLinesAPI");
    setLoading(false);
    setImportFile([]);
  };

  useEffect(() => {
    if (importFile.length > 0) {
      setImportData([]);
      const parseFile = () => {
        const importFileReader = new FileReader();
        importFileReader.onload = async (e) => {
          const XLSX = await import("xlsx");
          const wb = XLSX.read(e.target?.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { defval: "" }) as any[];
          setImportData(data);
        };
        importFileReader.readAsBinaryString(importFile[0].file);
      };
      parseFile();
    }
  }, [importFile]);

  return (
    <div className="flex flex-col w-2/5 items-center space-y-4">
      <p>View/Print Reports &gt; Order Processing &gt; Open Orders </p>
      <div className="flex flex-col w-full space-y-2">
        <ImportFile label="Drop File" maxFiles={1} acceptFile=".xls" importFile={importFile} setImportFile={setImportFile} />
        <div className="flex flex-row w-full h-56">
          <Results textRef={textRef} />
        </div>
      </div>

      {loading ? (
        <progress className="progress progress-secondary w-56"></progress>
      ) : (
        <div className="flex flex-row w-full justify-center space-x-4">
          <button className="btn btn-primary btn-mid" onClick={handleHSNImport}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Import;
