import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from "react";
import AutoComplete from "@/components/AutoComplete";

import { getDearLocations, getDearProducts } from "@/services/dearService";
import { DearLocations, DearProducts } from "@/types/dbType";

interface AddLineProps {
  handleAddData: (data: any) => void;
}

const AddLine = ({ handleAddData }: AddLineProps) => {
  const [fromLocation, setFromLocation] = useState([]);
  const [toLocation, setToLocation] = useState([]);
  const [products, setProducts] = useState([]);

  const [addLineData, setAddLineData] = useState({
    fromLocation: "",
    fromLocationData: {},
    toLocation: "",
    toLocationData: {},
    sku: "",
    transferQty: "",
    reference: "",
  });

  const handleFromLocation = (value: any, data: any) => {
    setAddLineData({ ...addLineData, fromLocation: value, fromLocationData: data });
  };
  const handleToLocation = (value: any, data: any) => {
    setAddLineData({ ...addLineData, toLocation: value, toLocationData: data });
  };
  const handleToSKU = (value: any, data: any) => {
    setAddLineData({ ...addLineData, sku: value });
  };
  const handleToNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setAddLineData({ ...addLineData, transferQty: event.target.value });
  };
  const handleToReference = (event: ChangeEvent<HTMLInputElement>) => {
    setAddLineData({ ...addLineData, reference: event.target.value });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getDearLocations();
        const list = res.data.map((item: DearLocations) => ({ ...item, name: item.location, value: item.location }));
        setFromLocation(list);
        setToLocation(list);
      } catch (err) {
        console.log(err);
      }
    })();

    (async () => {
      try {
        const res = await getDearProducts();
        const list = res.data.map((item: DearProducts) => ({ ...item, name: item.sku, value: item.sku }));
        setProducts(list);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-items-stretch items-center space-x-2">
        <AutoComplete options={fromLocation} value={addLineData.fromLocation} onChange={handleFromLocation} placeholder="From Location" />
        <AutoComplete options={toLocation} value={addLineData.toLocation} onChange={handleToLocation} placeholder="To Location" />
        <AutoComplete options={products} value={addLineData.sku} onChange={handleToSKU} placeholder="SKU" />
        <input
          type="number"
          className="input input-mid input-bordered text-base placeholder:font-semibold"
          value={addLineData.transferQty}
          onChange={handleToNumber}
          placeholder="Transfer Quantity"
        />
        <input
          type="text"
          className="input input-mid input-bordered text-base placeholder:font-semibold"
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
