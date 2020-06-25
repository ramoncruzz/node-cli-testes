const {readFile, writeFile}= require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database{
    constructor(){
        this.NOME_ARQUIVO='herois.json'
    }
   async listar(id){
        const dados = await this.obterDadosArquivo();
        const dadoFiltrados = dados.filter(item => id ? item.id===id: true);
        return dadoFiltrados;
    }
   async obterDadosArquivo(){
        const arquivo =await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return arquivo.toString();
    }
   async escreverArquivo(dados){
        const salvar = JSON.stringify(dados);

        await writeFileAsync(this.NOME_ARQUIVO, salvar.toString());
        return true;
    }
    async cadastrar(heroi){
        const salvos = JSON.parse(await this.obterDadosArquivo());
        const id = Date.now();
        const salvar = {id, ...heroi };
        salvos.push(salvar);
        await this.escreverArquivo(JSON.stringify(salvos));
    }

    async remover(id=undefined){
        try {
            const dadosSalvosString  = await this.obterDadosArquivo();
            const dadosSalvos  =JSON.parse(dadosSalvosString);
            console.log('dados salvos ', dadosSalvos);
            const indice = dadosSalvos.findIndex(item => item.id === parseInt(id))
            console.log('indice',id, indice);
            if(indice>=0){
                const salvar = dadosSalvos.filter((item,index) => index !== 0);
                this.escreverArquivo(salvar);
                return true;
            }else{
                throw Error('Usuario nao encontrado');
            }
            
        } catch (error) {
            console.log(error);
            return false;
        }
        
    }
}


module.exports = new Database();