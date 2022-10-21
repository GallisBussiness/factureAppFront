import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { forwardRef } from "react";


export const VentePrint = forwardRef(({vente},ref) => { 

    const formatDate = (value) => {
        return format(parseISO(value),'dd MMMM yyyy', {
            locale: fr,
        });
    }

 return (
 <div ref={ref} className="w-full mx-auto">
         <section className="py-5 bg-white">
  <div className="max-w-5xl mx-auto bg-white">
    <article className="overflow-hidden">
      <div className="bg-[white] rounded-b-md">
        <div className="p-2">
          <div className="flex items-center space-x-4">
           <div className="flex flex-col items-center justify-center space-y-1 border border-black w-2/5 rounded-md p-2 text-justify">
                <h2 className="font-bold text-sm"> SOCK ET FRERE</h2>
                <h2 className="font-bold text-sm"> COMMERCANT IMPORT-EXPORT</h2>
                <h2 className="font-bold text-sm"> vente produit cosmétique et maquillage</h2>
                <h2 className="font-bold text-sm"> cheveux naturel et des perruques naturelles</h2>
                <h2 className="font-bold text-sm"> closure frontal en gros et detail</h2>
                <h2 className="font-bold text-sm"> marche boucott ziguinchor cantine 40 </h2>
                <h2 className="font-bold text-sm"> TEL 77 897 24 93 / 77 766 22 80</h2>
           </div>
           <div className="p-2 w-2/5">
          <div className="flex w-full">
            <div>
              <div className="text-lg font-bold text-black">
                {vente?.date && <p>Facturé le: {formatDate(vente.date)}</p>}
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
       <div className="p-5">
       <div className="text-sm font-bold">
                <p className="text-lg font-bold black uppercase">Client :</p>
                <p className="font-semibold">PRENOM : {vente?.client?.prenom}</p>
                <p  className="font-semibold">NOM: {vente?.client?.nom}</p>
                <p  className="font-semibold">TEL: {vente?.client?.tel}</p>
              </div>
       </div>
        <div className="p-5">
          <div className="flex flex-col mx-0 mt-8">
            <table className="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold sm:pl-6 md:pl-0">
                    Description
                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold sm:pl-6 md:pl-0">
                    Unite
                  </th>
                  <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-bold sm:table-cell">
                    Quantité
                  </th>
      
                  <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-bold  sm:pr-6 md:pr-0">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {vente?.ventes?.map((v,i)=> (
                  <tr key={i} className="border-b border-slate-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-bold text-slate-700">{v.produit.nom}</div>
                  </td>
                  <td className="px-3 py-4 text-sm font-bold sm:table-cell">
                    {v.produit.unite.nom}
                  </td>
                  <td className=" px-3 py-4 text-sm font-bold text-right  sm:table-cell">
                    {v.qte}
                  </td>
                  <td className="py-4 pl-3 pr-4 font-bold text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    {v.produit.pv} FCFA
                  </td>
                </tr> 
                ))}
               
              </tbody>
              <tfoot>
              
                <tr>
                  <th scope="row" colSpan={3} className="pt-4 pl-6 pr-3 text-sm font-bold text-right text-slate-700 sm:table-cell md:pl-0">
                    NET A PAYER
                  </th>
                  <td className="pt-4 pl-3 pr-4 text-lg font-bold text-right text-slate-700 sm:pr-6 md:pr-0">
                    {vente?.total} FCFA
                  </td>
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