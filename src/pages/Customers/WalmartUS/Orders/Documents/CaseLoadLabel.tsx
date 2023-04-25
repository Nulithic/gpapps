import { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

import { getWalmartUSCaseSizes } from "@/api/customers/WalmartUS";
import WalmartOrder from "@/types/WalmartUS/OrderType";
import { CaseSizes } from "@/types/WalmartUS/types";

interface PackingListProps {
  selection: WalmartOrder[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: "34px",
    paddingVertical: "30px",
  },

  topContainer: {
    border: "1 solid black",
    marginBottom: "15px",
  },

  addressContainer: {
    flexDirection: "row",
    width: "100%",
    borderBottom: "1 solid black",
  },

  shipFrom: {
    width: "40%",
    borderRight: "1 solid black",
    padding: "5px",
  },
  shipFromTtile: {
    fontSize: "10px",
    paddingBottom: "7px",
  },
  shipFromAddress: {
    fontSize: "11px",
    paddingBottom: "5px",
  },

  shipTo: {
    width: "60%",
    padding: "5px",
  },
  shipToTtile: {
    fontSize: "10px",
    paddingBottom: "7px",
  },
  shipToAddress: {
    fontFamily: "Helvetica-Bold",
    fontSize: "11px",
    paddingBottom: "5px",
  },

  infoContainer: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },

  infoColumn: {
    flexDirection: "column",
    height: "100%",
    padding: "5px",
    paddingRight: 40,
  },

  infoTitle: {
    fontSize: "16px",
  },
  infoText: {
    fontFamily: "Helvetica-Bold",
    fontSize: "16px",
  },

  bottomContainer: {
    border: "1 solid black",
  },
  itemContainer: {
    flexDirection: "row",
    width: "100%",
  },
  itemHeaderRow: { width: "33%", alignItems: "center", borderRight: "1 solid black", padding: "5px" },
  itemHeaderRow2: { width: "33%", alignItems: "center", padding: "5px" },
  itemHeadertext: { fontFamily: "Helvetica-Bold", fontSize: "16px" },

  itemRowContainer: {
    flexDirection: "row",
    width: "100%",
    borderTop: "1 solid black",
  },
  itemRow: { width: "33%", alignItems: "center", borderRight: "1 solid black", padding: "3px" },
  itemRow2: { width: "33%", alignItems: "center", padding: "3px" },
  itemRowText: { fontSize: "12px" },
});

// Create Document Component
export const CaseLoadLabel = ({ selection }: PackingListProps) => {
  const [caseSizes, setCaseSizes] = useState<CaseSizes[]>([]);

  const list = [];

  for (let i = 0; i < selection.length; i++) {
    for (let k = 0; k < selection[i].baselineItemDataPO1Loop.length; k++) {
      const qty = selection[i].baselineItemDataPO1Loop[k].baselineItemDataPO1.quantity02;
      const walmartItem = caseSizes.find((item) => item.walmartItem === selection[i].baselineItemDataPO1Loop[k].baselineItemDataPO1.productServiceId07);
      const caseSize = parseInt(walmartItem?.caseSize!!);

      const amount = qty / caseSize;

      const label = {
        purchaseOrderNumber: selection[i].purchaseOrderNumber,
        buyingParty: selection[i].buyingParty,
        buyingPartyStreet: selection[i].buyingPartyStreet,
        buyingPartyAddress: `${selection[i].buyingPartyCity}, ${selection[i].buyingPartyStateOrProvince} ${selection[i].buyingPartyPostalCode}`,
        distributionCenterNumber: selection[i].distributionCenterNumber,
        purchaseOrderType: selection[i].purchaseOrderType,
        departmentNumber: selection[i].departmentNumber,
        WMIT: selection[i].baselineItemDataPO1Loop[k].baselineItemDataPO1.productServiceId07,
        VSN: selection[i].baselineItemDataPO1Loop[k].baselineItemDataPO1.productServiceId11,
      };

      for (let x = 0; x < amount; x++) list.push(label);
    }
  }

  console.log(list);

  useEffect(() => {
    (async () => {
      const response = await getWalmartUSCaseSizes();
      setCaseSizes(response.data);
    })();
  }, []);

  return (
    <Document>
      {list.map((item) => (
        <Page key={item.purchaseOrderNumber} size={[288, 432]} orientation="landscape" style={styles.page}>
          <View style={styles.topContainer}>
            <View style={styles.addressContainer}>
              <View style={styles.shipFrom}>
                <Text style={styles.shipFromTtile}>Ship From:</Text>
                <Text style={styles.shipFromAddress}>Green Project Inc.</Text>
                <Text style={styles.shipFromAddress}>815 Echelon Ct.</Text>
                <Text style={styles.shipFromAddress}>City of Industry, CA 91744</Text>
              </View>
              <View style={styles.shipTo}>
                <Text style={styles.shipToTtile}>Ship To:</Text>
                <Text style={styles.shipToAddress}>{item.buyingParty}</Text>
                <Text style={styles.shipToAddress}>{item.buyingPartyStreet}</Text>
                <Text style={styles.shipToAddress}>{item.buyingPartyAddress}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={{ flexDirection: "row", paddingTop: 10 }}>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>DC#</Text>
                  <Text style={styles.infoText}>{item.distributionCenterNumber}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>TYPE</Text>
                  <Text style={styles.infoText}>{item.purchaseOrderType}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>DEPT</Text>
                  <Text style={styles.infoText}>{item.departmentNumber}</Text>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={styles.infoTitle}>ORDER#</Text>
                  <Text style={styles.infoText}>{item.purchaseOrderNumber}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "column", justifyContent: "space-evenly", paddingTop: 10 }}>
                <View style={{ flexDirection: "row", paddingLeft: 5, paddingBottom: 20 }}>
                  <Text style={styles.infoTitle}>WMIT:</Text>
                  <Text style={styles.infoText}>{item.WMIT}</Text>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: 5 }}>
                  <Text style={styles.infoTitle}>VSN#:</Text>
                  <Text style={styles.infoText}>{item.VSN}</Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default CaseLoadLabel;
