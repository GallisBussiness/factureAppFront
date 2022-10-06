import { useAuthUser } from "react-auth-kit"
import { useQuery} from "react-query"
import { Route, Routes } from "react-router-dom"
import { getAuth } from "../services/authservice"
import { Navbar } from "./atomes/Navbar"
import { Profil } from "./Profil"
import Users from "./Users"

const Dashboard = () => {

 
  const auth = useAuthUser()();
  const qk = ['auth',auth?.id]
  const {data} = useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus:false,
  })

  return (
    <div className="overflow-x-hidden">
    <Navbar />
     <Routes>
     <Route path="" element={<Profil auth={data} />} />
     <Route path="profil" element={<Profil auth={data}/>} />
     <Route path="users" element={<Users auth={data}/>} />
     </Routes>
    </div>
  )
}

export default Dashboard