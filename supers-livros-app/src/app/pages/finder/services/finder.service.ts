import { BuscaLivro } from './../models/BuscaLivro';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const KEY_TOKEN = 'apipass-token';

@Injectable({
    providedIn: 'root'
})
export class FinderService {

    private mainDomain: string = 'http://localhost:3001/api';

    constructor(private httpClient: HttpClient) { }

    buscarLivros(currentPage: number, itemsPerPage: number, buscaLivro?:BuscaLivro, sorting: boolean = true): Observable<any> {
        let uriRequestDefault = `${this.mainDomain}/livros?currentPage=${currentPage}&perPageItems=${itemsPerPage}&sorting=${sorting}`;

        if (buscaLivro?.anoInicial && buscaLivro?.anoFinal) {
            uriRequestDefault = uriRequestDefault.concat(`&anoInicial=${buscaLivro.anoInicial}&anoFinal=${buscaLivro.anoFinal}`);
        }

        if (buscaLivro?.busca) {
            uriRequestDefault = uriRequestDefault.concat(`&busca=${buscaLivro.busca}`);
        }

        return this.httpClient.get(uriRequestDefault);
    }

    getDetalheLivro(idLivro: string): Observable<any> {
        return this.httpClient.get(`${this.mainDomain}/livros/${idLivro}`);
    }

}
