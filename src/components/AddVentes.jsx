import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MdDelete } from 'react-icons/md';
import { getProduits } from '../services/produitservice';
import { useQuery } from 'react-query';

const schema = yup.object({
    produit: yup.string().required(),
    qte: yup.number(),
  }).required();

function AddVentes({ventes,setVente}) {
  const [produits,setProduits] = useState([])
 const [curVentes,setCurVentes] = useState(ventes);
    const defaultValues = { medicament: '',
        qte: 1,
        produit: ''};
const {control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  defaultValues
});


const qkp = ['get_Produits']

     useQuery(qkp, () => getProduits(), {
      onSuccess: (_) => {
        const newv = _.map(c => ({...c,full: `${c?.nom} - ${c?.pv}`}));
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
    const rest = curVentes.filter(v => v.produit.nom !== row.produit.nom )
    setCurVentes(rest)
  }

  const addProduct = data => {
    setCurVentes(cur => ([...cur,data]))
    setVente('ventes', curVentes);
  };

  return (
    <>
    <form  className="flex flex-col space-y-1 md: md:flex-row md:space-x-1 md:space-y-0" onSubmit={handleSubmit(addProduct)} method="POST">
    <div className="flex flex-col w-full">
            <label htmlFor="produit" className="form-label">Produit</label>
              <Controller control={control} name="produit" render={({field}) => (
                  <Dropdown className="w-full" optionLabel="full" value={field.value} options={produits} onChange={(e) => field.onChange(e.value)} placeholder="Selectionnez un produit"/>
              )} />
              {getFormErrorMessage('produit')} 
            </div>
            <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="qte" className="form-label">Quantité</label>
              <Controller control={control} name="qte" render={({field}) => (
                  <InputNumber inputId="vertical" value={field.value} onValueChange={(e) => field.onChange(e.value)} showButtons buttonLayout="horizontal"
                  decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
              )} />
              {getFormErrorMessage('qte')} 
            </div>
            <div className="self-end">
            <Button type="button" icon="pi pi-plus" />
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
                    
                    <Column field="produit.nom" header="Produit" sortable style={{ minWidth: '14rem' }} />
                    <Column field="qte" header="Quantité" sortable style={{ minWidth: '14rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
          </div>
      
    </>
  )
}

export default AddVentes;