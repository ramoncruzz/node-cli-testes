const {
deepEqual,
ok
} = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRADO ={
    nome: 'Fulano',
    poder: 'Dormir',
    id: 1
}

describe('Suite de manipulacao para testes',()=>{
    before(async()=>{
        database.escreverArquivo([DEFAULT_ITEM_CADASTRADO]);
    });
    it('Deve cadastrar usando arquivos', async ()=>{
        const expected = DEFAULT_ITEM_CADASTRADO;
        const [resultado] = await database.listar();
        deepEqual(resultado, expected);
    })

    it('Deve cadastrar um heroi, usando arquivos', async()=>{
        const expected = DEFAULT_ITEM_CADASTRADO;
        database.cadastrar({nome: 'kskks',poder: 'fazer nada'});
        deepEqual(null,expected);
    });
    it('Deve remover um heroi, usando arquivos',async()=>{
        const expected = true; 
        const resultado  = await database.remover(1);
        deepEqual(resultado, expected);
    });
})
