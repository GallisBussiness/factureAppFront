import { Dialog } from "primereact/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { create } from "react-modal-promise";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "@mantine/core";
import Select from "react-select";
import { useQuery } from "react-query";
import { getProduits } from "../../services/produitservice";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { getDepots } from "../../services/depotservice";

const schema = yup
  .object({
    produit: yup.object().required(),
    qte: yup.number().required(),
    depot: yup.object().required(),
  })
  .required();

function CreateEntreeStockModal({ isOpen, onResolve, onReject }) {
  const [produits, setProduits] = useState([]);
  const [depots, setDepots] = useState([]);
  const toast = useRef();
  const defaultValues = {
    qte: 1,
    produit: "",
    depot: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const qkp = ["get_Produits"];

  useQuery(qkp, () => getProduits(), {
    onSuccess: (_) => {
      const newv = _.map((c) => ({
        value: c,
        label: `${c?.unite?.nom} - ${c?.nom} `,
      }));
      setProduits(newv);
    },
  });

  const qkd = ["get_Depots"];

  useQuery(qkd, () => getDepots(), {
    onSuccess: (_) => {
      const newv = _.map((c) => ({
        value: c,
        label: c?.nom,
      }));
      setDepots(newv);
    },
  });

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onCreate = (data) => {
    const { produit, depot } = data;
    onResolve({ ...data, produit: produit.value._id, depot: depot.value._id });
  };

  return (
    <>
      <Dialog
        header="Entree de Stock"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-full md:w-1/2"
      >
        <form className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="produit" className="form-label">
              Produit
            </label>
            <Controller
              control={control}
              name="produit"
              render={({ field }) => (
                <Select {...field} options={produits} autoFocus />
              )}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="depot" className="form-label">
              Depot
            </label>
            <Controller
              control={control}
              name="depot"
              render={({ field }) => (
                <Select {...field} options={depots} autoFocus />
              )}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="qte" className="form-label">
              Quantité
            </label>
            <Controller
              control={control}
              name="qte"
              render={({ field }) => (
                <InputNumber
                  inputId="qte"
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  className="py-1 h-12"
                />
              )}
            />
            {getFormErrorMessage("qte")}
          </div>
          <div className="pt-5">
            <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
              ENREGISTRER
            </Button>
          </div>
        </form>
      </Dialog>
      <Toast ref={toast} />
    </>
  );
}

export default create(CreateEntreeStockModal);
