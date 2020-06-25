const database = require('./database');

const DEFAULT_ITEM_CADASTRADO ={
    nome: 'Fulano',
    poder: 'Dormir',
    id: 1
}
database.escreverArquivo([DEFAULT_ITEM_CADASTRADO]);
database.remover(1);