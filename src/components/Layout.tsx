import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonPage,
  IonRouterLink,
} from "@ionic/react";
import React, { ReactNode, useEffect } from "react";
import { people, person, add } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import { useIonRouter } from "@ionic/react";
interface LayoutType {
  children: ReactNode;
  header?: JSX.Element;
  title?: string;
}

const Layout: React.FC<LayoutType> = ({ children, header, title = "Page" }) => {
  const pathname = window.location.pathname;

  return (
    <IonPage>
      {header}
      <IonContent fullscreen>
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className="bottom-10 right-5 lg:hidden"
        >
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top" className="-right-5 ">
            <IonRouterLink routerLink={`${pathname}/add-admin/false`}>
              <div className="w-24 flex justify-center items-center gap-2 flex-col mt-5 mb-2">
                <IonIcon icon={person} size="large" className="text-gray-500" />
                <span className="text-xs font-bold text-black">Admin</span>
              </div>
            </IonRouterLink>
            <IonRouterLink routerLink={`${pathname}/add-siswa/false`}>
              <div className="w-24 flex justify-center items-center gap-2 flex-col">
                <IonIcon icon={people} size="large" className="text-gray-500" />
                <span className="text-xs font-bold text-black">Siswa</span>
              </div>
            </IonRouterLink>
          </IonFabList>
        </IonFab>
        <div className="w-full p-5 flex justify-start items-start flex-col gap-6 relative pt-28">
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Layout;
