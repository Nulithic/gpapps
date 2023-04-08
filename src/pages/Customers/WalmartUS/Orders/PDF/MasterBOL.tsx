import { Page, Text, View, Document, StyleSheet, Canvas, Image, Svg, G, Polygon, Path } from "@react-pdf/renderer";
import { format } from "date-fns";

import WalmartOrder from "@/types/WalmartUS/OrderType";

interface MasterBOLProps {
  selection: WalmartOrder[];
}

interface CheckBoxProps {
  status: boolean;
  width: number;
  height: number;
}

interface ExtraPageProps {
  index: number;
  moreOrders: WalmartOrder[];
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

const CheckBox = ({ status, width, height }: CheckBoxProps) => (
  <>
    {status ? (
      <Svg width={width} height={height} viewBox="0 0 512 512">
        <Path
          d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Zm-59.325 61.44 33.317 26.653-141.327 165.992-91.325-79.46 26.654-33.317 57.99 52.818 114.691-132.686Z"
          fill="#212121"
        />
      </Svg>
    ) : (
      <Svg width={width} height={height} viewBox="0 0 512 512">
        <Path d="M448 64v384H64V64h384Zm-42.667 42.667H106.667v298.666h298.666V106.667Z" fill="#212121" />
      </Svg>
    )}
  </>
);

// Create Document Component
export const MasterBOL = ({ selection }: MasterBOLProps) => {
  const carrierGroup = (group: any[]) => {
    let emptyList = [];
    if (group.length < 6) {
      for (let i = 0; i < 6 - group.length; i++) emptyList.push([]);
    }
    return emptyList;
  };

  const totalUnit = (group: WalmartOrder[]) => {
    const total = group.map((item) => (item.floorOrPallet === "P" ? 1 : parseInt(item.numberOfCartons)));
    return total.reduce((a, b) => a + b, 0);
  };

  const totalPackage = (group: WalmartOrder[]) => {
    const total = group.map((item) => parseInt(item.numberOfCartons));
    return total.reduce((a, b) => a + b, 0);
  };

  const totalWeight = (group: WalmartOrder[]) => {
    const total = group.map((item) => parseInt(item.actualWeight));
    return total.reduce((a, b) => a + b, 0);
  };

  const carrierTotal = (group: WalmartOrder[]) => {
    const carrierInfo = [
      ...group
        .reduce((r, o) => {
          const key = o.floorOrPallet;

          const pick = (({ floorOrPallet }) => ({
            floorOrPallet,
          }))(o);

          const item =
            r.get(key) ||
            Object.assign({}, pick, {
              totalHandlingQty: 0,
              totalPackageQty: 0,
              totalWeightQty: 0,
            });

          item.totalHandlingQty += Number(o.floorOrPallet === "P" ? 1 : o.numberOfCartons);
          item.totalPackageQty += Number(o.numberOfCartons);
          item.totalWeightQty += Number(o.actualWeight);

          return r.set(key, item);
        }, new Map())
        .values(),
    ];
    return carrierInfo;
  };

  const ExtraPage = ({ index, moreOrders }: ExtraPageProps) => (
    <Page size="LETTER" style={styles.page}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: "3px" }}>
        <Text style={{ fontSize: 14 }}>Date: {format(new Date(), "mm/dd/yyyy")}</Text>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>SUPPLEMENT TO THE BILL OF LADING</Text>
        <Text style={{ fontSize: 14 }}>Page #{index + 2}</Text>
      </View>
      <View style={{ flexDirection: "row", paddingBottom: "3px" }}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>Bill of Lading Number: ______________________________________</Text>
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

