import Corretores from './corretores.js';

export const getApelidos = async () => {
    const corretores = await Corretores.find({}, 'apelido').lean();
    return corretores.map(corretor => corretor.apelido);
};
