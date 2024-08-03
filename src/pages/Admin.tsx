import React, { useEffect } from "react";
import Layout from "../components/Layout";
import MainHeader from "../components/MainHeader";
import { useSelector } from "react-redux";
import { dispatch, stateType } from "../store";
import { IonButton, IonImg } from "@ionic/react";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Card from "../components/Card";
import { fetchAdmin, selectAllAdmin } from "../store/admin";
import EmptyView from "../components/EmptyView";
import { checkAuth } from "../lib/utils";

const Admin: React.FC = () => {
  const pathname = window.location.pathname;
  const loadingAdmin = useSelector((state: stateType) => state.admin.loading);
  const errorAdmin = useSelector((state: stateType) => state.admin.loading);
  const admins = useSelector((state: stateType) => selectAllAdmin(state));

  useEffect(() => {
    const getAdmin = async () => {
      const { id } = await checkAuth();
      if (admins.length == 0) dispatch(fetchAdmin(parseInt(id as any)));
    };

    getAdmin();
  }, [admins]);

  const adminsView = admins.map((admin, index) => (
    <div key={index}>
      <Card  className="w-full flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:gap-8">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-5">
            <div className="w-16 h-16 overflow-hidden relative rounded-full">
              <IonImg src={admin.foto} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-start items-start flex-col">
              <span className="text-xl font-bold ">{admin.nama}</span>
              <span className="text-sm">{admin.no_telp}</span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <IonButton
            fill="clear"
            expand="block"
            routerLink={`${pathname}/detail-admin/${admin.id}`}
            routerDirection="none"
          >
            Lihat
          </IonButton>
        </div>
      </Card>
    </div>
  ));

  return (
    <Layout header={<MainHeader />} title="Admin">
      {loadingAdmin ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : errorAdmin ? (
        <ErrorMessage />
      ) : !admins.length ? (
        <EmptyView message="Tidak Ada Data Admin" />
      ) : (
        adminsView
      )}
    </Layout>
  );
};

export default Admin;
