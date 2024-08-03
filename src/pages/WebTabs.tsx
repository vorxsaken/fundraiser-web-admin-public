import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { person, people, personCircleOutline } from "ionicons/icons";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useRouteMatch,
} from "react-router-dom";
import Siswa from "./Siswa";
import Admin from "./Admin";
import Profile from "./Profile";
import FormSiswa from "./FormSiswa";
import DetailSiswa from "./DetailSiswa";
import FormAdmin from "./FormAdmin";
import DetailAdmin from "./DetailAdmin";
import FormTagihan from "./FormTagihan";
import DetailTagihan from "./DetailTagihan";

const WebTabs: React.FC<RouteComponentProps> = () => {
  const router = useIonRouter();
  const routerUrl = router.routeInfo.pathname;

  const isSame = (url: string) => {
    const reg = new RegExp(`${url}`, "i");
    return reg.test(routerUrl);
  };

  return (
    <>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/siswa" />
        <Route
          exact
          path="/tabs/siswa"
          render={(props) => <Siswa {...props} />}
        />
        <Route exact path="/tabs/admin">
          <Admin />
        </Route>
        <Route exact path="/tabs/profile">
          <Profile />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/siswa" />
        </Route>

        <Route path={`/tabs/:view/detail-siswa/:id`} component={DetailSiswa} />
        <Route
          path={`/tabs/:view/edit-siswa/:id/:isEdit`}
          component={FormSiswa}
        />

        <Route path={`/tabs/:view/detail-admin/:id`} component={DetailAdmin} />
        <Route
          path={`/tabs/:view/edit-admin/:id/:isEdit`}
          component={FormAdmin}
        />

        <Route
          path={`/tabs/:view/detail-tagihan/:id`}
          component={DetailTagihan}
        />
        <Route
          path={`/tabs/:view/edit-tagihan/:id/:isEdit`}
          component={FormTagihan}
        />

        <Route path={`/tabs/add-siswa/:isEdit`} component={FormSiswa} />
        <Route path={`/tabs/add-admin/:isEdit`} component={FormAdmin} />

        <Route
          path={`/tabs/:view/edit-profile/:id/:isEdit/:isEditProfile`}
          component={FormAdmin}
        />

        <Route
          path={`/tabs/:view/form-tagihan/:id/:isEdit`}
          component={FormTagihan}
        />
      </IonRouterOutlet>
      <div className="bg-white border-gray-400 border p-2 rounded-md flex gap-2 absolute top-3 left-5">
        <IonButton
          routerLink="/tabs/siswa"
          routerDirection="none"
          fill="clear"
          color={isSame('/tabs/siswa') ? 'tertiary' : 'dark'}
        >
          <IonIcon icon={people} />
          <IonLabel className="ml-2">Siswa</IonLabel>
        </IonButton>
        <IonButton
          routerLink="/tabs/admin"
          routerDirection="none"
          fill="clear"
          color={isSame('/tabs/admin') ? 'tertiary' : 'dark'}
        >
          <IonIcon icon={person} />
          <IonLabel className="ml-2">Admin</IonLabel>
        </IonButton>
        <IonButton
          routerLink="/tabs/profile"
          routerDirection="none"
          fill="clear"
          color={isSame('/tabs/profile') ? 'tertiary' : 'dark'}
        >
          <IonIcon icon={personCircleOutline} />
          <IonLabel className="ml-2">Profile</IonLabel>
        </IonButton>
        <IonButton
          routerLink={`/tabs/add-siswa/false`}
          routerDirection="none"
          fill="clear"
          color={isSame('/tabs/add-siswa') ? 'tertiary' : 'dark'}
        >
          <IonIcon icon={people} />
          <IonLabel className="ml-2">Tambah Siswa</IonLabel>
        </IonButton>
        <IonButton
          routerLink={`/tabs/add-admin/false`}
          routerDirection="none"
          fill="clear"
          color={isSame('/tabs/add-admin') ? 'tertiary' : 'dark'}
        >
          <IonIcon icon={person} />
          <IonLabel className="ml-2">Tambah Admin</IonLabel>
        </IonButton>
      </div>
    </>
  );
};

export default WebTabs;
