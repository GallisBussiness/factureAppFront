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
 <div ref={ref} className="w-2/6 mx-auto">
         <section className="py-20 bg-gray-200">
  <div className="max-w-5xl mx-auto py-16 bg-white">
    <article className="overflow-hidden">
      <div className="bg-[white] rounded-b-md">
        <div className="p-9">
          <div className="space-y-6 text-slate-700">
            <img className="object-cover h-20 w-32" src="/img/logo.png" alt="logo"/>
            <p className="text-xl font-extrabold tracking-tight uppercase font-body">
              TOUBA DAROU COSMETIQUE
            </p>
          </div>
        </div>
        <div className="p-9">
          <div className="flex w-full">
            <div className="grid grid-cols-4 gap-12">
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">
                  Détail de la facture:
                </p>
                {vente?.date && <p>Facturé le: {formatDate(vente.date)}</p>}
              </div>
              <div className="text-sm font-light text-slate-500">
                <p className="text-sm font-normal text-slate-700">Client :</p>
                <p>PRENOM : {vente?.client?.prenom}</p>
                <p>NOM: {vente?.client?.nom}</p>
                <p>TEL: {vente?.client?.tel}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-9">
          <div className="flex flex-col mx-0 mt-8">
            <table className="min-w-full divide-y divide-slate-500">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                    Description
                  </th>
                  <th scope="col" className="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                    Quantité
                  </th>
      
                  <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                    Montant
                  </th>
                </tr>
              </thead>
              <tbody>
                {vente?.ventes?.map((v,i)=> (
                  <tr key={i} className="border-b border-slate-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="font-medium text-slate-700">{v.produit.nom}</div>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                    {v.qte}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                    {v.produit.pv} FCFA
                  </td>
                </tr> 
                ))}
               
              </tbody>
              <tfoot>
              
                <tr>
                  <th scope="row" colSpan={3} className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                    Total
                  </th>
                  <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                    Total
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