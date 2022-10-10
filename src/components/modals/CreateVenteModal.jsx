import { Dialog } from 'primereact/dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { create } from 'react-modal-promise'
import { Calendar } from 'primereact/calendar';
import { parseISO } from 'date-fns';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getClients } from '../../services/clientservice';

const schema = yup.object({
    date: yup.string()
    .required(),
    client: yup.string()
    .required(),
  }).required();


function CreateventeModal({ isOpen, onResolve, onReject }) {
     const [clients,setClients] = useState([])
    const qkc = ['get_Clients']

    useQuery(qkc, () => getClients(), {
        onSuccess: (_) => {
            const newcl = _.map(c => ({...c,full: `${c.prenom} - ${c.nom} - ${c.tel}`}));
            setClients(newcl);
        } 
    });

    const defaultValues = {date: new Date().toISOString()};
    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      defaultValues
    });

    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const onCreate = data => {
      onResolve(data);
    };

  return (
    <>
        <Dialog header="Creer un Facture" visible={isOpen} onHide={() => onReject(false)} className="w-1/2">
    <form  className="mb-3" onSubmit={handleSubmit(onCreate)} method="POST">
    <div className="mb-3 flex flex-col space-y-2">
            <label htmlFor="date" className="form-label">Date De la Facture </label>
            <Controller control={control} name="date" render={({field}) => (
            <Calendar id="date" value={parseISO(field.value)} onChange={(e) => field.onChange(e.value.toISOString())} showTime showSeconds dateFormat="dd/mm/yyyy"  placeholder="Date De La Facture"/>
             )}/>
              {getFormErrorMessage('date')} 
            </div>
            <div className="mb-3 flex flex-col justify-center">
            <label htmlFor="client" className="form-label">Client</label>
              <Controller control={control} name="client" render={({field}) => (
                  <Dropdown className="w-full" optionLabel="full" optionValue="_id" value={field.value} options={clients} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez le client"/>
              )} />
              {getFormErrorMessage('client')} 
            </div>
            <button  type="submit" className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer
              bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in
               tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85
                hover:shadow-soft-xs mr-2"> CREER</button>
            <button onClick={() => onReject(false)} className="inline-block px-6 py-3 font-bold text-center
             text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl
              from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md
               bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"> ANNULER</button>
          </form>
  </Dialog>
    </>
  )
}

export default create(CreateventeModal)