
import { forwardRef } from "react";


export const VentePrint = forwardRef(({vente},ref) => { 
const formatDate = (v) => {
  const parts = v.split('-');
  return parts.reverse().join('-')
}
 return (
 <div ref={ref} className="w-10/12 mx-auto font-print">
         <section className="py-2 bg-white">
  <div className="max-w-5xl mx-auto bg-white">
    <article className="overflow-hidden">
      <div className="bg-[white] rounded-b-md">
        <div className="p-1">
          <div className="flex items-center space-x-10">
           <div className="flex flex-col items-center justify-center space-y-1 border border-black w-2/6 print:w-4/6 rounded-md p-2">
                <h2 className="font-bold text-sm"> SOCK ET FRERE</h2>
                <h2 className="font-bold text-sm"> COMMERCANT IMPORT-EXPORT</h2>
                <h2 className="font-bold text-sm"> vente produit cosmétique et maquillage</h2>
                <h2 className="font-bold text-sm"> marche boucott ziguinchor cantine 40 </h2>
                <h2 className="font-bold text-sm"> TEL 77 897 24 93 / 77 766 22 80</h2>
           </div>
           <div className="p-2 w-2/6">
          <div className="flex flex-col w-full">
            <div>
              <div className="text-sm font-bold text-black">
                {vente?.date && <p>Le : {formatDate(vente.date)}</p>}
              </div>
            </div>
            <div className="">
          <div className="text-sm">
                <p className="text-sm font-semibold uppercase">Client :</p>
                <p>PRENOM : {vente?.client?.prenom}</p>
                <p>NOM: {vente?.client?.nom}</p>
                <p>TEL: {vente?.client?.tel}</p>
              </div>
       </div>
          </div>
        </div>
          </div>
        </div>
       
        <div className="p-1">
          <div className="flex flex-col mx-0 mt-8">
            <table className="min-w-full border border-separate border-spacing-0">
              <thead>
                <tr> 
                <th scope="col" className="py-1 px-3 text-center text-sm font-bold sm:table-cell border border-slate-600">
                    Quantité
                  </th>
                  <th scope="col" className="py-1 pl-4 pr-3 text-center text-sm font-bold sm:pl-6 md:pl-0 border border-slate-600">
                    Unite
                  </th>
                  <th scope="col" className="py-1 pl-4 pr-3 text-center text-sm font-bold sm:pl-6 md:pl-0 border border-slate-600">
                    Désignation
                  </th>
                  <th scope="col" className="py-1 pl-4 pr-3 text-center text-sm font-bold sm:pl-6 md:pl-0 border border-slate-600">
                    Prix Unitaire
                  </th>
                  <th scope="col" className="py-1 pl-3 pr-4 text-center text-sm font-bold  sm:pr-6 md:pr-2 border border-slate-600">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {vente?.ventes?.map((v,i)=> (
                  <tr key={i} className="border-b border-slate-200">
                    <td className=" px-1 py-1 text-sm text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.qte}
                  </td>
                  <td className="px-1 text-sm text-center font-bold sm:table-cell border-l border-r border-slate-600 uppercase underline">
                    {v.produit.unite.nom}
                  </td>
                  <td className="py-1 pl-4 pr-3 text-sm sm:pl-6 text-center md:pl-0 border-l border-r border-slate-600 uppercase">
                    <div className="font-bold text-slate-700">{v.produit.nom}</div>
                  </td>
                  <td className=" pl-4 pr-3 text-sm sm:pl-6 text-center md:pl-0 border-l border-r border-slate-600">
                    <div className="font-bold text-slate-700">{v.produit.pv} FCFA</div>
                  </td>
                  <td className="pl-4 pr-3 font-bold text-sm text-center sm:pr-6 md:pr-2 border-l border-r border-slate-600">
                    {v.produit.pv * v.qte} FCFA
                  </td>
                </tr> 
                ))}
               
              </tbody>
              <tfoot>
              
                <tr>
                  <th scope="row" colSpan={3} className="pt-2 pl-6 pr-3 text-sm font-bold text-right text-slate-700 sm:table-cell md:pl-0 border border-slate-600 underline">
                    NET A PAYER
                  </th>
                  <th scope="row" colSpan={2} className="pt-2 pl-3 pr-4 text-lg font-bold text-center text-slate-700 sm:pr-6 md:pr-2  border border-slate-600 italic">
                    {vente?.total} FCFA
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