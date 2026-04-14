import api from '../services/api';

const registerPeople = async (name: string, age: number) => {
    try {
        return await api.post('/people', { name, age: Number(age) });

    } catch (error) {
        console.error("Erro ao registrar pessoa", error);
    }
}

export const getPeople = async () => {
    try {
        const response = await api.get('/people');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar pessoas", error);
        return [];
    }
};

export default registerPeople;
