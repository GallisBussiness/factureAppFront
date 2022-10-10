import Api from "./Api";

export const createVente = (data) => Api.post('/facture', data).then(res => res.data);
export const getVentes = () => Api.get('/facture').then(res => res.data);
export const updateVente = (id,data) => Api.patch('/facture/' + id, data).then(res => res.data);
export const removeVente = (id) => Api.delete('/facture/'+id).then(res => res.data);