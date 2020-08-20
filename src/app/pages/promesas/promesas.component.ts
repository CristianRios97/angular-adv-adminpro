import { Component, OnInit } from '@angular/core';
import { createNgModule } from '@angular/compiler/src/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   this.getUsuarios().then( usuario => {
     // console.log(usuario);
   });

   /*  const promesa = new Promise( ( resolve, reject ) => {
      if( true ){
      resolve('Hola Mundo');
      }
      else {

// manejador de error cuando algo sale mal muentra el reject puedo poner cualquier nombre pero asi se acostumbra a llamarse igual el resolve
        reject('Algo salio mal');
      }
    });
    promesa.then( ( mensaje ) => {
      console.log( mensaje );
    })
    .catch( error => console.log('Error en la promesa', error));
    console.log('Fin del Init');
*/
  }

  getUsuarios() {
  const promesa = new Promise( resolve => {

    fetch('https://reqres.in/api/users?page=2')
    .then( resp => resp.json() )
    .then ( body => console.log(body.data) );
    });

  return promesa;
}
}
