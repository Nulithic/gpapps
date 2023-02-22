import { useState, useEffect, useRef, useCallback } from "react";
import { FileValidated } from "@dropzone-ui/react";
import $ from "jquery";
import ImportSection from "./ImportSection";

import { WalmartTracker, HTMLOrder, HTMLOrderAllowancesAndCharges, HTMLItems } from "@/types/walmartType";

const WalmartImport = () => {
  const ediRef = useRef<HTMLTextAreaElement>(null);
  const htmlRef = useRef<HTMLTextAreaElement>(null);
  const trackerRef = useRef<HTMLTextAreaElement>(null);

  const [iframeHTML, setIframeHTML] = useState<(string | undefined)[]>([]);

  const [importEDI, setImportEDI] = useState<FileValidated[]>([]);
  const [dataEDI, setDataEDI] = useState<(string | undefined)[]>([]);
  const [importHTML, setImportHTML] = useState<FileValidated[]>([]);
  const [dataHTML, setDataHTML] = useState<HTMLOrder[]>([]);
  const [importTracker, setImportTracker] = useState<FileValidated[]>([]);
  const [dataTracker, setDataTracker] = useState<WalmartTracker[]>([]);

  const [loadEDI, setLoadEDI] = useState(false);
  const [loadHTML, setLoadHTML] = useState(false);
  const [loadTracker, setLoadTracker] = useState(false);

  const [disableEDI, setDiableEDI] = useState(true);
  const [disableHTML, setDisableHTML] = useState(true);
  const [disableTracker, setDisableTracker] = useState(true);

  const handleSubmitEDI = () => {
    console.log(dataEDI);
  };
  const handleSubmitHTML = () => {
    console.log(dataHTML);
    setImportHTML([]);
    setDataHTML([]);
  };
  const handleSubmitTracker = () => {
    console.log(dataTracker);
  };

  const handleDynamicData = (order: JQuery<HTMLElement>, length: number, title: string) => {
    let data: string = "";
    for (let i = 0; i < length; i++) {
      const th = $("tr", order).find("tr > th").eq(i).text();
      if (title === th) {
        data = $("tr", order).find("tr > td").eq(i).text();
        break;
      }
    }
    return data;
  };
  const handleHtmlData = useCallback((data: any) => {
    const orderList: HTMLOrder[][] = [];
    for (let i = 0; i < data.length; i++) {
      const ediDocOrder = $(`#ediDoc-${i}`).contents().find("#wrapper table.header");
      const ediDocAllowance = $(`#ediDoc-${i}`).contents().find("#wrapper table.tb1 table.detail");
      const ediDocItems = $(`#ediDoc-${i}`).contents().find("#wrapper table.items");
      const orders: HTMLOrder[] = [];

      ediDocOrder.each(function (k) {
        if (k !== 0) {
          const localLength = $("tr td.headerright", this).find("tr > td").length;
          const length = $("tr", this).find("tr > th").length;
          console.log(localLength);
          const order = {
            PONumber: handleDynamicData(ediDocOrder.eq(k), length, "PO Number:"),
            BasePONumber: handleDynamicData(ediDocOrder.eq(k), length, "Base PO Number:"),
            Purpose: handleDynamicData(ediDocOrder.eq(k), length, "Purpose:"),
            OrderType: handleDynamicData(ediDocOrder.eq(k), length, "Order Type:"),
            Currency: handleDynamicData(ediDocOrder.eq(k), length, "Currency:"),
            VendorNumber: handleDynamicData(ediDocOrder.eq(k), length, "Vendor Number:"),
            MerchandiseType: handleDynamicData(ediDocOrder.eq(k), length, "Merchandise Type:"),
            Department: handleDynamicData(ediDocOrder.eq(k), length, "Department:"),
            Division: handleDynamicData(ediDocOrder.eq(k), length, "Division:"),
            DoNotDeliverAfterDate: handleDynamicData(ediDocOrder.eq(k), length, "Do Not Delivery After Date:"),
            PurchaseOrderDate: handleDynamicData(ediDocOrder.eq(k), length, "Purchase Order Date:"),
            ShipNoLaterDate: handleDynamicData(ediDocOrder.eq(k), length, "Ship No Later Date:"),
            ShipNotBeforeDate: handleDynamicData(ediDocOrder.eq(k), length, "Ship Not Before Date:"),
            FOB: handleDynamicData(ediDocOrder.eq(k), length, "FOB:"),
            FOBPoint: handleDynamicData(ediDocOrder.eq(k), length, "FOB Point:"),
            FOBLocation: handleDynamicData(ediDocOrder.eq(k), length, "FOB Location:"),
            RoutingSequence: handleDynamicData(ediDocOrder.eq(k), length, "Routing Sequence:"),
            Carrier: handleDynamicData(ediDocOrder.eq(k), length, "Carrier:"),
            TermsType: handleDynamicData(ediDocOrder.eq(k), length, "Terms Type:"),
            TermsBasisDate: handleDynamicData(ediDocOrder.eq(k), length, "Terms Basis Date:"),
            TermsDiscountPercent: handleDynamicData(ediDocOrder.eq(k), length, "Terms Discount Percent:"),
            TermsDiscountDays: handleDynamicData(ediDocOrder.eq(k), length, "Terms Discount Days:"),
            TermsNetDays: handleDynamicData(ediDocOrder.eq(k), length, "Terms Net Days:"),
            TermsDescription: handleDynamicData(ediDocOrder.eq(k), length, "Terms Description:"),

            BillToLocationID: $("tr td.headerright", this).find("tr > td").eq(0).text(),
            BillToLocationName: $("tr td.headerright", this).find("tr > td").eq(1).text(),
            BillToLocationStreet:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(2).text() : $("tr td.headerright", this).find("tr > td").eq(3).text(),
            BillToLocationCity:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(3).text() : $("tr td.headerright", this).find("tr > td").eq(4).text(),
            BillToLocationCountry:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(4).text() : $("tr td.headerright", this).find("tr > td").eq(5).text(),
            ShipToLocationID:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(5).text() : $("tr td.headerright", this).find("tr > td").eq(6).text(),
            ShipToLocationName:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(6).text() : $("tr td.headerright", this).find("tr > td").eq(7).text(),
            ShipToLocationStreet:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(7).text() : $("tr td.headerright", this).find("tr > td").eq(9).text(),
            ShipToLocationCity:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(8).text() : $("tr td.headerright", this).find("tr > td").eq(10).text(),
            ShipToLocationCountry:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(9).text() : $("tr td.headerright", this).find("tr > td").eq(11).text(),
            SoldToID:
              localLength === 17 ? $("tr td.headerright", this).find("tr > td").eq(15).text() : $("tr td.headerright", this).find("tr > td").eq(17).text(),
            AllowancesAndCharges: [],
            Items: [],
          };

          orders.push(order);
        }
      });

      ediDocAllowance.each(function (k) {
        const allowancesAndChargesList: HTMLOrderAllowancesAndCharges[] = [];

        $("tr", this).each(function (j) {
          if (j !== 0) {
            const allowancesAndCharge = {
              Type: $("td", this).eq(0).text(),
              Code: $("td", this).eq(1).text(),
              Description: $("td", this).eq(2).text(),
              Percent: $("td", this).eq(3).text(),
              Amount: $("td", this).eq(4).text(),
              UnitOfMesure: $("td", this).eq(5).text(),
              Quantity: $("td", this).eq(6).text(),
              Rate: $("td", this).eq(7).text(),
            };

            allowancesAndChargesList.push(allowancesAndCharge);
          }
        });

        orders[k].AllowancesAndCharges = allowancesAndChargesList;
      });

      ediDocItems.each(function (k) {
        const itemsList: HTMLItems[] = [];

        $("tr", this).each(function () {
          if (!$(this).hasClass("headline")) {
            if (!($(this).hasClass("stdline") && $("td", this).hasClass("stdline"))) {
              if ($("td", this).text().startsWith("0")) {
                const item = {
                  LineNumber: $("td", this).eq(0).text(),
                  VendorNumber: $("td", this).eq(1).text(),
                  UPCNumber: $("td", this).eq(2).text(),
                  BuyerNumber: $("td", this).eq(3).text(),
                  Quantity: $("td", this).eq(4).text(),
                  UnitOfMesure: $("td", this).eq(5).text(),
                  UnitPrice: $("td", this).eq(6).text(),
                  CasePack: $("td", this).eq(7).text(),
                  RequestDate: $("td", this).eq(8).text(),
                  ExtendedPrice: $("td", this).eq(9).text(),
                  Description: "",
                  Color: "",
                  Size: "",
                  RetailPrice: "",
                  RetailType: "",
                };

                if ($("td", this).parent().next().find("th").text() === "Description:") {
                  item.Description = $("td", this).parent().next().find("td").eq(1).text();
                }

                if ($("td", this).parent().nextAll().eq(1).find("th").eq(0).text() === "Color:") {
                  item.Color = $("td", this).parent().nextAll().eq(1).find("td").eq(1).text();
                  item.Size = $("td", this).parent().nextAll().eq(1).find("td").eq(2).text();
                } else if ($("td", this).parent().nextAll().eq(1).find("th").eq(0).text() === "Retail Price:") {
                  item.RetailPrice = $("td", this).parent().nextAll().eq(1).find("td").eq(1).text();
                  item.RetailType = $("td", this).parent().nextAll().eq(1).find("td").eq(2).text();
                }

                if ($("td", this).parent().nextAll().eq(2).find("th").eq(0).text() === "Retail Price:") {
                  item.RetailPrice = $("td", this).parent().nextAll().eq(2).find("td").eq(1).text();
                  item.RetailType = $("td", this).parent().nextAll().eq(2).find("td").eq(2).text();
                }

                itemsList.push(item);
              }
            }
          }
        });

        orders[k].Items = itemsList;
      });

      orderList.push(orders);
    }
    setDataHTML(orderList.flat());
  }, []);

  useEffect(() => {
    if (importEDI.length > 0) {
      const valid = importEDI.every((item) => item.valid === true);
      if (valid) {
        setDiableEDI(false);
        setDataEDI([]);
        for (let i = 0; i < importEDI.length; i++) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setDataEDI((prev) => [...prev, fileReader.result?.toString()]);
          };
          fileReader.readAsBinaryString(importEDI[i].file);
        }
      } else setDiableEDI(true);
    } else setDiableEDI(true);
  }, [importEDI]);

  useEffect(() => {
    if (importHTML.length > 0) {
      setLoadHTML(true);
      const valid = importHTML.every((item) => item.valid === true);
      if (valid) {
        setIframeHTML([]);
        for (let i = 0; i < importHTML.length; i++) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            setIframeHTML((prev) => [...prev, fileReader.result?.toString()]);
          };
          fileReader.readAsBinaryString(importHTML[i].file);
        }
      } else {
        setDisableHTML(true);
        setLoadHTML(false);
      }
    } else {
      setDisableHTML(true);
      setLoadHTML(false);
    }
  }, [importHTML]);

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
          const data = XLSX.utils.sheet_to_json(ws, { defval: "" }) as any[];
          setDataTracker(data);
        };
        importFileReader.readAsBinaryString(importTracker[0].file);
      };
      parseFile();
    } else setDisableTracker(true);
  }, [importTracker]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (iframeHTML.length > 0) {
        setDisableHTML(false);
        setLoadHTML(false);
        handleHtmlData(iframeHTML);
      }
    }, 100);

    return () => {
      setDisableHTML(true);
      setLoadHTML(true);
      clearTimeout(timeout);
    };
  }, [iframeHTML, handleHtmlData]);

  return (
    <div className="flex flex-col w-full items-center space-y-4">
      <div className="flex flex-row w-full space-x-2">
        <ImportSection
          label={"EDI Files"}
          disabled={disableEDI}
          loading={loadEDI}
          textRef={ediRef}
          acceptFile={""}
          maxFiles={0}
          importFile={importEDI}
          setImportFile={setImportEDI}
          handleSubmit={handleSubmitEDI}
        />
        <ImportSection
          label={"HTML Files"}
          disabled={disableHTML}
          loading={loadHTML}
          textRef={htmlRef}
          acceptFile={".html"}
          maxFiles={0}
          importFile={importHTML}
          setImportFile={setImportHTML}
          handleSubmit={handleSubmitHTML}
        />
        <ImportSection
          label={"Tracker File"}
          disabled={disableTracker}
          loading={loadTracker}
          textRef={trackerRef}
          acceptFile={".xlsx"}
          maxFiles={1}
          importFile={importTracker}
          setImportFile={setImportTracker}
          handleSubmit={handleSubmitTracker}
        />
      </div>
      <div className="hidden">{iframeHTML ? iframeHTML.map((item, i) => <iframe key={i} title="htmlData" id={`ediDoc-${i}`} srcDoc={item} />) : null}</div>
    </div>
  );
};

export default WalmartImport;
