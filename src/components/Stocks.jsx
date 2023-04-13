import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ModalContainer from "react-modal-promise";
import { InputText } from "primereact/inputtext";
import CreateEntreeStockModal from "./modals/CreateEntreeStockModal";
import CreateSortieStockModal from "./modals/createSortieStockModal";
import "./datatable.css";
import { EntreeStock, SortieStock, getStocks } from "../services/stockservice";
import { format, parseISO } from "date-fns";
import { LoadingOverlay } from "@mantine/core";
import { Dropdown } from "primereact/dropdown";
import { getUnites } from "../services/uniteservice";
import { getDepots } from "../services/depotservice";

function Stocks() {
  const [selectedStocks, setSelectedStocks] = useState(null);
  const [unites, setUnites] = useState([]);
  const [depots, setDepots] = useState([]);
  const [tQte, setTQte] = useState(0);
  const qc = useQueryClient();
  const toast = useRef();
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "produit.unite.nom": { value: null, matchMode: FilterMatchMode.EQUALS },
    "depot.nom": { value: null, matchMode: FilterMatchMode.EQUALS },
    type: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const qk = ["get_Stocks"];
  const qku = ["get_Unites"];

  useQuery(qku, () => getUnites(), {
    onSuccess: (_) => {
      const units = _.map((u) => u.nom);
      setUnites(units);
    },
  });

  const qkd = ["get_Depots"];

  useQuery(qkd, () => getDepots(), {
    onSuccess: (_) => {
      const units = _.map((u) => u.nom);
      setDepots(units);
    },
  });

  const { data: Stocks, isLoading } = useQuery(qk, () => getStocks(), {
    onSuccess: (_) => calculQte(_),
  });
  const { mutate: Entree, isLoading: isLoadingE } = useMutation(
    (data) => EntreeStock(data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Creation Stock",
          detail: "Création réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Create Stock",
          detail: "Creation échouée !!",
        });
      },
    }
  );

  const { mutate: Sortie, isLoading: isLoadingS } = useMutation(
    (data) => SortieStock(data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Creation Stock",
          detail: "Création réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Create Stock",
          detail: "Creation échouée !!",
        });
      },
    }
  );

  const leftToolbarTemplate = () => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-blue-700 to-blue-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
          onClick={() => handleCreateStock()}
        >
          ENTREE <AiOutlinePlus className="h-6 w-6 text-white inline" />
        </button>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          className="inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-amber-700 to-amber-300 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs"
          onClick={() => handleSortieStock()}
        >
          SORTIE <AiOutlinePlus className="h-6 w-6 text-white inline" />
        </button>
        <div>
          <div className="text-lg font-bold text-black mx-10 p-2 border">
            {" "}
            Total QTE: {tQte}
          </div>
        </div>
      </div>
    );
  };

  const handleSortieStock = () => {
    CreateSortieStockModal().then(Sortie);
  };

  const handleCreateStock = () => {
    CreateEntreeStockModal().then(Entree);
  };

  const dateTemplate = (row) => format(parseISO(row?.createdAt), "dd/MM/yyyy");

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Liste des Stocks</h5>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Rechercher ..."
          />
        </span>
      </div>
    );
  };

  const calculQte = (values) => {
    const entree = values
      .filter((v) => v.type === "ENTREE")
      .reduce((acc, v) => acc + v?.qte, 0);
    const sortie = values
      .filter((v) => v.type === "SORTIE")
      .reduce((acc, v) => acc + v?.qte, 0);
    const qts = entree - sortie;
    setTQte(qts);
  };

  const uniteFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={unites}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const depotFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={depots}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const mouvementFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={["ENTREE", "SORTIE"]}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const header = renderHeader();
  return (
    <>
      <LoadingOverlay
        visible={isLoading || isLoadingE || isLoadingS}
        overlayBlur={2}
      />
      <div className="flex flex-wrap mt-6 -mx-3">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                  <div className="flex items-center justify-center h-full">
                    <h5 className="font-bold text-3xl">Gestion des Stocks</h5>
                    <img
                      className="relative z-20 w-32 pt-6 h-32 animate-bounce"
                      src="/img/stock.png"
                      alt="Stocks"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="datatable-doc mt-4 w-4/5 mx-auto">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            value={Stocks}
            paginator
            className="p-datatable-customers"
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="_id"
            rowHover
            selection={selectedStocks}
            onSelectionChange={(e) => setSelectedStocks(e.value)}
            filters={filters}
            onValueChange={calculQte}
            filterDisplay="row"
            loading={isLoading}
            responsiveLayout="scroll"
            globalFilterFields={["produit.nom", "produit.unite.nom"]}
            emptyMessage="Aucun Stock trouvé"
            currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Stocks"
            size="small"
          >
            <Column
              field="depot.nom"
              header="Depot"
              filter
              filterElement={depotFilterTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="type"
              header="Mouvement"
              filter
              filterElement={mouvementFilterTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />

            <Column
              field="createdAt"
              header="Date"
              body={dateTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="produit.nom"
              header="Produit"
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="produit.unite.nom"
              header="Unite"
              filter
              filterElement={uniteFilterTemplate}
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="qte"
              header="Qte"
              sortable
              style={{ minWidth: "8rem" }}
            />
          </DataTable>
        </div>
      </div>
      <Toast ref={toast} />
      <ModalContainer />
    </>
  );
}

export default Stocks;
