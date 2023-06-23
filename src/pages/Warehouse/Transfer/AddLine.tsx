import { useState, ChangeEvent } from "react";
import AutoComplete from "@/components/AutoComplete";

import { DearLocations, DearProducts } from "@/types/dearType";

interface AddLineProps {
  locations: DearLocations[];
  products: DearProducts[];
  handleAddData: (data: any) => void;
}

const AddLine = ({ locations, products, handleAddData }: AddLineProps) => {
  const [addLineData, setAddLineData] = useState({
    fromLocation: "",
    fromLocationData: "",
    toLocation: "",
    toLocationData: "",
    sku: "",
    skuData: "",
    transferQty: "",
    reference: "",
  });

  const handleFromLocation = (value: any) => {
    setAddLineData({ ...addLineData, fromLocation: value ? value.label : "", fromLocationData: value });
  };
  const handleToLocation = (value: any) => {
    setAddLineData({ ...addLineData, toLocation: value ? value.label : "", toLocationData: value });
  };
  const handleToSKU = (value: any) => {
    setAddLineData({ ...addLineData, sku: value ? value.label : "", skuData: value });
  };
  const handleToNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setAddLineData({ ...addLineData, transferQty: event.target.value });
  };
  const handleToReference = (event: ChangeEvent<HTMLInputElement>) => {
    setAddLineData({ ...addLineData, reference: event.target.value });
  };

  return (
    <>
      <div className="flex flex-row justify-items-stretch items-center space-x-2">
        <AutoComplete options={locations} value={addLineData.fromLocationData} onChange={handleFromLocation} placeholder="From Location" />
        <AutoComplete options={locations} value={addLineData.toLocationData} onChange={handleToLocation} placeholder="To Location" />
        <AutoComplete options={products} value={addLineData.skuData} onChange={handleToSKU} placeholder="SKU" />

        <input
          type="number"
          className="input input-mid input-bordered text-sm placeholder:font-semibold"
          value={addLineData.transferQty}
          onChange={handleToNumber}
          placeholder="Transfer Quantity"
        />
        <input
          type="text"
          className="input input-mid input-bordered text-sm placeholder:font-semibold"
          value={addLineData.reference}
          onChange={handleToReference}
          placeholder="Reference"
        />
        <button className="btn btn-mid" onClick={() => handleAddData(addLineData)}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddLine;
