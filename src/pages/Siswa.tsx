import { IonButton, IonImg, IonSkeletonText, IonSpinner } from "@ionic/react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import RiwayatCard from "../components/RiwayatCard";
import MainHeader from "../components/MainHeader";
import { RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { dispatch, stateType } from "../store";
import { fetchSiswa, selectAllSiswa } from "../store/siswa";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect } from "react";
import EmptyView from "../components/EmptyView";

const Siswa: React.FC<RouteComponentProps> = () => {
  const pathname = window.location.pathname;
  const loadingSiswa = useSelector((state: stateType) => state.siswa.loading);
  const errorSiswa = useSelector((state: stateType) => state.siswa.error);
  const siswas = useSelector((state: stateType) => selectAllSiswa(state));

  useEffect(() => {
    if (siswas.length == 0) dispatch(fetchSiswa());
  }, [siswas]);

  const siswaView = (
    <div className="w-full flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:gap-8">
      {siswas.map((siswa, index) => (
        <Card key={index}>
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-5">
              <div className="w-20 h-20 overflow-hidden relative rounded-lg border border-slate-300">
                <IonImg
                  src={siswa.foto || ""}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-start items-start flex-col gap-1">
                <span className="text-lg font-bold ">{siswa.nama}</span>
                <span className="text-sm">{siswa.nis}</span>
                <span className="text-sm">{siswa.no_telp}</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <IonButton
              fill="clear"
              expand="block"
              routerLink={`${pathname}/detail-siswa/${siswa.id}`}
              routerDirection="none"
            >
              Lihat
            </IonButton>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <Layout header={<MainHeader />} title="Siswa">
      {loadingSiswa ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : errorSiswa ? (
        <ErrorMessage />
      ) : !siswas.length ? (
        <EmptyView message="Tidak Ada Data Siswa" />
      ) : (
        siswaView
      )}
    </Layout>
  );
};

export default Siswa;
