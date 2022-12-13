
import { forwardRef } from "react";


export const VentePrint = forwardRef(({vente},ref) => { 
const formatDate = (v) => {
  const parts = v.split('-');
  return parts.reverse().join('-')
}
 return (
 <div ref={ref} className="w-10/12 mx-auto font-print">
         <section className="py-1 bg-white">
  <div className="max-w-5xl mx-auto bg-white">
    <article className="overflow-hidden">
      <div className="bg-[white] rounded-b-md">
        <div className="p-1">
          <div className="flex items-center space-x-10">
           <div className="flex flex-col items-center justify-center space-y-1 border border-black w-2/6 print:w-3/6 rounded-md p-2">
                <h2 className="font-bold text-sm text-black"> SOCK ET FRERE</h2>
                <h2 className="font-bold text-xs text-black"> COMMERCANT IMPORT-EXPORT</h2>
                <h2 className="font-bold text-xs text-black"> vente produit cosmétique et maquillage</h2>
                <h2 className="font-bold text-xs text-black"> marche boucott ziguinchor cantine 40 </h2>
                <h2 className="font-bold text-xs text-black"> TEL 77 897 24 93 / 77 766 22 80</h2>
           </div>
           <div className="p-2 w-2/6">
          <div className="flex flex-col w-full">
            <div>
              <div className="text-xs font-bold text-black">
                {vente?.date && <p>Le : {formatDate(vente.date)}</p>}
              </div>
            </div>
            <div className="text-black">
          <div className="text-xs">
                <p className="text-xs font-semibold uppercase">Client :</p>
                <p className="text-black">PRENOM : {vente?.client?.prenom}</p>
                <p className="text-black">NOM: {vente?.client?.nom}</p>
                <p className="text-black">TEL: {vente?.client?.tel}</p>
              </div>
       </div>
          </div>
        </div>
          </div>
        </div>
       
        <div className="p-1">
          <div className="flex flex-col mx-0">
            <table className="border border-separate border-spacing-0">
              <thead>
                <tr> 
                <th scope="col" className="py-1 text-center text-xs font-bold sm:table-cell border border-slate-600">
                    Qté
                  </th>
                  <th scope="col" className="py-1 text-center text-xs font-bold  border border-slate-600">
                    Unite
                  </th>
                  <th scope="col" className="py-1  text-center text-xs font-bold border border-slate-600">
                    Désignation
                  </th>
                  <th scope="col" className="py-1 text-center text-xs font-bold  border border-slate-600">
                    PU
                  </th>
                  <th scope="col" className="py-1 text-center text-xs font-bold  border border-slate-600">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {vente?.ventes?.map((v,i)=> (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="text-xs text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.qte}
                  </td>
                  <td className="text-xs text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.produit.unite.nom}
                  </td>
                  <td className="text-xs text-center border-l border-slate-600 uppercase w-96">
                    <div className="font-bold">{v.produit.nom}</div>
                  </td>
                  <td className="text-xs text-center border-l border-r border-slate-600">
                    <div className="font-bold">{v.produit.pv}</div>
                  </td>
                  <td className="font-bold text-xs text-center border-l border-r border-slate-600">
                    {v.produit.pv * v.qte}
                  </td>
                </tr>
                ))}
               <tr className="h-16">
                <td className="sm:table-cell border-l border-r border-slate-600"></td>
                <td className="sm:table-cell border-l border-r border-slate-600"></td>
                <td className="sm:table-cell border-l border-r border-slate-600"></td>
                <td className="sm:table-cell border-l border-r border-slate-600"></td>
                <td className="sm:table-cell border-l border-r border-slate-600"></td>
               </tr>
              </tbody>
              <tfoot>
              
                <tr>
                  <th scope="row" colSpan={3} className="text-sm font-bold text-right  sm:table-cell border border-slate-600 underline px-2">
                    NET A PAYER
                  </th>
                  <th scope="row" colSpan={2} className="text-sm font-bold text-center border border-slate-600 italic">
                    {vente?.total}
                  </th>
                </tr>
                <tr>
                  <th scope="row" colSpan={2} className="text-sm font-bold text-right  sm:table-cell border border-slate-600 underline px-2">
                    AVANCE
                  </th>
                  <th scope="row"  className="text-sm font-bold text-center border border-slate-600 italic">
                    {vente?.avance}
                  </th>
                  <th scope="row" className="text-sm font-bold text-right  sm:table-cell border border-slate-600 underline px-2">
                    RESTANT
                  </th>
                  <th scope="row" className="text-sm font-bold text-center border border-slate-600 italic">
                    {vente?.restant}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </article>
  </div>
</section>

 </div>
 );

});