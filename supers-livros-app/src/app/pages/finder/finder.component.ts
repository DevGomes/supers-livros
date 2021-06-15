import { BuscaLivro } from './models/BuscaLivro';
import { FinderService } from './services/finder.service';
import { Component, OnInit } from '@angular/core';
import sweetalert from 'sweetalert2';


@Component({
    selector: 'app-finder',
    templateUrl: './finder.component.html',
    styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

    listaLivro: any;
    totalPages: number;
    p: number;
    itemsPerPage = 10;
    totalItems: any;
    buscaLivroVO: BuscaLivro;
    currentePage: 1;

    constructor(private finderService: FinderService) { }

    ngOnInit(): void {
        this.buscaLivroVO = new BuscaLivro();
        this.carregarLivros();
    }

    carregarLivros(): void {
        this.finderService.buscarLivros(1, this.itemsPerPage).subscribe((data: any) => {
            this.listaLivro = data.items;
            this.totalItems = data.totalCount;
        });
    }

    getPage(page: number): void {
        this.finderService.buscarLivros(page, this.itemsPerPage, this.buscaLivroVO).subscribe((data: any) => {
            this.listaLivro = data.items;
            this.totalItems = data.totalCount;
        });
    }

    loadDetalheLivro(idLivro: string): void {
        this.finderService.getDetalheLivro(idLivro).subscribe(response => {
            sweetalert.fire({
                icon: 'info',
                title: 'Detalhes do Livro',
                html: `
                    <br>
                    <p style="text-align: left;"><strong>Título:</strong> ${response.titulo}</p>
                    <p style="text-align: left;"><strong>ISBN:</strong> ${response.isbn}</p>
                    <p style="text-align: left;"><strong>Autor:</strong> ${response.autor}</p>
                    <p style="text-align: left;"><strong>Editora:</strong> ${response.editora}</p>
                    <p style="text-align: left;"><strong>Ano:</strong> ${response.ano}</p>
                    <p style="text-align: left;"><strong>Idioma:</strong> ${response.idioma}</p>
                    <p style="text-align: left;"><strong>Peso:</strong> ${response.peso}</p>
                    <p style="text-align: left;"><strong>Comprimento:</strong> ${response.comprimento}</p>
                    <p style="text-align: left;"><strong>Largura:</strong> ${response.largura}</p>
                    <p style="text-align: left;"><strong>Altura:</strong> ${response.altura}</p>
                `,
                showCloseButton: true
            });
        });
    }

    buscarLivro(): void {
        this.finderService.buscarLivros(1, this.itemsPerPage, this.buscaLivroVO).subscribe((data: any) => {
            this.listaLivro = data.items;
            this.totalItems = data.totalCount;
            this.currentePage = 1;
        });
    }
}
