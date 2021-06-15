'use-strict'

const fs = require('fs');
const repository = require('../repositories/livro-repository');

const _repositoryLivros = new repository();

class LivroController {

    constructor() { }

    getLivros(req, res) {
        const { busca, anoInicial, anoFinal, sorting, currentPage, perPageItems } = req.query;

        let resultLivros = _repositoryLivros.getAll().map(livro => {
            return LivroController.prototype.livroMap([livro], true);
        });

        if (anoInicial && anoFinal) {
            const intervaloAnos = [];
            intervaloAnos.push(anoInicial);
            intervaloAnos.push(anoFinal);
            intervaloAnos.sort();
            
            resultLivros =  resultLivros.filter(livro => {
                return livro.ano >= intervaloAnos[0] && livro.ano <= intervaloAnos[1];
            });
        }

        if (busca) {
            resultLivros = resultLivros.filter(livro => {
                return livro.titulo.indexOf(busca) > -1 || livro.autor.indexOf(busca) > -1 || livro.isbn.indexOf(busca) > -1;
            })
        }
        
        let page = currentPage || 1;
        let perPage = perPageItems || 10;
        let offset = (page - 1) * perPage;
        let paginatedItems = resultLivros.slice(offset).slice(0, perPageItems);

        if (sorting) {
            paginatedItems.sort((a, b) => {
                if (a.titulo < b.titulo) { return -1; }
                if (a.titulo > b.titulo) { return 1; }
                return 0;
            });
        }

        res.status(200).send({ items: paginatedItems, totalCount: resultLivros.length });
    }

    getLivro(req, res) {
        const { id } = req.params;
        const result = _repositoryLivros.getById(id);
        if (result.length > 0) {
            const livroMaped = LivroController.prototype.livroMap(result);
            res.status(200).send(livroMaped);
            return;
        }
        res.status(404).send({ msg: 'Livro não encontrado' });
    }

    deleteLivro(req, res) {
        const { id } = req.params;
        const result = _repositoryLivros.delete(id);
        if (result.length > 0) {
            const livroDeletado = LivroController.prototype.livroMap(_repositoryLivros.delete(id));
            res.status(200).send(livroDeletado);
            return;
        }
        res.status(404).send({msg: 'Não possível deletar, livro não encontrado'});
    }

    livroMap(livro, isMapLita = false) {
        if (!livro) {
            return '';
        }

        const { titulo, isbn, autores, editora, ano_edicao, idioma, medidas, id } = livro[0];

        if (!isMapLita) {
            return {
                id,
                titulo,
                isbn,
                autor: `${autores[0].nome} ${autores[0].sobrenome}`,
                editora: editora.nome_editora,
                ano: parseInt(ano_edicao),
                idioma,
                peso: medidas.peso,
                comprimento: parseInt(medidas.espessura),
                largura: parseInt(medidas.largura),
                altura: parseInt(medidas.altura)
            }
        }

        return {
            id,
            titulo,
            isbn,
            autor: `${autores[0].nome} ${autores[0].sobrenome}`,
            editora: editora.nome_editora,
            ano: parseInt(ano_edicao)
        }

    }
}

module.exports = LivroController;
