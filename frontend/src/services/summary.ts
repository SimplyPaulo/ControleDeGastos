import api from '../services/api';

const summary = async () => {
    try {
        const resPeople = await api.get('/summary/people');
        return resPeople.data;

        const resCategory = await api.get('/summary/categories');
        return resCategory.data;
    }
    catch (error) {
        console.error("Erro ao buscar os resumos", error);
    }
}
export default summary;

