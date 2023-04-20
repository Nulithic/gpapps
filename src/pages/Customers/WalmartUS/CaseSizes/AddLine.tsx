import { useState, ChangeEvent } from "react";

interface AddLineProps {
  handleAddData: (data: any) => void;
}

interface AddLineData {
  [key: string]: any;
}

const AddLine = ({ handleAddData }: AddLineProps) => {
  const [addLineData, setAddLineData] = useState<AddLineData>({
    walmartItem: "",
    itemID: "",
    vsn: "",
    sku: "",
    description: "",
    caseSize: "",
  });

  const checkEmpty = () => {
    for (let key in addLineData) {
      if (addLineData[key] === "") return true;
    }
    return false;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddLineData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-row items-center space-x-2">
        <input
          type="text"
          name="walmartItem"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.walmartItem}
          onChange={handleInputChange}
          placeholder="Walmart Item"
        />
        <input
          type="text"
          name="itemID"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.itemID}
          onChange={handleInputChange}
          placeholder="Item ID"
        />
        <input
          type="text"
          name="vsn"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.vsn}
          onChange={handleInputChange}
          placeholder="VSN"
        />
        <input
          type="text"
          name="sku"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.sku}
          onChange={handleInputChange}
          placeholder="SKU"
        />
        <input
          type="text"
          name="description"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <input
          type="number"
          name="caseSize"
          className="input input-mid input-bordered text-sm placeholder:font-semibold w-full"
          value={addLineData.caseSize}
          onChange={handleInputChange}
          placeholder="Case Size"
        />
        <button className="btn btn-mid" onClick={() => handleAddData(addLineData)} disabled={checkEmpty()}>
          Add
        </button>
      </div>
    </>
  );
};

export default AddLine;
