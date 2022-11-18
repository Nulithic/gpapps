import { useState, useEffect } from "react";

import ActionBar from "./ActionBar";
import AddLine from "./AddLine";
import TransferTable from "./TransferTable";
const Transfer = () => {
  const [date, setDate] = useState(new Date());

  const [addLineData, setAddLineData] = useState({
    fromLocation: "",
    toLocation: "",
    SKU: "",
    transferQty: "",
    reference: "",
  });

  console.log(addLineData);

  return (
    <div className="flex flex-col w-full space-y-4">
      <ActionBar date={date} setDate={setDate} />
      <AddLine addLineData={addLineData} setAddLineData={setAddLineData} />
      <TransferTable />
    </div>
  );
};

export default Transfer;
