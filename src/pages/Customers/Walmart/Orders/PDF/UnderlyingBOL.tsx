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

  infoTitleBox: {
    flexDirection: "row",
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
  },

  itemHeadertext: { fontSize: "12px" },
  itemRowText: { fontSize: "10px" },
});

// Create Document Component
export const UnderlyingBOL = ({ selection }: UnderlyingBOLProps) => {
  //==========Group by DC Number==========
  const result = selection.reduce((r, a) => {
    r[a.distributionCenterNumber] = r[a.distributionCenterNumber] || [];
    r[a.distributionCenterNumber].push(a);
    return r;
  }, Object.create(null));

  const group = Object.entries(result).map((value) => value[1]) as any[][];
  //======================================

  //===========Group by Address===========
  const groupByAddressKey = selection.reduce((r, a) => {
    r[a.buyingPartyStreet2] = r[a.buyingPartyStreet2] || [];
    r[a.buyingPartyStreet2].push(a);
    return r;
  }, Object.create(null));

  const groupByAddress = Object.entries(groupByAddressKey).map((item) => item[1]) as any[][];
  //======================================

  //==============Dupe Check==============
  const valueArr = (arr: any[]) => {
    return arr.map((item: any) => item.distributionCenterNumber);
  };

  const dupeCheck = (arr: any[]) => {
    if (arr.length > 1) {
      return valueArr(arr).every((item) => item === valueArr(arr)[0]);
    } else return true;
  };

  const dupeList = groupByAddress.map((item) => dupeCheck(item));

  const checkList = groupByAddress.filter((item, index) => {
    if (!dupeList[index]) return item;
    return null;
  });

  const dataCheck = (list: any[][]) => {
    return list.map((item: any[]) =>
      item.map((data: any) => ({
        distributionCenterNumber: data.distributionCenterNumber,
        purchaseOrderNumber: data.purchaseOrderNumber,
        buyingPartyStreet2: data.buyingPartyStreet2,
      }))
    );
  };

  const userCheck = dataCheck(checkList);
  //======================================

  console.log(userCheck);
  console.log(group);
  console.log(groupByAddress);

  return (
    <Document>
      {selection.map((item) => (
        <Page key={item.purchaseOrderNumber} size="LETTER" style={styles.page}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18, paddingBottom: "3px" }}>Bill of Lading</Text>
          </View>

          <View style={{ flexDirection: "row", borderTop: "1 solid black", borderLeft: "1 solid black" }}>
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

          <View style={styles.infoTitleBox}>
            <Text style={styles.shipTtile}>Customer Order Information:</Text>
          </View>

          <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
            <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Customer Order#</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>#Pkgs</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Weight</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Pallet/Slip</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Type</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Dept</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>DC</Text>
            </View>
            <View style={{ width: "15%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Additional Info</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
            <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Customer Order#</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>#Pkgs</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Weight</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Pallet/Slip</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Type</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Dept</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>DC</Text>
            </View>
            <View style={{ width: "15%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Additional Info</Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default UnderlyingBOL;
