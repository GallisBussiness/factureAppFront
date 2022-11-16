import { useParams } from "react-router-dom"
import { getFactureAchatByFournisseur } from "../services/facture-achat-service";
import { getFournisseur } from "../services/fournisseurservice";
import { FilterMatchMode } from 'primereact/api'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { GiMoneyStack } from 'react-icons/gi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import ModalContainer from 'react-modal-promise'
import { InputText } from 'primereact/inputtext'
import { BsFillPenFill } from 'react-icons/bs'
import CreateFactureAchatModal from './modals/CreateFactureAchatModal'
import UpdateFactureAchatModal from './modals/UpdateFactureAchatModal'
import UpdateFactureAchatPaymentModal from './modals/UpdateFactureAchatPaymentModal'
import './datatable.css'
import { createFactureAchat, removeFactureAchat, updateFactureAchat } from '../services/facture-achat-service'
import ConfirmDelete from './modals/ConfirmDelete'
import { MdDelete } from 'react-icons/md'

function Fournisseur() {

  const {id} = useParams()
  const qk = ['get_Fournisseur',id]
  const qkf = ['get_facture_by_fournisseur', id];
  const {data: fournisseur } = useQuery(qk, () => getFournisseur(id));
  const {data: factures, isLoading } = useQuery(qkf, () => getFactureAchatByFournisseur(id));
  const [selectedFactureAchats, setSelectedFactureAchats] = useState(null);
  const qc = useQueryClient()
  const toast = useRef();
  const [filters, setFilters] = useState({
      'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };
      _filters['global'].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
  }

  const {mutate: create} = useMutation((data) => createFactureAchat(data), {
      onSuccess: (_) => {
      toast.current.show({severity: 'success', summary: 'Creation Facture', detail: 'Création réussie !!'});
       qc.invalidateQueries(qkf);
      },
      onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Create facture', detail: 'Creation échouée !!'});
      }
  })

  const {mutate: update} = useMutation((data) => updateFactureAchat(data._id, data.data), {
      onSuccess: (_) => {
          toast.current.show({severity: 'success', summary: 'Mise à jour Facture', detail: 'Mis à jour réussie !!'});
          qc.invalidateQueries(qkf);
          
         },
         onError: (_) => {
          toast.current.show({severity: 'error', summary: 'Mis à jour Facture', detail: 'Mis à jour échouée !!'});
         }
  })

  const {mutate: deleteV} = useMutation((id) => removeFactureAchat(id), {
    onSuccess: (_) => {
    toast.current.show({severity: 'success', summary: 'Suppréssion Facture', detail: 'Suppréssion réussie !!'});
     qc.invalidateQueries(qkf);
    },
    onError: (_) => {
        toast.current.show({severity: 'error', summary: 'Suppréssion Facture', detail: 'Suppréssion échouée !!'});
    }
})

  const leftToolbarTemplate = () => {
      return (
          <div className="flex items-center justify-center space-x-2">
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleCreateFactureAchat()} >Nouveau <AiOutlinePlus className="h-6 w-6 text-white inline"/></button>
              <button className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-red-700 to-red-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" onClick={() => handleDelete()} disabled={!selectedFactureAchats || !selectedFactureAchats.length}>Supprimer <MdDelete className="h-6 w-6 text-white inline"/></button>
          </div>
      )
  }


  const handleUpdateFactureAchat = (d) => {
      UpdateFactureAchatModal({factureAchat: d,fournisseur: id}).then((d => {
          const {_id,...rest} = d;
          update({_id,data: rest});
      }));
  }

  const handleCreateFactureAchat = () => {
      CreateFactureAchatModal({fournisseur: id}).then(create);
  }

  const handleDelete = async () => {
    const resconfirm = await ConfirmDelete();
    if(resconfirm) {
        for(let i = 0; i < selectedFactureAchats?.length; i++) {
         deleteV(selectedFactureAchats[i]?._id);
      }
    }
  }

  const handlePayment = (d) => {
    UpdateFactureAchatPaymentModal({factureAchat: d,fournisseur: id}).then((d => {
      const {_id,...rest} = d;
      update({_id,data: rest});
  }));
  }

  const renderHeader = () => {
      return (
          <div className="flex justify-between items-center">
              <h5 className="m-0">Liste des Factures</h5>
              <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
              </span>
          </div>
      )
  }

  
  const formatDate = (v) => {
    const parts = v.split('-');
    return parts.reverse().join('-')
  }

const dateBodyTemplate = (rowData) => {
    return formatDate(rowData.date);
}

  const fournisseurTemplate = (row) => `${row.fournisseur.prenom} ${row.fournisseur.nom}`;

  const payeTemplate = (row) => {
    const classs = row.total > row.avance ? "bg-amber-500 text-white font-bold px-4 py-2 rounded-md text-center" : "bg-green-500 text-white font-bold px-4 py-2 rounded-md text-center";
   return  <>
    <div className={classs}>{row.avance}</div>
    </>
};

const restantTemplate = (row) => {
  const classs = row.restant > 0 ? "bg-amber-500 text-white font-bold px-4 py-2 rounded-md text-center" : "bg-green-500 text-white font-bold px-4 py-2 rounded-md text-center";
 return  <>
  <div className={classs}>{row.restant}</div>
  </>
};

  const actionBodyTemplate = (rowData) => {
      return <div className="flex items-center justify-center space-x-1">
      <button type="button" onClick={() => handleUpdateFactureAchat(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-amber-700 to-amber-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><BsFillPenFill className="text-white inline"/></button>
      <button type="button" onClick={() => handlePayment(rowData)} className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-green-700 to-green-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs" ><GiMoneyStack className="text-white inline"/></button>
      </div>;
      
  }

  const header = renderHeader();

  return (
    <>
    <div className="flex flex-wrap mt-6 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-auto min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex items-center justify-around flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
              <h5 className="font-bold text-3xl">{fournisseur?.prenom} {fournisseur?.nom} {fournisseur?.tel}</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/img/fournisseur.png" alt="fOURNISSEUR" />
            </div>
          </div>
        </div>
       
      </div>
      
    </div>
  </div>
</div>

<div className="datatable-doc mt-4 w-4/5 mx-auto">
            <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable value={factures} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="_id" rowHover selection={selectedFactureAchats} onSelectionChange={e => setSelectedFactureAchats(e.value)}
                    filters={filters} filterDisplay="menu" loading={isLoading} responsiveLayout="scroll"
                    globalFilterFields={['date', 'fournisseur.nom']} emptyMessage="Aucune Facture trouvée"
                    currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Factures" size="small">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="date" header="Date" body={dateBodyTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column field="fournisseur.nom" header="Founisseur" body={fournisseurTemplate} sortable style={{ minWidth: '14rem' }} />
                    <Column field="total" header="Total" sortable  style={{ minWidth: '8rem' }}/>
                    <Column field="avance" header="Payé" body={payeTemplate} sortable  style={{ minWidth: '8rem' }}/>
                    <Column field="restant" header="Restant" body={restantTemplate} sortable  style={{ minWidth: '8rem' }}/>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
        <Toast ref={toast} />
    <ModalContainer />
    </>
  )
}

export default Fournisseur