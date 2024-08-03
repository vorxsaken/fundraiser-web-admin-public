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
  parseDate,
  showToast,
  standartDate,
} from "../lib/utils";
import { API_URL } from "../lib/variables";
import { Alert } from "../components/Alert";
import { fetchTagihan, resetTagihan, selectAllTagihan } from "../store/tagihan";
import Loader from "../components/Loader";
import EmptyView from "../components/EmptyView";
import ImageViewer from "../components/ImageViewer";

interface DetailSiswaType extends RouteComponentProps<{ id: string }> {}
const DetailSiswa: React.FC<DetailSiswaType> = ({ match }) => {
  const ref = useRef<null | HTMLIonAccordionElement>(null);
  const siswa = useSelector((state: stateType) =>
    selectSiswaById(state, match.params.id as any)
  );
  const [loading, setloading] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [isErrorOpen, setErrorIsOpen] = useState(false);
  const router = useIonRouter();
  const tagihans = useSelector((state: stateType) => selectAllTagihan(state));
  const loadingTagihan = useSelector(
    (state: stateType) => state.tagihan.loading
  );
  const tagihanSiswa = useMemo(() => {
    return tagihans.filter(
      (tagihan) => tagihan.userId === parseInt(match.params.id)
    );
  }, [tagihans]);

  const deleteSiswa = async () => {
    setloading(true);
    try {
      const res = await fetchWithToken(`${API_URL}/api/user/delete/siswa`, {
        id: match.params.id,
      });
      const { id } = res.json as any;
      setTimeout(() => {
        dispatch(removeSiswa(id));
      }, 1000);
      router.goBack();
    } catch (error) {
      console.log(error);
      setErrorIsOpen(true);
      seterrormessage(error as any);
    } finally {
      showToast("berhasil delete siswa");
    }
  };

  const showPhoto = () => {};

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    dispatch(resetTagihan());
    await dispatch(fetchTagihan(match.params.id));
    event.detail.complete();
  };

  useEffect(() => {
    if (!ref.current) return;

    dispatch(fetchTagihan(match.params.id));
    const el = ref.current;
    el.value = "second";
  }, []);

  const tagihanView = loadingTagihan ? (
    <Loader />
  ) : !tagihanSiswa.length ? (
    <EmptyView className="h-48" message="Tagihan Kosong" />
  ) : (
    tagihanSiswa.map((tag, index) => (
      <Card key={index}>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-start items-start gap-4 capitalize">
            <span className="font-bold text-lg">{tag.judul_tagihan}</span>
            <div className="flex flex-col gap-0">
              <table>
                <tbody>
                  <tr>
                    <td>Tenggat</td>
                    <td className="px-2">:</td>
                    <td>{standartDate(tag.tenggat_waktu)}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td className="px-2">:</td>
                    <td>{tag.status.split("_").join(" ").toLowerCase()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <IonButton
            fill="clear"
            className="w-full"
            routerDirection="none"
            routerLink={`/tabs/siswa/detail-tagihan/${tag.id}`}
          >
            Lihat
          </IonButton>
        </div>
      </Card>
    ))
  );

  return (
    <SecondLayout header={<SecondaryHeader title={`detail siswa`} />} title="Detail Siswa">
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
                    <span className="font-bold text-xl">Informasi Siswa</span>
                    <span className="text-xs">
                      Menampilkan informasi umum siswa smk cendekia sungai
                      karang
                    </span>
                  </div>
                </IonLabel>
              </IonItem>
              <div className="flex justify-center" slot="content">
                <Card>
                  <div className="w-full flex justify-start items-center flex-col gap-2">
                    <div className="flex justify-center">
                      <ImageViewer alt="siswa" src={siswa.foto || ""} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-7">
                    <div className="flex flex-col gap-1">
                      <span className="font-2xl font-extrabold">Nama</span>
                      <span className="text-sm">{siswa.nama}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Alamat</span>
                      <span className="text-sm break-words">
                        {siswa.alamat}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Nis</span>
                      <span className="text-sm">{siswa.nis}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Email</span>
                      <span className="text-sm">{siswa.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Kelas</span>
                      <span className="text-sm">{siswa.kelas}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Tingkat</span>
                      <span className="text-sm">{siswa.tingkat}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">Angkatan</span>
                      <span className="text-sm">{siswa.angkatan}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-xl font-extrabold">No. Telp</span>
                      <span className="text-sm">{siswa.no_telp}</span>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 flex-col">
                    <IonButton
                      fill="clear"
                      className="w-4/5"
                      routerDirection="none"
                      routerLink={`/tabs/siswa/edit-siswa/${match.params.id}/true`}
                    >
                      Edit
                    </IonButton>
                    <IonButton
                      onClick={() => deleteSiswa()}
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
                    <span className="font-bold text-xl">Tagihan Siswa</span>
                    <span className="text-xs">
                      Tagihan untuk siswa per semester, anda bisa melakukan
                      operasi menambah, edit atau hapus tagihan siswa
                    </span>
                  </div>
                </IonLabel>
              </IonItem>
              <div slot="content" className="flex justify-center">
                <Card noPadding>
                  {tagihanView}
                  <div className="w-full flex justify-center items-center flex-col gap-4">
                    <IonButton
                      routerDirection="none"
                      routerLink={`/tabs/siswa/form-tagihan/${match.params.id}/false`}
                      fill="clear"
                    >
                      Tambah Tagihan
                    </IonButton>
                  </div>
                </Card>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>
      </div>
    </SecondLayout>
  );
};

export default DetailSiswa;
