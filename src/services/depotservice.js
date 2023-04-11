import Api from "./Api";

export const createDepot = (data) => Api.post('/depot', data).then(res => res.data);
export const getDepots = () => Api.get('/depot').then(res => res.data);
export const updateDepot = (id,data) => Api.patch('/depot/' + id, data).then(res => res.data);
export const removeDepot = (id) => Api.delete('/depot/'+id).then(res => res.data);