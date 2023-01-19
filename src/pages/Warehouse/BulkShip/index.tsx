import { useState, useEffect, useRef, LegacyRef } from "react";
import { FileValidated } from "@dropzone-ui/react";
import download from "downloadjs";

import socket from "@/libs/socket";
import ImportFile from "@/components/ImportFile";
import { getBulkShipTemplate, postBulkShip } from "@/services/warehouseService";
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
      socket.on("getDearSaleOrderAPI", (args) => {
        if (textRef && textRef.current) {
          textRef.current.value += `${args}\n`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      });
      socket.on("postDearSaleFulfilmentShipAPI", (args) => {
        if (textRef && textRef.current) {
          textRef.current.value += `${args}\n`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      });

      const res = await postBulkShip(importData, socket.id);
      console.log(res.data);

      if (res.status == 200) {
        socket.off("getDearSaleOrderAPI");
        socket.off("postDearSaleFulfilmentShipAPI");
        setLoading(false);
        setImportFile([]);
      }
    } catch (err) {
      socket.off("getDearSaleOrderAPI");
      socket.off("postDearSaleFulfilmentShipAPI");
      setLoading(false);
      setImportFile([]);
      console.log(err);
    }
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
    <div className="flex flex-col w-1/2 items-center space-y-4">
      <div className="flex flex-row w-full space-x-4">
        <ImportFile label="Drop File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
        <Results textRef={textRef} />
      </div>

      {loading ? (
        <progress className="progress progress-secondary w-56"></progress>
      ) : (
        <div className="flex flex-row w-full space-x-4">
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
