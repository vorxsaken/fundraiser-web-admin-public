import { ReactNode } from "react";
import {
  Page,
  Text,
  Document,
  Image,
  Font,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { parseCurrency } from "../lib/utils";

interface PdfDocumentType {
  docData?: {
    nama: string;
    tagihan: string;
    totalTagihan: number;
    status: string;
  };
  tableData?: {
    tanggalPembayaran: string;
    nominal: number;
    metodePembayaran: string;
    bank: string
  }[];
}

const PdfDocument: React.FC<PdfDocumentType> = ({ docData, tableData }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Laporan Pembayaran Siswa</Text>
        <Text style={styles.author}>SMK Cendekia Sungai Karang</Text>
        <View style={styles.headerContainer}>
          <View style={styles.headerContainerItem}>
            <View style={styles.headerContainerItem25}>
              <Text style={styles.text2}>Nama</Text>
            </View>
            <View style={styles.headerContaineItem3}>
              <Text style={styles.text2}>:</Text>
            </View>
            <View>
              <Text style={styles.text2}>{docData?.nama}</Text>
            </View>
          </View>
          <View style={styles.headerContainerItem}>
            <View style={styles.headerContainerItem25}>
              <Text style={styles.text2}>Tagihan</Text>
            </View>
            <View style={styles.headerContaineItem3}>
              <Text style={styles.text2}>:</Text>
            </View>
            <View>
              <Text style={styles.text2}>{docData?.tagihan}</Text>
            </View>
          </View>
          <View style={styles.headerContainerItem}>
            <View style={styles.headerContainerItem25}>
              <Text style={styles.text2}>Total Tagihan</Text>
            </View>
            <View style={styles.headerContaineItem3}>
              <Text style={styles.text2}>:</Text>
            </View>
            <View>
              <Text style={styles.text2}>
                Rp. {parseCurrency(docData?.totalTagihan || 0)}
              </Text>
            </View>
          </View>
          <View style={styles.headerContainerItem}>
            <View style={styles.headerContainerItem25}>
              <Text style={styles.text2}>Status</Text>
            </View>
            <View style={styles.headerContaineItem3}>
              <Text style={styles.text2}>:</Text>
            </View>
            <View>
              <Text style={styles.text2}>{docData?.status}</Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "extrabold",
            marginBottom: 10,
            marginTop: 30,
          }}
        >
          List Pembayaran
        </Text>
        <Table tdStyle={{ padding: "4px" }}>
          <TH style={{ fontSize: 12, fontWeight: "extrabold" }}>
            <TD>Tanggal Pembayaran</TD>
            <TD>Nominal</TD>
            <TD>Metode Pembayaran</TD>
          </TH>
          {tableData?.map((val, index) => (
            <TR style={{ fontSize: 10, fontWeight: "light" }} key={index}>
              <TD>{val.tanggalPembayaran.split("T")[0]}</TD>
              <TD>{`Rp. ${parseCurrency(val.nominal)}`}</TD>
              <TD>{`${val.metodePembayaran.split("_").join(" ").toUpperCase()} (${val.bank.toUpperCase()})`}</TD>
            </TR>
          ))}
        </Table>
      </Page>
    </Document>
  );
};

export default PdfDocument;

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "5px",
  },
  headerContainerItem: {
    width: "500px",
    display: "flex",
    flexDirection: "row",
  },
  headerContainerItem25: {
    width: "70px",
  },
  headerContainerItem2: {
    width: "240px",
  },
  headerContaineItem3: {
    width: "20px",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  text2: {
    fontSize: 10,
    fontFamily: "Times-Roman",
  },
  textMediumBold: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontWeight: "semibold",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
