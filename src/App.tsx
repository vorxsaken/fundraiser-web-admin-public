import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Siswa";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Taiwindcss  */
import "./theme/tailwindcss.css";
import WebTabs from "./pages/WebTabs";
import { Provider } from "react-redux";
import store, { dispatch } from "./store";
import { checkAuth } from "./lib/utils";
import { useEffect, useState } from "react";
import GradientBackground from "./components/GradientBackground";
import Login from "./pages/Login";
import { fetchUserInfo } from "./store/user";

setupIonicReact();

const App: React.FC = () => {
  const [isAuth, setisAuth] = useState(false);
  const [status, setstatus] = useState("loading");

  const auth = async () => {
    const { isAuthenticated, status, id } = await checkAuth();
    
    if (isAuthenticated) {
      dispatch(fetchUserInfo(id as string));
    }

    setisAuth(isAuthenticated);
    setstatus(status);
  };

  useEffect(() => {
    auth();
  }, []);

  if (status === "loading") {
    return (
      <IonPage>
        <IonContent>
          <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">
            <GradientBackground />
            <IonSpinner name="dots" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <Provider store={store}>
          <IonRouterOutlet>
            <Route
              exact
              path={"/login"}
              render={(props) =>
                isAuth ? <Redirect exact to={"/tabs"} /> : <Login {...props} />
              }
            />
            <Route
              path="/tabs"
              render={(props) =>
                isAuth ? <WebTabs {...props} /> : <Redirect exact to={"/login"} />
              }
            />
            <Route exact path={"/"}>
              <Redirect exact to={"/tabs"} />
            </Route>
          </IonRouterOutlet>
        </Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
