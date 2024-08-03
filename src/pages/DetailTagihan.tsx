import React, { useEffect, useMemo, useRef, useState } from "react";
import SecondLayout from "../components/SecondLayout";
import SecondaryHeader from "../components/SecondaryHeader";
import { RouteComponentProps } from "react-router";
import Card from "../components/Card";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  RefresherEventDetail,
  useIonRouter,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { dispatch, stateType } from "../store";
import { removeSiswa, selectSiswaById } from "../store/siswa";
import {
  fetchWithToken,
  parseCurrency,
  parseDate,
  sendLocalNotification,
  showToast,
  standartDate,
} from "../lib/utils";
import { API_URL } from "../lib/variables";
import { Alert } from "../components/Alert";
import {
  fetchTagihan,
  removeTagihan,
  selectAllTagihan,
  selectTagihanById,
} from "../store/tagihan";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import {
  fetchPembayaran,
  resetPembayaran,
  selectAllPembayaran,
} from "../store/pembayaran";
import { usePDF } from "@react-pdf/renderer";
import PdfDocument from "../components/PdfDocument";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface DetailTagihanType extends RouteComponentProps<{ id: string }> {}
const DetailTagihan: React.FC<DetailTagihanType> = ({ match }) => {
  const ref = useRef<null | HTMLIonAccordionElement>(null);
  const tagihan = useSelector((state: stateType) =>
    selectTagihanById(state, match.params.id as any)
  );
  const [loading, setloading] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [timeStamp, settimeStamp] = useState(0);
  const [isErrorOpen, setErrorIsOpen] = useState(false);
  // const [pdf, update] = usePDF();
  const router = useIonRouter();
  const pembayaran = useSelector((state: stateType) =>
    selectAllPembayaran(state)
  );
  const loadingPembayaran = useSelector(
    (state: stateType) => state.pembayaran.loading
  );
  const [loadingPdf, setLoadingPdf] = useState(false);
  const pembayaranTagihan = useMemo(() => {
    return pembayaran.filter(
      (pemb) => pemb.tagihanId === parseInt(match.params.id)
    );
  }, [pembayaran]);
  const siswa = useSelector((state: stateType) =>
    selectSiswaById(state, tagihan?.userId)
  );

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    dispatch(resetPembayaran());
    await dispatch(fetchPembayaran(match?.params?.id || "0"));
    event.detail.complete();
  };

  function createRandomData() {
    const randomDates = [
      "2024-05-01",
      "2024-05-02",
      "2024-05-03",
      "2024-05-04",
    ];
    const randomNominals = ["10000", "20000", "15000", "30000"];
    const randomMethods = ["Cash", "Credit Card", "Bank Transfer", "E-Wallet"];

    const data = [];

    for (let i = 0; i < 4; i++) {
      data.push([randomDates[i], randomNominals[i], randomMethods[i]]);
    }

    return data;
  }

  async function createAndDownloadPDF() {
    const filename = `${siswa.nama || "smssck"}_${Date.now()}.pdf`;
    showToast("mendownload pdf ...");
    const doc = new jsPDF();
    const headers = [
      ["Tanggal Pembayaran", "Nominal", "Metode Pembayaran", "Bank"],
    ];
    const data = pembayaranTagihan.map((val) => {
      return [val.tanggal_bayar, val.nominal, val.metode_bayar, val.bank];
    });

    doc.setFont("halvetica", "bold");
    doc.setFontSize(24);
    doc.text("Laporan Pembayaran Siswa", 105, 20, "center" as any);

    doc.setFontSize(13);
    doc.setFont("halvetica", "bold");
    doc.setTextColor(20, 20, 20);
    doc.text("SMK Cendekia Sungai Karang", 105, 27, "center" as any);

    doc.setFont("halvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("black");

    doc.text("Nama", 15, 50);
    doc.text(":", 40, 50);
    doc.text(siswa?.nama || "", 45, 50);

    doc.text("Tagihan", 15, 56);
    doc.text(":", 40, 56);
    doc.text(tagihan.judul_tagihan, 45, 56);

    doc.text("Total Tagihan", 15, 62);
    doc.text(":", 40, 62);
    doc.text(`Rp. ${parseCurrency(tagihan.total_tagihan)}`, 45, 62);

    doc.text("Status", 15, 68);
    doc.text(":", 40, 68);
    doc.text(tagihan.status.split("_").join(" "), 45, 68);

    doc.setFontSize(14);
    doc.setFont("halvetica", "bold");
    doc.text("List Pembayaran", 15, 85);

    autoTable(doc, {
      theme: "plain",
      head: headers,
      body: data,
      margin: { top: 90 },
    });

    const pdfBlob = doc.output("blob");

    // Convert Blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
      const base64data = (reader.result as string).split(",")[1];

      console.log(reader.result);
      // Write the file to the filesystem
      await Filesystem.writeFile({
        path: filename,
        data: window.atob(base64data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      // Get the URI of the written file
      const fileUri = await Filesystem.getUri({
        directory: Directory.Documents,
        path: filename,
      });

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = fileUri.uri;
      link.download = filename;
      link.click();

      await sendLocalNotification(
        "SMK CSK",
        `${filename}.pdf telah di download`
      );
      showToast("berhasil di download dan disimpan di /Documents");
    };
  }

  const deleteTagihan = async () => {
    setloading(true);
    try {
      const res = await fetchWithToken(`${API_URL}/api/tagihan/delete`, {
        id: match.params.id,
      });
      const { id } = res.json as any;
      setTimeout(() => {
        dispatch(removeTagihan(id));
      }, 1000);
      router.goBack();
    } catch (error) {
      console.log(error);
      setErrorIsOpen(true);
      seterrormessage(error as any);
    } finally {
      showToast("berhasil delete tagihan");
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    dispatch(fetchPembayaran(match?.params?.id || "0"));
    const el = ref.current;
    el.value = "second";
  }, []);

  const pembayaranView = loadingPembayaran ? (
    <Loader />
  ) : !pembayaranTagihan.length ? (
    <EmptyView className="h-48" message="Pembayaran Kosong" />
  ) : (
    pembayaranTagihan.map((pemb, index) => (
      <Card key={index}>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-4">
            <span className="font-bold text-lg">
              {standartDate(pemb.tanggal_bayar)}
            </span>
            <div className="flex flex-col gap-0 capitalize">
              <table>
                <tbody>
                  <tr>
                    <td>Nominal</td>
                    <td className="px-2">:</td>
                    <td>Rp. {parseCurrency(pemb.nominal)}</td>
                  </tr>
                  <tr>
                    <td>Pembayaran</td>
                    <td className="px-2">:</td>
                    <td>{pemb.metode_bayar}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    ))
  );

  return (
    <SecondLayout header={<SecondaryHeader title={`detail tagihan`} />} title="Detail Tagihan">
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <Alert
        message={errormessage}
        setIsOpen={setErrorIsOpen}
        isOpen={isErrorOpen}
      />
      <div className="w-full flex justify-center">
        <div className="w-full lg:w-[600px]">
          <IonAccordionGroup ref={ref as any}>
            <IonAccordion value="first">
              <IonItem slot="header" color={"light"}>
                <IonLabel>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-xl">Informasi tagihan</span>
                    <span className="text-xs">
                      Menampilkan informasi umum tagihan siswa
                    </span>
                  </div>
                </IonLabel>
              </IonItem>
              <div className="flex justify-center" slot="content">
                <Card>
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                      <span className="font-2xl font-extrabold">Tagihan</span>
                      <span className="text-sm">{tagihan.judul_tagihan}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">
                        Tenggat Waktu
                      </span>
                      <span className="text-sm break-all">
                        {standartDate(tagihan.tenggat_waktu)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">
                        Total Tagihan
                      </span>
                      <span className="text-sm">
                        Rp. {parseCurrency(tagihan.total_tagihan)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 flex-col">
                    <IonButton
                      fill="clear"
                      className="w-4/5"
                      routerDirection="none"
                      routerLink={`/tabs/siswa/edit-tagihan/${match.params.id}/true`}
                    >
                      Edit
                    </IonButton>
                    <IonButton
                      fill="clear"
                      className="w-4/5"
                      onClick={() => createAndDownloadPDF()}
                    >
                      Download Pdf
                    </IonButton>
                    <IonButton
                      onClick={() => deleteTagihan()}
                      fill="clear"
                      color={"danger"}
                      className="w-4/5"
                    >
                      {loading ? <IonSpinner name="dots" /> : "Hapus"}
                    </IonButton>
                  </div>
                </Card>
              </div>
            </IonAccordion>
            <IonAccordion value="second">
              <IonItem slot="header" color={"light"}>
                <IonLabel>
                  <div className="w-full flex flex-col gap-1">
                    <span className="font-bold text-xl">Pembayaran</span>
                    <span className="text-xs">
                      Menampilkan pembayaran siswa akan tagihannya
                    </span>
                  </div>
                </IonLabel>
              </IonItem>
              <div className="flex justify-center" slot="content">
                <Card noPadding>{pembayaranView}</Card>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>
      </div>
    </SecondLayout>
  );
};

export default DetailTagihan;
