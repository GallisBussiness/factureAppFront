import Api from "./Api";

export const createProduit = (data) => Api.post('/produit', data).then(res => res.data);
export const getProduits = () => Api.get('/produit').then(res => res.data);
export const updateProduit = (id,data) => Api.patch('/produit/' + id, data).then(res => res.data);
export const removeProduit = (id) => Api.delete('/produit/'+id).then(res => res.data);