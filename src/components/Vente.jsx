import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { getVente } from "../services/venteservice";

function Vente() {
    const {id} = useParams()
    const qk = ['get_Vente']

    const {data: vente } = useQuery(qk, () => getVente(id));
  return (
    <>{vente?.total}</>
  )
}

export default Vente