'use-strict'

const fs = require('fs');

class LivroRepository {

    constructor() {
        const _this =  LivroRepository.prototype;
        _this.allLivros = _this.inicializarBancoDadosMock();
    }

    getAll() {
        return LivroRepository.prototype.allLivros;
    }

    getById(id) {
        return LivroRepository.prototype.allLivros.filter(livro => livro.id === id);
    }

    delete(id) {
        const _this = LivroRepository.prototype;
        const livroDelete = _this.getById(id);
        if (livroDelete) {
            const novaListaLivros = _this.allLivros.filter(livro => livro.id !== id);
            _this.gravarNoBancoDadosMock(novaListaLivros);
        }
        return livroDelete;
    }

    inicializarBancoDadosMock() {
        try {
            const livroJsonString = fs.readFileSync('./db/livros.json', 'utf8');
            return JSON.parse(livroJsonString);
        } catch (err) {
            console.error(err);
            return;
        }
    }

    gravarNoBancoDadosMock(livroJsonString) {
        try {
            try {
                fs.writeFileSync('./db/livros.json', JSON.stringify(livroJsonString, null, 2));
                console.log('Banco de dados mock atualizado com sucesso');
            } catch (err) {
                console.error(err);
                return;
            }
        } catch (error) {
            console.error(err);
            return;
        }
    }

}

module.exports = LivroRepository;
