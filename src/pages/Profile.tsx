import React, { useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { IonButton, IonImg } from "@ionic/react";
import MainHeader from "../components/MainHeader";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { stateType } from "../store";
import ErrorMessage from "../components/ErrorMessage";
import { parseCurrency } from "../lib/utils";
import { signOut } from "../lib/utils";

const Pembayaran: React.FC = () => {
  const profile = useSelector((state: stateType) => state.user.user);
  const logOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <Layout header={<MainHeader />} title="Profile">
      <div className="w-full flex justify-center">
        <Card className="w-full flex justify-start items-start flex-col capitalize">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-start gap-5">
              <div className="w-20 h-20 overflow-hidden relative rounded-lg">
                <IonImg
                  src={profile?.foto}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-start items-start flex-col">
                <span className="text-xl font-bold ">{profile?.nama}</span>
                <span className="text-sm">{profile?.no_telp}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <span className="font-bold text-xl">Alamat</span>
            <span className="text-sm break-all">{profile?.alamat}</span>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <span className="font-bold text-xl">Email</span>
            <span className="text-sm">{profile?.email}</span>
          </div>
          <div className="flex justify-start items-start flex-col gap-1">
            <span className="font-bold text-xl">Role</span>
            <span className="text-sm">{profile?.role}</span>
          </div>
          <div className="w-full flex justify-center items-center gap-2 flex-col">
            <IonButton
              fill="clear"
              className="w-4/5"
              routerLink={`/tabs/profile/edit-profile/${profile?.id}/true/true`}
              routerDirection="none"
            >
              Edit
            </IonButton>
            <IonButton
              fill="clear"
              className="w-4/5"
              onClick={() => logOut()}
              color={"danger"}
            >
              Sign Out
            </IonButton>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Pembayaran;
