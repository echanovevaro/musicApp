import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient ) {
    console.log('soptifyServices listo!!!');
   }

   qetQuery( query: string ) {
     const url = `https://api.spotify.com/v1/${ query }`;
     const headers =  new HttpHeaders({
          'Authorization' : 'Bearer BQCg6E58IHkU5NaFh_uR9J_G146qrll_eBApFzejZnI7DHWYJjSNDH_nINiKnOmsKWa0pYIFcYxgNMhlwDo'
        });

      return this.http.get( url, { headers });

   }

   getNewReleases() {
     return this.qetQuery('browse/new-releases?limit=20')
       .pipe( map( data => data['albums'].items));
   }

   getArtistas( termino: string ) {

    return this.qetQuery(`search?q=${termino}&type=artist&limit=20`)
      .pipe( map( data => data['artists'].items));

   }

   getArtista ( id: string ) {

    return this.qetQuery(`artists/${id}`);
    // .pipe( map( data => data['artists'].items));

   }

   getTopTracks ( id: string ) {

    return this.qetQuery(`artists/${id}/top-tracks?country=es`)
       .pipe( map( data => data['tracks']));

   }
}