      {moreOrders.map((item, groupIndex) => (
        <View key={groupIndex} style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
          <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.purchaseOrderNumber}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.numberOfCartons}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.actualWeight}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.floorOrPallet === "F" ? "No" : "Yes"}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.purchaseOrderType}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.departmentNumber}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}>{item.distributionCenterNumber}</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemRowText}></Text>
          </View>
        </View>
      ))}

      <View style={{ flexDirection: "row", borderBottom: "1 solid black", marginBottom: 5 }}>
        <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: "12px" }}>PAGE SUBTOTAL</Text>
        </View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
          <Text style={{ fontSize: "12px" }}>{totalPackage(moreOrders)}</Text>
        </View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
          <Text style={{ fontSize: "12px" }}>{totalWeight(moreOrders)}</Text>
        </View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
        <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
        <View
          style={{
            width: "15%",
            alignItems: "center",
            borderLeft: "1 solid black",
            borderRight: "1 solid black",
            padding: "2px",
            backgroundColor: "#636466",
          }}
        ></View>
      </View>
    </Page>
  );

  const MultiPage = ({ remainingOrders }: { remainingOrders: WalmartOrder[] }) => {
    const numberOfPages = Math.ceil(remainingOrders.length / 42);

    const pageList = [];

    for (let i = 0; i < numberOfPages; i++) {
      const page = remainingOrders.splice(0, 42);
      pageList.push(<ExtraPage key={i} index={i} moreOrders={page} />);
    }

    return <>{pageList.map((item) => item)}</>;
  };

  const firstPage = selection.slice(0, 8);
  const remainingOrders = selection.slice(8);

  console.log(firstPage);
  console.log(remainingOrders);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: "3px" }}>
          <Text style={{ fontSize: 14 }}>Date: {format(new Date(), "mm/dd/yyyy")}</Text>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>MASTER BILL OF LADING</Text>
          <Text style={{ fontSize: 14 }}>Page #1</Text>
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
                  <CheckBox status={false} width={20} height={20} />
                </View>
              </View>
            </View>

            <View style={styles.shipTitleBox}>
              <Text style={styles.shipTtile}>Ship To:</Text>
            </View>

            <View style={styles.shipBox}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>WALMART CENTERPOINT CP 6909</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>3485 WINEVILLE RD</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 14 }}>JURUPA VALLEY, CA 91752</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>CID#</Text>

                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>FOB</Text>

                  <CheckBox status={false} width={20} height={20} />
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
                  <CheckBox status={false} width={16} height={16} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>Collect</Text>
                  <CheckBox status={true} width={16} height={16} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 10 }}>3rd Party</Text>
                  <CheckBox status={false} width={16} height={16} />
                </View>
              </View>
            </View>

            <View style={styles.shipBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox status={true} width={16} height={16} />
                <Text style={{ fontSize: 9 }}>Master Bill of Lading: with attached Underlying Bills of Lading</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "column", width: "100%" }}>
            <View style={styles.shipBox}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>BOL#: ______________________</Text>
              </View>
            </View>

            <View style={styles.shipBox}>
              <View style={{ flexDirection: "column", justifyContent: "space-evenly", height: 200 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 16 }}>Carrier Name: ___________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>SCAC: ______________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>Seal#: ______________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>MABD: _____________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>Delivery#: ___________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>Trailer#: ____________________</Text>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 18 }}>Pro#: _______________________</Text>
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

        {firstPage.map((item, groupIndex) => (
          <View key={groupIndex} style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
            <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.purchaseOrderNumber}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.numberOfCartons}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.actualWeight}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.floorOrPallet === "F" ? "No" : "Yes"}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.purchaseOrderType}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.departmentNumber}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.distributionCenterNumber}</Text>
            </View>
            <View style={{ width: "15%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}></Text>
            </View>
          </View>
        ))}

        <View style={{ flexDirection: "row", borderBottom: "1 solid black", marginBottom: 5 }}>
          <View style={{ width: "25%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: "12px" }}>PAGE SUBTOTAL</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: "12px" }}>{totalPackage(firstPage)}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: "12px" }}>{totalWeight(firstPage)}</Text>
          </View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View
            style={{
              width: "15%",
              alignItems: "center",
              borderLeft: "1 solid black",
              borderRight: "1 solid black",
              padding: "2px",
              backgroundColor: "#636466",
            }}
          ></View>
        </View>

        <View style={styles.infoTitleBox}>
          <Text style={styles.shipTtile}>Carrier Information:</Text>
        </View>

        <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
          <View style={{ width: "18%", alignItems: "center", borderLeft: "1 solid black" }}>
            <View style={{ padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Handling Unit</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ alignItems: "center", borderTop: "1 solid black", borderRight: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>Qty</Text>
              </View>
              <View style={{ alignItems: "center", borderTop: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>Type</Text>
              </View>
            </View>
          </View>

          <View style={{ width: "18%", alignItems: "center", borderLeft: "1 solid black" }}>
            <View style={{ padding: "2px" }}>
              <Text style={styles.itemHeadertext}>Package</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ alignItems: "center", borderTop: "1 solid black", borderRight: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>Qty</Text>
              </View>
              <View style={{ alignItems: "center", borderTop: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>Type</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "10%", alignItems: "center", justifyContent: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemHeadertext}>Weight</Text>
          </View>
          <View style={{ width: "5%", alignItems: "center", justifyContent: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: 8 }}>H.M.</Text>
          </View>
          <View style={{ width: "30%", alignItems: "center", justifyContent: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={styles.itemHeadertext}>Commodity Description</Text>
            <Text style={{ fontSize: 5 }}>
              Commodities requiring special or additional care or attention in handling or stowing must be marked and packaged as to ensure safe transportation
              with ordinary care. See Section 2(a) of NMFC Item 360
            </Text>
          </View>
          <View style={{ width: "19%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black" }}>
            <View style={{ padding: "2px" }}>
              <Text style={styles.itemHeadertext}>LTL Only</Text>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ alignItems: "center", borderTop: "1 solid black", borderRight: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>NMFC#</Text>
              </View>
              <View style={{ alignItems: "center", borderTop: "1 solid black", width: "50%", padding: "2px" }}>
                <Text style={styles.itemHeadertext}>Class</Text>
              </View>
            </View>
          </View>
        </View>

        {carrierTotal(selection).map((item, groupIndex) => (
          <View key={groupIndex} style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
            <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.totalHandlingQty}</Text>
            </View>
            <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.floorOrPallet === "P" ? "Pallet" : "Floor"}</Text>
            </View>
            <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.totalPackageQty}</Text>
            </View>
            <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>CTN</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>{item.totalWeightQty}</Text>
            </View>
            <View style={{ width: "5%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}></Text>
            </View>
            <View style={{ width: "30%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>Printer Accessories</Text>
            </View>
            <View style={{ width: "9.33%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>_________</Text>
            </View>
            <View style={{ width: "9.67%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}>_________</Text>
            </View>
          </View>
        ))}

        {carrierGroup(carrierTotal(selection)).map((_, groupIndex) => (
          <View key={groupIndex} style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
            <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
              <Text style={styles.itemRowText}> </Text>
            </View>
            <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "5%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "30%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "9.33%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}></View>
            <View style={{ width: "9.67%", alignItems: "center", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}></View>
          </View>
        ))}

        <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
          <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: "12px" }}>{totalUnit(selection)}</Text>
          </View>
          <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "8.92%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: "12px" }}>{totalPackage(selection)}</Text>
          </View>
          <View style={{ width: "9.08%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "10%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: "12px" }}>{totalWeight(selection)}</Text>
          </View>
          <View style={{ width: "5%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View style={{ width: "30%", alignItems: "center", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: "12px" }}>GRAND TOTAL</Text>
          </View>
          <View style={{ width: "9.33%", alignItems: "center", borderLeft: "1 solid black", padding: "2px", backgroundColor: "#636466" }}></View>
          <View
            style={{
              width: "9.67%",
              alignItems: "center",
              borderLeft: "1 solid black",
              borderRight: "1 solid black",
              padding: "2px",
              backgroundColor: "#636466",
            }}
          ></View>
        </View>

        <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
          <View style={{ width: "30%", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: 5 }}>
              Where the rate is dependent on value, shippers are required to state specifically in writing the agreed or declared value of the property as
              follows: “The agreed or declared value of the property is specifically stated by the shipper to be not exceeding __________________ per
              ___________________.”
            </Text>
          </View>
          <View style={{ width: "40%", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: 5 }}>
              RECEIVED, subject to the individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if
              applicable, otherwise to the rates, classifications and rules that have been established by the carrier and are available to the shipper, on
              request, and to all applicable state and federal regulations.
            </Text>
          </View>
          <View style={{ width: "10%", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: 5 }}>NOTE - Liability Limitation applies. See 49 U.S.C. 14706(c) (1) (A) and (B).</Text>
          </View>
          <View style={{ width: "20%", borderLeft: "1 solid black", borderRight: "1 solid black", padding: "2px" }}>
            <Text style={{ fontSize: 5 }}>COD Amount: $ ______________________</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 5 }}>Fee Terms:</Text>
              <Text style={{ fontSize: 5 }}>Collect:</Text>
              <CheckBox status={false} width={10} height={10} />
              <Text style={{ fontSize: 5 }}>Prepaid:</Text>
              <CheckBox status={false} width={10} height={10} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 5 }}>Personal/company check NOT acceptable:</Text>
              <CheckBox status={false} width={10} height={10} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", borderBottom: "1 solid black" }}>
          <View style={{ width: "40%", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9 }}>Shipper Signature/Date</Text>

            <Text style={{ fontSize: 5 }}>
              This is to certify that the above named materials are properly classified, described, packaged, marked and labeled, and are in proper condition
              for transportation according to the applicable regulations of the U.S. DOT.
            </Text>

            <View style={{ flexDirection: "row", paddingTop: 15 }}>
              <View style={{ flexDirection: "column", paddingRight: 5 }}>
                <Svg width="160" height="2">
                  <Path fill="black" d="M139.26 2H0V0h139.26v2z" />
                </Svg>
                <Text style={{ fontSize: 7 }}>Signature</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Svg width="50" height="2">
                  <Path fill="black" d="M139.26 2H0V0h139.26v2z" />
                </Svg>
                <Text style={{ fontSize: 7 }}>Date</Text>
              </View>
            </View>
          </View>

          <View style={{ width: "40%", borderLeft: "1 solid black", padding: "2px" }}>
            <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9 }}>Carrier Signature/Date</Text>
            <Text style={{ fontSize: 5 }}>
              Carrier acknowledges receipt of packages and required placards. Carrier certifies emergency response information was made available and/or carrier
              has the U.S. DOT emergency response guidebook or equivalent documentation in the vehicle.
            </Text>
            <View style={{ flexDirection: "row", paddingTop: 15 }}>
              <View style={{ flexDirection: "column", paddingRight: 5 }}>
                <Svg width="160" height="2">
                  <Path fill="black" d="M139.26 2H0V0h139.26v2z" />
                </Svg>
                <Text style={{ fontSize: 7 }}>Signature</Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Svg width="50" height="2">
                  <Path fill="black" d="M139.26 2H0V0h139.26v2z" />
                </Svg>
                <Text style={{ fontSize: 7 }}>Date</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              width: "20%",
              borderLeft: "1 solid black",
              borderRight: "1 solid black",
              padding: "2px",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", paddingRight: 10 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 5 }}>Trailer Loaded</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox status={false} width={10} height={10} />
                  <Text style={{ fontSize: 5 }}>By Shipper</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox status={false} width={10} height={10} />
                  <Text style={{ fontSize: 5 }}>By Driver</Text>
                </View>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 5 }}>Freight Counted</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox status={false} width={10} height={10} />
                  <Text style={{ fontSize: 5 }}>By Shipper</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox status={false} width={10} height={10} />
                  <Text style={{ fontSize: 5 }}>By Driver/Pallets</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CheckBox status={false} width={10} height={10} />
                  <Text style={{ fontSize: 5 }}>By Driver/Pieces</Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", borderTop: "1 solid black" }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 5, paddingRight: 26 }}>Time In:</Text>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 5 }}>Time Out:</Text>
            </View>
          </View>
        </View>
      </Page>
      <MultiPage remainingOrders={remainingOrders} />
    </Document>
  );
};

export default MasterBOL;
