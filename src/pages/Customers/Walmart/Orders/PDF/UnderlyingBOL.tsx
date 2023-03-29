import { Page, Text, View, Document, StyleSheet, Canvas, Image, Svg, G, Polygon, Path } from "@react-pdf/renderer";

import WalmartOrder from "@/types/walmart/orderType";

interface UnderlyingBOLProps {
  selection: WalmartOrder[];
}

// Create styles
const styles = StyleSheet.create({
  page: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: "10px",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    paddingBottom: "3px",
  },

  topContainer: {
    flexDirection: "row",
    borderTop: "1 solid black",
    borderLeft: "1 solid black",
    marginBottom: "15px",
  },

  shipTitleBox: {
    backgroundColor: "black",
    paddingLeft: "5px",
  },
  shipTtile: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    color: "white",
    paddingBottom: "2px",
    textDecoration: "underline",
  },
  shipBox: {
    paddingHorizontal: "5px",
    paddingVertical: "2px",
    borderBottom: "1 solid black",
    borderRight: "1 solid black",
  },

  infoContainer: {
    flexDirection: "row",
    width: "100%",
  },

  infoColumn: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "70px",
    width: "50%",
    padding: "5px",
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
export const UnderlyingBOL = ({ selection }: UnderlyingBOLProps) => (
  <Document>
    {selection.map((item) => (
      <Page key={item.purchaseOrderNumber} size="LETTER" style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>Bill of Lading</Text>
        </View>
        <View style={styles.topContainer}>
          <View style={{ flexDirection: "column", width: "100%" }}>
            <View style={styles.shipTitleBox}>
              <Text style={styles.shipTtile}>Ship From:</Text>
            </View>
            <View style={styles.shipBox}>
              <Text style={{ fontSize: 14 }}>Green Project Inc.</Text>
              <Text style={{ fontSize: 14 }}>815 Echelon Ct.</Text>
              <Text style={{ fontSize: 14 }}>City of Industry, CA 91744</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>SID#</Text>

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>FOB</Text>

                  {false ? (
                    <Svg width="20" height="20" viewBox="0 0 512 512">
                      <Path
                        d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
                        fill="#212121"
                      />
                    </Svg>
                  ) : (
                    <Svg width="20" height="20" viewBox="0 0 512 512">
                      <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                    </Svg>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.shipTitleBox}>
              <Text style={styles.shipTtile}>Ship To:</Text>
            </View>
            <View style={styles.shipBox}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{item.buyingParty}</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>{item.buyingPartyStreet}</Text>
              <Text
                style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}
              >{`${item.buyingPartyCity}, ${item.buyingPartyStateOrProvince} ${item.buyingPartyPostalCode}`}</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>CID#</Text>

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>FOB</Text>

                  {false ? (
                    <Svg width="20" height="20" viewBox="0 0 512 512">
                      <Path
                        d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
                        fill="#212121"
                      />
                    </Svg>
                  ) : (
                    <Svg width="20" height="20" viewBox="0 0 512 512">
                      <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                    </Svg>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.shipTitleBox}>
              <Text style={styles.shipTtile}>Third Party Freight Charges Bill To:</Text>
            </View>
            <View style={styles.shipBox}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>WALMART C/O US BANK SYNCADA</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>PO BOX 3001</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>NAPERVILLE, IL 60566</Text>
            </View>
            <View style={styles.shipBox}>
              <Text style={{ fontSize: 10 }}>Freight Charge Terms (Prepaid unless marked otherwise):</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>Prepaid</Text>
                  {item.fobMethodOfPayment === "PP" ? (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path
                        d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
                        fill="#212121"
                      />
                    </Svg>
                  ) : (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                    </Svg>
                  )}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>Collect</Text>
                  {item.fobMethodOfPayment === "CC" ? (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path
                        d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
                        fill="#212121"
                      />
                    </Svg>
                  ) : (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                    </Svg>
                  )}
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>3rd Party</Text>
                  {false ? (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path
                        d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
                        fill="#212121"
                      />
                    </Svg>
                  ) : (
                    <Svg width="16" height="16" viewBox="0 0 512 512">
                      <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                    </Svg>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.shipBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Svg width="16" height="16" viewBox="0 0 512 512">
                  <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
                </Svg>
                <Text style={{ fontSize: 9 }}>Master Bill of Lading: with attached Underlying Bills of Lading</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "100%" }}>
            <View style={styles.shipBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>BOL#: {item.billOfLading}</Text>
              </View>
            </View>

            <View style={styles.shipBox}>
              <View style={{ flexDirection: "column", justifyContent: "space-evenly", height: 200 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 16 }}>
                  Carrier Name: <Text style={{ fontFamily: "Helvetica-Bold", fontSize: item.carrierName.length > 13 ? 10 : 16 }}>{item.carrierName}</Text>
                </Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>SCAC: {item.carrierSCAC}</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>MABD: {item.mustArriveByDate}</Text>
              </View>
            </View>

            <View style={styles.shipBox}>
              <View style={{ flexDirection: "column", height: 64 }}>
                <Text style={{ fontSize: 12 }}>Special Instructions:</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>
              PO#: <Text style={styles.infoText}>{item.purchaseOrderNumber}</Text>
            </Text>
            <Text style={styles.infoTitle}>
              PO Type: <Text style={styles.infoText}>{item.purchaseOrderType}</Text>
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoTitle}>
              Dept#: <Text style={styles.infoText}>{item.departmentNumber}</Text>
            </Text>
            <Text style={styles.infoTitle}>
              Total Cases: <Text style={styles.infoText}>{item.numberOfCartons}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.itemContainer}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemHeadertext}>Walmart Item Number</Text>
            </View>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemHeadertext}>Vendor Item Number</Text>
            </View>
            <View style={styles.itemHeaderRow2}>
              <Text style={styles.itemHeadertext}>Case Count</Text>
            </View>
          </View>

          {item.baselineItemDataPO1Loop.map((line) => (
            <View key={line.baselineItemDataPO1.assignedIdentification01} style={styles.itemRowContainer}>
              <View style={styles.itemRow}>
                <Text style={styles.itemRowText}>{line.baselineItemDataPO1.productServiceId07}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemRowText}>{line.baselineItemDataPO1.productServiceId11}</Text>
              </View>
              <View style={styles.itemRow2}>
                <Text style={styles.itemRowText}>{line.baselineItemDataPO1.quantity02 / 12}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    ))}
  </Document>
);

export default UnderlyingBOL;
