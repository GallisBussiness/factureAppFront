import { formatISO} from "date-fns"
import { Calendar } from "primereact/calendar"
import { useState } from "react"
import { useMutation } from "react-query"
import { getVentesByDate } from "../services/venteservice"

function Stats() {
    const [curDate,setCurDate] = useState(formatISO(new Date(),{ representation: 'date' }))
    const [total,setTotal] = useState(0)
    const {data: Ventes,mutate: getVentes } = useMutation((data) => getVentesByDate(data), {
        onSuccess: (_) => {
            const to = _.reduce((acc,cur) => acc + cur.total,0)
            setTotal(to)
        }
    });
    console.log(Ventes)

    const getVentesForDate = (v) => {
    const f = formatISO(v,{ representation: 'date' })
    setCurDate(f);
    getVentes({date: f});
    }
  return (
    <>
      <div className="flex flex-wrap mt-3 -mx-3">
  <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
    <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
      <div className="flex-auto p-4">
        <div className="flex flex-wrap -mx-3">
          <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
            <div className="flex items-center justify-center h-full">
              <h5 className="font-bold text-3xl">Rapports Ventes</h5>
              <img className="relative z-20 w-32 pt-6 h-32" src="/img/repports.png" alt="Repports" />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</div>
        <div>
            <div className="flex h-screen">
                <div className="w-4/12 border-l-slate-900 mx-10">
                <Calendar value={curDate} onChange={(e) => getVentesForDate(e.value)} inline />
                </div>
               <div className="w-8/12">
               <div className="p-1">
          <div className="flex flex-col mx-0 mt-8">
            <table className="min-w-full border border-separate border-spacing-0">
              <thead>
                <tr> 
                <th scope="col" className="py-1 px-3 text-center text-sm font-bold sm:table-cell border border-slate-600">
                    Date
                  </th>
                  <th scope="col" className="py-1 pl-4 pr-3 text-center text-sm font-bold sm:pl-6 md:pl-0 border border-slate-600">
                    Prénom client
                  </th>
                  <th scope="col" className="py-1 pl-4 pr-3 text-center text-sm font-bold sm:pl-6 md:pl-0 border border-slate-600">
                    Nom Client
                  </th>
                  <th scope="col" className="py-1 pl-3 pr-4 text-center text-sm font-bold  sm:pr-6 md:pr-2 border border-slate-600">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {Ventes?.map((v,i)=> (
                  <tr key={i} className="border-b border-slate-200">
                    <td className=" px-1 py-1 text-sm text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.date}
                  </td>
                  <td className="px-1 text-sm text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.client.prenom}
                  </td>
                  <td className="py-1 pl-4 pr-3 text-sm sm:pl-6 text-center md:pl-0 border-l border-r border-slate-600 uppercase">
                    <div className="font-bold text-slate-700">{v.client.nom}</div>
                  </td>
                  <td className="pl-4 pr-3 font-bold text-sm text-center sm:pr-6 md:pr-2 border-l border-r border-slate-600">
                    {v.total} FCFA
                  </td>
                </tr> 
                ))}
               
              </tbody>
              <tfoot>
              
                <tr>
                  <th scope="row" colSpan={3} className="pt-2 pl-6 pr-3 text-sm font-bold text-right text-slate-700 sm:table-cell md:pl-0 border border-slate-600 underline">
                    TOTAL VENDU
                  </th>
                  <th scope="row" colSpan={2} className="pt-2 pl-3 pr-4 text-lg font-bold text-center text-slate-700 sm:pr-6 md:pr-2  border border-slate-600 italic">
                    {total} FCFA
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
               </div>
            </div>

        </div>
    </>
  )
}

export default Stats