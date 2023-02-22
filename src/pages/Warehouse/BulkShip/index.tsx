import { useState, useEffect, useRef } from "react";
import { FileValidated } from "@dropzone-ui/react";
import download from "downloadjs";

import socket, { socketListen } from "@/libs/socket";
import ImportFile from "@/components/ImportFile";
import { getBulkShipTemplate, postBulkShip } from "@/api/warehouse";
import Results from "@/components/Results";

interface BulkShip {
  "SO Number": string;
  "PO Number": number;
  "Tracking Number": string;
  Carrier: string;
  "Ship Date": number;
}

const BulkShip = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [importFile, setImportFile] = useState<Array<FileValidated>>([]);
  const [importData, setImportData] = useState<Array<any>>([]);

  const [loading, setLoading] = useState(false);

  const handleBulkShip = async () => {
    try {
      setLoading(true);
      socketListen("getDearSaleOrderAPI", textRef);
      socketListen("postDearSaleFulfilmentShipAPI", textRef);

      const res = await postBulkShip(importData, socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    socket.off("getDearSaleOrderAPI");
    socket.off("postDearSaleFulfilmentShipAPI");
    setLoading(false);
    setImportFile([]);
  };

  const downloadTemplate = async () => {
    try {
      const res = await getBulkShipTemplate();
      download(new Blob([res.data]), "BulkShipTemplate.xlsx");
    } catch (err) {
      console.log(err);
    }
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
      <div className="flex flex-col w-full space-y-2">
        <ImportFile label="Drop File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
        <div className="flex flex-row w-full h-56">
          <Results textRef={textRef} />
        </div>
      </div>

      {loading ? (
        <progress className="progress progress-secondary w-56"></progress>
      ) : (
        <div className="flex flex-row w-full justify-center space-x-4">
          <button className="btn btn-mid" onClick={downloadTemplate}>
            Template
          </button>
          <button className="btn btn-primary btn-mid" onClick={handleBulkShip}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkShip;
