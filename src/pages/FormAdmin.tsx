import React, { useRef, useState } from "react";
import SecondLayout from "../components/SecondLayout";
import SecondaryHeader from "../components/SecondaryHeader";
import { dispatch, stateType } from "../store";
import {
  decryptPassword,
  fetchWithToken,
  showToast,
  uploadImagesToFirebase,
} from "../lib/utils";
import InputTextForm from "../components/InputTextForm";
import { useCustomForm } from "../lib/useCustomForm";
import { adminSchema, adminSchemaType } from "../lib/zodSchema";
import { eye, eyeOff } from "ionicons/icons";
import { IonButton, IonIcon, IonSpinner, useIonRouter } from "@ionic/react";
import { Controller } from "react-hook-form";
import SelectImage from "../components/SelectImage";
import InputTextAreaForm from "../components/InputTextAreaForm";
import { API_URL } from "../lib/variables";
import { addAdmin, updateAdmin } from "../store/admin";
import { SelectImageRefFunction } from "../components/SelectImage";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";

import { Alert } from "../components/Alert";
import { selectAdminById } from "../store/admin";
import { changeProfile } from "../store/user";

interface FormAdminType
  extends RouteComponentProps<{
    isEdit: string;
    id: string;
    isEditProfile: string;
  }> {}

const Formadmin: React.FC<FormAdminType> = ({
  match: {
    params: { id, isEdit, isEditProfile },
  },
}) => {
  const isEditParam = isEdit === "true";
  const isEditProfileParam = isEditProfile === "true";
  const [hidden, sethidden] = useState(true);
  const admin = useSelector((state: stateType) => {
    const selectStore = isEditProfileParam
      ? state.user.user
      : selectAdminById(state, parseInt(id));

    return selectStore;
  });

  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
      control,
    },
    resetForm,
  } = useCustomForm(
    adminSchema,
    admin && { ...admin, password: decryptPassword(admin.password) }
  );
  const [loading, setloading] = useState(false);
  const selectImageRef = useRef<SelectImageRefFunction>();
  const title = isEditParam ? "Edit" : "Tambah";
  const router = useIonRouter();
  const [message, setmessage] = useState("");
  const [isopen, setisopen] = useState(false);

  const submit = async (value: adminSchemaType) => {
    setloading(true);
    let imageLink,
      res = null;

    try {
      if (value.foto && typeof value.foto !== "string") {
        imageLink = await uploadImagesToFirebase(value.foto);
      }

      if (isEditParam) {
        res = await fetchWithToken(`${API_URL}/api/user/update/admin`, {
          ...value,
          foto: imageLink ? imageLink : admin?.foto,
          id: admin?.id,
        });

        if (isEditProfileParam) {
          return dispatch(changeProfile(res.json));
        } else {
          return dispatch(
            updateAdmin({ id: admin?.id as any, changes: res.json as any })
          );
        }
      }

      res = await fetchWithToken(`${API_URL}/api/user/create/admin`, {
        ...value,
        foto: imageLink ? imageLink : null,
      });

      setmessage(`Berhasil Tambah admin`);
      setisopen(true);
      return dispatch(addAdmin(res.json as any));
    } catch (error) {
      setmessage("error :" + error);
      setisopen(true);
    } finally {
      if (isEditParam) {
        router.back();
      } else {
        resetForm();
        selectImageRef.current?.resetImageSrc();
        setloading(false);
      }

      showToast(`berhasil ${isEdit ? 'edit' : 'tambah'} admin`)
    }
  };

  return (
    <SecondLayout
      header={
        <SecondaryHeader
          title={title + `${isEditProfileParam ? " Profile" : " Admin"}`}
        />
      }
      title={`${title} Admin`}
    >
      <Alert message={message} isOpen={isopen} setIsOpen={setisopen} />
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex flex-col items-center gap-6"
      >
        <div className="w-full lg:w-[700px] flex justify-start items-center flex-col gap-4">
          <Controller
            name="foto"
            control={control}
            render={({ field }) => {
              return (
                <SelectImage
                  {...field}
                  errors={errors}
                  fieldName="foto"
                  labelHelper="Masukkan foto admin"
                  onChange={field.onChange}
                  value={field.value}
                  ref={selectImageRef}
                />
              );
            }}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="Nama"
            labelPlacement="floating"
            errors={errors}
            fieldName="nama"
            labelHelper="Masukkan nama admin"
            {...register("nama")}
          />
          <div className="w-full relative">
            <InputTextForm
              type={hidden ? "password" : "text"}
              fill="outline"
              label="Password"
              labelPlacement="floating"
              errors={errors}
              fieldName="password"
              labelHelper="Masukkan password admin"
              {...register("password")}
            />
            <IonIcon
              onClick={() => sethidden(!hidden)}
              icon={hidden ? eye : eyeOff}
              className="absolute top-[14px] right-4 z-10"
              size="large"
            />
          </div>
          <InputTextForm
            type="text"
            fill="outline"
            label="Email"
            labelPlacement="floating"
            errors={errors}
            fieldName="email"
            labelHelper="Masukkan email admin"
            {...register("email")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="No Telepon"
            labelPlacement="floating"
            errors={errors}
            fieldName="no_telp"
            labelHelper="Masukkan no telepon admin"
            {...register("no_telp")}
          />
          <InputTextAreaForm
            fill="outline"
            label="Alamat"
            labelPlacement="floating"
            errors={errors}
            fieldName="alamat"
            labelHelper="Masukkan Alamat admin"
            {...register("alamat")}
          />
        </div>
        <IonButton className="w-[180px] h-10" type="submit" color={"dark"}>
          {loading ? <IonSpinner name="dots" /> : title}
        </IonButton>
      </form>
    </SecondLayout>
  );
};

export default Formadmin;
