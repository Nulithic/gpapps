import { useState, useEffect, useRef } from "react";
import { FileValidated } from "@dropzone-ui/react";
import toast from "react-hot-toast";
import download from "downloadjs";

import ImportFile from "@/components/ImportFile";
import Results from "@/components/Results";
import { DearInventory, DearLocations, DearProducts } from "@/types/dbType";
import { getTransferTemplate } from "@/api/warehouse";

interface TransferData {
  [key: string]: any;
  fromLocation: string;
  fromLocationData: DearLocations;
  toLocation: string;
  toLocationData: DearLocations;
  sku: string;
  skuData: any;
  transferQty: string;
  reference: string;
}

interface ImportData {
  "From Location": string;
  "From Bin": string;
  "To Location": string;
  "To Bin": string;
  Product: string;
  Quantity: number;
  Reference: string;
}

interface ProcessDialogProps {
  inventory: DearInventory[];
  locations: DearLocations[];
  products: DearProducts[];
  handleImport: (data: TransferData[]) => void;
}

const ImportDialog = ({ inventory, locations, products, handleImport }: ProcessDialogProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [importFile, setImportFile] = useState<FileValidated[]>([]);
  const [importData, setImportData] = useState<ImportData[]>([]);

  const [showError, setShowError] = useState(false);

  const clearDialog = () => {
    setImportFile([]);
    setImportData([]);
    setShowError(false);
    if (textRef && textRef.current) {
      if (textRef.current.value !== "") textRef.current.value += `\n`;
      textRef.current.value = "";
    }
  };

  const handleImportFile = () => {
    let count = 0;
    const transferData = [];

    for (let i = 0; i < importData.length; i++) {
      const fromLocation =
        importData[i]["From Bin"] === "" ? importData[i]["From Location"] : `${importData[i]["From Location"]}: ${importData[i]["From Bin"]}`;
      const toLocation = importData[i]["To Bin"] === "" ? importData[i]["To Location"] : `${importData[i]["To Location"]}: ${importData[i]["To Bin"]}`;

      const checkToLocation = locations.some((item) => item.location === toLocation);
      const skuInLocation = inventory.some((item) => item.location === fromLocation && item.sku === importData[i].Product);
      const skuInStock = inventory.some(
        (item) => item.location === fromLocation && item.sku === importData[i].Product && item.available >= importData[i].Quantity
      );

      if (fromLocation === toLocation) {
        count++;
        if (textRef && textRef.current) {
          if (textRef.current.value !== "") textRef.current.value += `\n`;
          textRef.current.value += `Error in line ${i + 2} - ${toLocation} was not found in To Location.`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
        continue;
      }

      if (!checkToLocation) {
        count++;
        if (textRef && textRef.current) {
          if (textRef.current.value !== "") textRef.current.value += `\n`;
          textRef.current.value += `Error in line ${i + 2} - ${toLocation} was not found in To Location.`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
        continue;
      }

      if (!skuInLocation) {
        count++;
        if (textRef && textRef.current) {
          if (textRef.current.value !== "") textRef.current.value += `\n`;
          textRef.current.value += `Error in line ${i + 2} - SKU not found in location: ${fromLocation}`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
        continue;
      }

      if (!skuInStock) {
        count++;
        if (textRef && textRef.current) {
          if (textRef.current.value !== "") textRef.current.value += `\n`;
          textRef.current.value += `Error in line ${i + 2} - Quantity not available in location: ${fromLocation}`;
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
        continue;
      }

      if (count === 0) {
        const data = {
          fromLocation: fromLocation,
          fromLocationData: locations.find((item) => item.location === fromLocation)!!,
          toLocation: toLocation,
          toLocationData: locations.find((item) => item.location === toLocation)!!,
          sku: importData[i].Product,
          skuData: products.find((item) => item.sku === importData[i].Product)!!,
          transferQty: importData[i].Quantity.toString(),
          reference: importData[i].Reference,
        };
        transferData.push(data);
      }
    }

    if (count === 0) {
      const check = document.getElementById("importDialog");
      if (check) (check as HTMLInputElement).checked = false;
      handleImport(transferData);
      setImportFile([]);
      clearDialog();
    } else setShowError(true);
  };

  const handleTemplateFile = async () => {
    try {
      const res = await getTransferTemplate();
      download(new Blob([res.data]), "TransferTemplate.xlsx");
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
    <>
      <input type="checkbox" id="importDialog" className="modal-toggle" />
      <div className="modal !mt-0">
        <div className={`modal-box ${showError ? "max-w-5xl" : "max-w-xl"}`}>
          <h3 className="font-bold text-lg pb-4">Import File</h3>
          <div className="flex flex-row space-x-2">
            <div className={showError ? "w-1/2" : "w-full"}>
              <ImportFile label="Transfer File" maxFiles={1} acceptFile=".xlsx" importFile={importFile} setImportFile={setImportFile} />
            </div>
            <div className={showError ? "flex w-1/2 items-stretch" : "hidden"}>
              <Results textRef={textRef} />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="modal-action justify-start">
              <label className="btn btn-mid btn-primary" onClick={handleTemplateFile}>
                Template
              </label>
            </div>
            <div className="modal-action">
              <label className="btn btn-mid btn-error" htmlFor="importDialog" onClick={clearDialog}>
                Cancel
              </label>
              <label className="btn btn-mid btn-secondary" onClick={handleImportFile}>
                Import
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportDialog;
