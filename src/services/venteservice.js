import Api from "./Api";

export const createVente = (data) => Api.post('/vente', data).then(res => res.data);
export const getVentes = () => Api.get('/vente').then(res => res.data);
export const updateVente = (id,data) => Api.patch('/vente/' + id, data).then(res => res.data);
export const removeVente = (id) => Api.delete('/vente/'+id).then(res => res.data);