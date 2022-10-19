import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdDelete } from 'react-icons/md';
import { getProduits } from '../services/produitservice';
import { useQuery } from 'react-query';
import Select from 'react-select'

const schema = yup.object({
    produit: yup.object().required(),
    qte: yup.number(),
  }).required();

function AddVentes({ventes,setVente}) {
  const [produits,setProduits] = useState([])
 const [curVentes,setCurVentes] = useState(ventes);
    const defaultValues = {
        qte: 1,
        produit: ''};
const {control, handleSubmit,setFocus, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});


const qkp = ['get_Produits']

     useQuery(qkp, () => getProduits(), {
      onSuccess: (_) => {
        const newv = _.map(c => ({value:c,label: `${c?.nom} - ${c?.pv}`}));
        setProduits(newv);
    } 
    });

const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};
const actionBodyTemplate = (rowData) => {
  return <div className="flex items-center justify-center space-x-1">
  <button type="button" onClick={() => deleteVente(rowData)}  className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><MdDelete className="text-white inline"/></button>
  </div>;
  
}


  const deleteVente = (row) => {
    const rest = curVentes.filter(v => v.produit.value.nom !== row.produit.value.nom )
    setCurVentes(rest);
    setFocus('produit');
  }

  const addProduct = data => {
    setCurVentes(cur => ([...cur,data]))
    setVente('ventes', [...curVentes,data]);
    setFocus('produit');
  };

  const totalTemplate = (rowData) => {
    const {qte} = rowData;
    return (+qte) * (+rowData.produit.value.pv);
  }

  return (
    <>
    <form  className="flex flex-col space-y-1 md: md:flex-row md:space-x-1 md:space-y-0" onSubmit={handleSubmit(addProduct)} method="POST">
    <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="produit" className="form-label">Produit</label>
              <Controller control={control} name="produit" render={({field}) => (
                    <Select
                    {...field}
                    options={produits}
                    autoFocus
                  />
              )} />
              {getFormErrorMessage('produit')} 
            </div>
            <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="qte" className="form-label">Quantité</label>
              <Controller control={control} name="qte" render={({field}) => (
                  <InputNumber inputId="qte" value={field.value} onValueChange={(e) => field.onChange(e.value)} className="py-1 h-12"  />
              )} />
              {getFormErrorMessage('qte')} 
            </div>
            <div className="self-end">
            <Button type="submit"  icon="pi pi-plus" style={{padding: '6px 0',marginBottom: '4px'}}  />
            </div>
            
          </form>

          <div className="my-2">
            
          <DataTable value={curVentes} rows={10}
                     rowsPerPageOptions={[10,25,50]}
                     size="small"
                    dataKey="produit.nom" rowHover 
                    responsiveLayout="scroll"
                    emptyMessage="Aucun Produit trouvé"
                    >
                    
                    <Column field="produit.value.nom" header="Produit" sortable style={{ minWidth: '14rem' }} />
                    <Column field="qte" header="Quantité" sortable style={{ minWidth: '14rem' }} />
                    <Column header="Total" sortable body={totalTemplate} style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
          </div>
      
    </>
  )
}

export default AddVentes;