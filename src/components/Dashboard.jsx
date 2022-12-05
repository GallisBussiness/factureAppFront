import { useAuthUser } from "react-auth-kit"
import { useQuery} from "react-query"
import { Route, Routes } from "react-router-dom"
import { getAuth } from "../services/authservice"
import { Navbar } from "./atomes/Navbar"
import Client from "./Client"
import Clients from "./Clients"
import Fournisseur from "./Fournisseur"
import Fournisseurs from "./Fournisseurs"
import GlobalLoadingIndicator from "./GlobalIsFetchingInd"
import Produits from "./Produits"
import { Profil } from "./Profil"
import Stats from "./Stats"
import Unites from "./Unites"
import Users from "./Users"
import Vente from "./Vente"
import VenteDetail from "./VenteDetail"
import Ventes from "./Ventes"

const Dashboard = () => {

 
  const auth = useAuthUser()();
  const qk = ['auth',auth?.id]
  const {data} = useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus:false,
  })

  return (
    <div className="overflow-x-hidden">
      <GlobalLoadingIndicator />
    <Navbar />
     <Routes>
     <Route path="" element={<Ventes auth={data} />} />
     <Route path="profil" element={<Profil auth={data}/>} />
     <Route path="users" element={<Users auth={data}/>} />
     <Route path="stats" element={<Stats auth={data}/>} />
     <Route path="facturations" element={<Ventes auth={data}/>} />
     <Route path="details" element={<VenteDetail auth={data}/>} />
     <Route path="unites" element={<Unites auth={data}/>} />
     <Route path="ventes/:id" element={<Vente/>} />
     <Route path="clients" element={<Clients auth={data}/>} />
     <Route path="clients/:id" element={<Client auth={data}/>} />
     <Route path="fournisseurs" element={<Fournisseurs auth={data}/>} />
     <Route path="fournisseurs/:id" element={<Fournisseur auth={data}/>} />
     <Route path="produits" element={<Produits auth={data}/>} />
     </Routes>
    </div>
  )
}

export default Dashboard