import { useState, useEffect, useRef } from "react";
import { FileValidated } from "@dropzone-ui/react";

import ImportSection from "./ImportSection";
import Results from "@/components/Results";
import { WalmartTracker } from "@/types/Walmart/trackerType";
import { importWalmartOrdersEDI, importWalmartTracker, downloadWalmartMFT, importWalmartOrdersMFT } from "@/api/customers/WalmartCA";
import socket, { socketListen, clearRef } from "@/libs/socket";

const WalmartImportCA = () => {
  const mftRef = useRef<HTMLTextAreaElement>(null);
  const ediRef = useRef<HTMLTextAreaElement>(null);
  const b2bRef = useRef<HTMLTextAreaElement>(null);
  const trackerRef = useRef<HTMLTextAreaElement>(null);

  const [date, setDate] = useState(new Date());

  const [importEDI, setImportEDI] = useState<FileValidated[]>([]);
  const [dataEDI, setDataEDI] = useState<(string | undefined)[]>([]);
  const [importTracker, setImportTracker] = useState<FileValidated[]>([]);
  const [dataTracker, setDataTracker] = useState<WalmartTracker[]>([]);

  const [loadMFT, setLoadMFT] = useState(false);
  const [loadEDI, setLoadEDI] = useState(false);
  const [loadB2B, setLoadB2B] = useState(false);

  const [disableMFT, setDisableMFT] = useState(false);
  const [disableEDI, setDisableEDI] = useState(true);
  const [disableB2B, setDisableB2B] = useState(false);
  const [disableTracker, setDisableTracker] = useState(true);

  const handleDownloadMFT = async () => {
    setLoadMFT(true);
    setDisableMFT(true);
    try {
      const res = await downloadWalmartMFT(socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoadMFT(false);
    setDisableMFT(false);
  };
  const handleImportMFT = async () => {
    setLoadMFT(true);
    setDisableMFT(true);
    clearRef(mftRef);
    try {
      socketListen("importWalmartOrdersMFT", mftRef);
      const res = await importWalmartOrdersMFT(socket.id);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    socket.off("importWalmartOrdersMFT");
    setLoadMFT(false);
    setDisableMFT(false);
  };
  const handleImportEDI = async () => {
    setLoadEDI(true);
    setDisableEDI(true);
    try {
      clearRef(ediRef);
      socketListen("importWalmartOrdersEDI", ediRef);
      for (const data of dataEDI) {
        const res = await importWalmartOrdersEDI(data, socket.id);
        console.log(res.data);
      }
      socket.off("importWalmartOrdersEDI");
    } catch (err) {
      console.log(err);
    }
    setLoadEDI(false);
    setImportEDI([]);
    setDataEDI([]);
  };

  const handleImportTracker = async () => {
    console.log(dataTracker);
    try {
      const res = await importWalmartTracker(dataTracker);
      console.log(res.data);
      if (trackerRef && trackerRef.current) {
        if (trackerRef.current.value !== "") trackerRef.current.value += `\n`;
        trackerRef.current.value += "Import completed.";
        trackerRef.current.scrollTop = trackerRef.current.scrollHeight;
      }
      if (res.status) setImportTracker([]);
    } catch (err) {
      console.log(err);
      setImportTracker([]);
      if (trackerRef && trackerRef.current) {
        if (trackerRef.current.value !== "") trackerRef.current.value += `\n`;
        trackerRef.current.value += "Import failed.";
        trackerRef.current.scrollTop = trackerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (importEDI.length > 0) {
      const valid = importEDI.every((item) => item.valid === true);
      if (valid) {
        clearRef(ediRef);
        setDisableEDI(false);
        setDataEDI([]);
        for (let i = 0; i < importEDI.length; i++) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setDataEDI((prev) => [...prev, fileReader.result?.toString()]);
          };
          fileReader.readAsBinaryString(importEDI[i].file);
        }
      } else setDisableEDI(true);
    } else setDisableEDI(true);
  }, [importEDI]);

  useEffect(() => {
    if (importTracker.length > 0) {
      setDisableTracker(false);
      setDataTracker([]);
      const parseFile = () => {
        const importFileReader = new FileReader();
        importFileReader.onload = async (e) => {
          const XLSX = await import("xlsx");
          const wb = XLSX.read(e.target?.result, { type: "binary" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(ws, { defval: "" }) as WalmartTracker[];

          const modifiedData = data.map((item) => {
            if (item.hasOwnProperty("Floor or Pallet")) {
              return { ...item, ["Floor or Pallet"]: item["Floor or Pallet"].toUpperCase() };
            }
            return item;
          });

          setDataTracker(modifiedData);
        };
        importFileReader.readAsBinaryString(importTracker[0].file);
      };
      parseFile();
    } else setDisableTracker(true);
  }, [importTracker]);

  return (
    <div className="flex flex-col w-full items-center space-y-4">
      <div className="flex flex-col w-1/2 space-y-2">
        <div className="flex flex-row w-full h-28">
          <Results textRef={mftRef} />
        </div>

        <button type="button" className={`btn btn-primary btn-mid ${loadMFT ? "loading" : ""}`} disabled={disableMFT} onClick={handleDownloadMFT}>
          Download Messages
        </button>
        <button type="button" className={`btn btn-primary btn-mid ${loadMFT ? "loading" : ""}`} disabled={disableMFT} onClick={handleImportMFT}>
          Import Orders
        </button>
      </div>

      <div className="flex flex-col w-1/2">
        <div className="flex divider divider-vertical"></div>
      </div>

      <div className="flex flex-row w-1/2 space-x-2">
        <ImportSection
          label={"EDI Files"}
          disabled={disableEDI}
          loading={loadEDI}
          textRef={ediRef}
          acceptFile={""}
          maxFiles={0}
          importFile={importEDI}
          setImportFile={setImportEDI}
          handleSubmit={handleImportEDI}
        />

        <ImportSection
          label={"Tracker File"}
          disabled={disableTracker}
          loading={false}
          textRef={trackerRef}
          acceptFile={".xlsx"}
          maxFiles={1}
          importFile={importTracker}
          setImportFile={setImportTracker}
          handleSubmit={handleImportTracker}
        />
      </div>
    </div>
  );
};

export default WalmartImportCA;
