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
import { siswaSchema, siswaSchemaType } from "../lib/zodSchema";
import { eye, eyeOff } from "ionicons/icons";
import { IonButton, IonIcon, IonSpinner, useIonRouter } from "@ionic/react";
import { Controller } from "react-hook-form";
import SelectImage from "../components/SelectImage";
import InputTextAreaForm from "../components/InputTextAreaForm";
import { API_URL } from "../lib/variables";
import { addSiswa, selectSiswaById, updateSiswa } from "../store/siswa";
import { SelectImageRefFunction } from "../components/SelectImage";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";
import { Alert } from "../components/Alert";

interface FormSiswaType
  extends RouteComponentProps<{ isEdit: string; id: string }> {}

const FormSiswa: React.FC<FormSiswaType> = ({ match }) => {
  const [isEdit, setisEdit] = useState(match.params.isEdit === "true");
  const [hidden, sethidden] = useState(true);
  const siswa = useSelector((state: stateType) =>
    selectSiswaById(state, parseInt(match.params.id))
  );
  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
      control,
    },
    resetForm,
  } = useCustomForm(
    siswaSchema,
    siswa && { ...siswa, password: decryptPassword(siswa.password) }
  );
  const [loading, setloading] = useState(false);
  const selectImageRef = useRef<SelectImageRefFunction>();
  const title = isEdit ? "edit" : "tambah";
  const router = useIonRouter();
  const [message, setmessage] = useState("");
  const [isopen, setisopen] = useState(false);

  const submit = async (value: siswaSchemaType) => {
    setloading(true);
    let imageLink,
      res = null;

    try {
      if (value.foto && typeof value.foto !== "string") {
        imageLink = await uploadImagesToFirebase(value.foto);
      }

      if (isEdit) {
        res = await fetchWithToken(`${API_URL}/api/user/update/siswa`, {
          ...value,
          foto: imageLink ? imageLink : siswa.foto,
          id: siswa.id,
        });

        return dispatch(
          updateSiswa({ id: siswa.id, changes: res.json as any })
        );
      }

      res = await fetchWithToken(`${API_URL}/api/user/create/siswa`, {
        ...value,
        foto: imageLink ? imageLink : null,
      });

      setmessage(`Berhasil Tambah Siswa`);
      setisopen(true);
      return dispatch(addSiswa(res.json as any));
    } catch (error) {
      setmessage("error :" + error);
      setisopen(true);
    } finally {
      if (isEdit) {
        router.back();
      } else {
        resetForm();
        selectImageRef.current?.resetImageSrc();
        setloading(false);
      }
      showToast(`berhasil ${isEdit ? 'edit' : 'tambah'} siswa`)
    }
  };  

  return (
    <SecondLayout title={`${title} Siswa`} header={<SecondaryHeader title={title + " siswa"} />} >
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
                  labelHelper="Masukkan foto murid"
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
            labelHelper="Masukkan nama siswa"
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
              labelHelper="Masukkan password siswa"
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
            labelHelper="Masukkan email siswa"
            {...register("email")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="No Telepon"
            labelPlacement="floating"
            errors={errors}
            fieldName="no_telp"
            labelHelper="Masukkan no telepon siswa"
            {...register("no_telp")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="Nis"
            labelPlacement="floating"
            errors={errors}
            fieldName="nis"
            labelHelper="Masukkan nis siswa"
            {...register("nis")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="Kelas"
            labelPlacement="floating"
            errors={errors}
            fieldName="kelas"
            labelHelper="Masukkan kelas siswa"
            {...register("kelas")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="Tingkat"
            labelPlacement="floating"
            errors={errors}
            fieldName="tingkat"
            labelHelper="Masukkan tingkat siswa"
            {...register("tingkat")}
          />
          <InputTextForm
            type="text"
            fill="outline"
            label="Angkatan"
            labelPlacement="floating"
            errors={errors}
            fieldName="angkatan"
            labelHelper="Masukkan tingkat siswa"
            {...register("angkatan")}
          />
          <InputTextAreaForm
            fill="outline"
            label="Alamat"
            labelPlacement="floating"
            errors={errors}
            fieldName="alamat"
            labelHelper="Masukkan Alamat siswa"
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

export default FormSiswa;
