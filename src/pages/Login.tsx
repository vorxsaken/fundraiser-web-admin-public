import {
  IonAlert,
  IonButton,
  IonIcon,
  IonPage,
  IonSpinner,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { eye, eyeOff } from "ionicons/icons";
import { useCustomForm } from "../lib/useCustomForm";
import { loginSchema, loginSchemaType } from "../lib/zodSchema";
import InputTextForm from "../components/InputTextForm";
import { signIn } from "../lib/utils";
import GradientBackground from "../components/GradientBackground";
import { RouteComponentProps } from "react-router";
import { dispatch } from "../store";
import { fetchUserInfo } from "../store/user";
import { Preferences } from "@capacitor/preferences";

const Login: React.FC<RouteComponentProps> = () => {
  const [hidden, sethidden] = useState(true);
  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
    },
  } = useCustomForm(loginSchema);
  const [alertisopen, setalertisopen] = useState(false);
  const [errormessage, seterrormessage] = useState("");
  const [loading, setloading] = useState(false);
  document.title = "Login | SMK CSK";
  const submit = async (e: loginSchemaType) => {
    setloading(true);

    try {
      const { result, status } = await signIn(e.username, e.password);

      if (status === 200) {
        await Preferences.set({ key: "token_admin", value: result.JWT });
        window.location.href = "/tabs/siswa";
      } else {
        setalertisopen(true);
        seterrormessage(result.message);
      }
    } catch (error) {
      setalertisopen(true);
      seterrormessage(error as any);
    }

    setloading(false);
  };

  return (
    <IonPage>
      <IonAlert
        subHeader={errormessage}
        isOpen={alertisopen}
        buttons={["close"]}
        onDidDismiss={() => setalertisopen(false)}
      />
      <div className="w-screen h-screen flex justify-center items-center relative oveeflow-hidden">
        <GradientBackground />
        <div className="flex px-8 py-6 justify-start items-center flex-col gap-10 z-10">
          <div className="flex justify-start items-start flex-col gap-4">
            <span className="text-4xl font-extrabold">Hello Admin !!</span>
            <span className="text-xs font-light pr-8">
              Masukkan username dan password untuk masuk ke aplikasi pembayaran
              spp
              <span className="font-bold ml-1">SMK Cendekia Sungai Karang</span>
            </span>
          </div>
          <form
            onSubmit={handleSubmit(submit)}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="w-full flex justify-center items-start flex-col gap-4">
              <InputTextForm
                type="text"
                fill="outline"
                label="Username"
                labelPlacement="floating"
                errors={errors}
                fieldName="username"
                labelHelper="Masukkan username anda"
                {...register("username")}
              />
              <div className="w-full relative">
                <InputTextForm
                  type={hidden ? "password" : "text"}
                  fill="outline"
                  label="Password"
                  labelPlacement="floating"
                  errors={errors}
                  fieldName="password"
                  labelHelper="Masukkan password anda"
                  {...register("password")}
                />
                <IonIcon
                  onClick={() => sethidden(!hidden)}
                  icon={hidden ? eye : eyeOff}
                  className="absolute top-[14px] right-4 z-10"
                  size="large"
                />
              </div>
            </div>
            <IonButton className="w-[180px] h-10" type="submit" color={"dark"}>
              {loading ? <IonSpinner name="dots" /> : "login"}
            </IonButton>
          </form>
        </div>
      </div>
    </IonPage>
  );
};

export default Login;
