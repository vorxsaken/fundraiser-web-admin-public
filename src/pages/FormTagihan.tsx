import { FC, useRef, useState } from "react";
import { useCustomForm } from "../lib/useCustomForm";
import { tagihanSchema, tagihanSchemaType } from "../lib/zodSchema";
import SecondLayout from "../components/SecondLayout";
import SecondaryHeader from "../components/SecondaryHeader";
import InputTextForm from "../components/InputTextForm";
import { RouteComponentProps } from "react-router";
import DatePicker from "../components/DatePicker";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import SelectInputForm from "../components/SelectInputForm";
import { IonButton, IonLoading, useIonRouter } from "@ionic/react";
import Button from "../components/Button";
import { useSendForm } from "../lib/useSendForm";
import { API_URL } from "../lib/variables";
import { dispatch, stateType } from "../store";
import {
  addTagihan,
  selectTagihanById,
  tagihanType,
  updateTagihan,
} from "../store/tagihan";
import { useSelector } from "react-redux";
import { showToast } from "../lib/utils";

interface FormTagihanInterface
  extends RouteComponentProps<{ isEdit: string; id: string }> {}
const FormTagihan: FC<FormTagihanInterface> = ({
  match: {
    params: { isEdit, id },
  },
}) => {
  const [edit, setisEdit] = useState(isEdit == "true");
  const tagihan = useSelector((state: stateType) => {
    const selectStore = edit
      ? state.tagihan.entities
      : selectTagihanById(state, parseInt(id));

    return selectStore;
  }) as any;
  const {
    form: {
      handleSubmit,
      register,
      control,
      formState: { errors },
    },
    resetForm,
  } = useCustomForm(
    tagihanSchema,
    edit && {
      ...tagihan[id],
      total_tagihan: tagihan[id].total_tagihan.toString(),
      tenggat_waktu: new Date(tagihan[id]?.tenggat_waktu),
      status: { name: tagihan[id]?.status },
    }
  );

  const tagihanOptions = [{ name: "LUNAS" }, { name: "BELUM_LUNAS" }];
  const tenggatRef = useRef();
  const [loading, setloading] = useState(false);
  const router = useIonRouter();

  const submit = async (values: tagihanSchemaType) => {
    setloading(true);
    const getStatus =
      Object.entries(values.status).length > 1
        ? values.status
        : (values.status as any).name;
    const { result, error } = await useSendForm<tagihanType>(
      `${API_URL}/api/tagihan/create`,
      `${API_URL}/api/tagihan/update`,
      edit,
      {
        ...values,
        id,
        userId: id,
        status: getStatus,
      }
    );

    if (result) {
      if (!edit) {
        dispatch(addTagihan(result));
      } else {
        dispatch(updateTagihan({ id: result?.id, changes: result }));
      }

      showToast(`berhasil ${isEdit ? "edit" : "tambah"} tagihan`);
      router.goBack();
    } else {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <SecondLayout title={edit ? 'Edit Tagihan' : 'Tambah Tagihan'} header={<SecondaryHeader title={"form tagihan"} />}>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(submit)}
          className="w-full lg:w-[700px] flex flex-col gap-6 justify-start items-center"
        >
          <InputTextForm
            type="text"
            fill="outline"
            label="Judul Tagihan"
            labelPlacement="floating"
            errors={errors}
            fieldName="judul_tagihan"
            labelHelper="Masukkan judul tagihan siswa"
            {...register("judul_tagihan")}
          />
          <InputTextForm
            type="number"
            fill="outline"
            label="Total Tagihan"
            labelPlacement="floating"
            errors={errors}
            fieldName="total_tagihan"
            labelHelper="Masukkan total tagihan siswa"
            {...register("total_tagihan")}
          />
          <Controller
            name="tenggat_waktu"
            control={control}
            render={({ field }) => {
              return (
                <DatePicker
                  errors={errors}
                  fieldName="tenggat_waktu"
                  onChange={field.onChange}
                  value={field.value}
                  ref={tenggatRef}
                  labelHelper="Masukkan tenggat waktu"
                />
              );
            }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <SelectInputForm
                  errors={errors}
                  fieldName="status"
                  labelHelper="Masukkan status tagihan"
                  onChange={field.onChange}
                  options={tagihanOptions}
                  value={field.value}
                  placeholder="Pilih status"
                />
              );
            }}
          />
          <div className="w-full flex justify-center">
            <Button loading={loading} type="submit">
              {edit ? "Update" : "Tambah"}
            </Button>
          </div>
        </form>
      </div>
    </SecondLayout>
  );
};

export default FormTagihan;
