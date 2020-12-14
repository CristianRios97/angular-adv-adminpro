import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];


  public imgSubs: Subscription;

  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuariosService: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe( img => {

      this.cargarUsuarios()
    });
  }


  cargarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde)
      .subscribe(({total, usuarios}) => {
        this.totalUsuarios = total;

        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;


      });
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if ( this.desde < 0) {
      this.desde = 0;

    } else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscar( termino: string) {
    if ( termino.length === 0 ) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino )
        .subscribe(resultados => {

          this.usuarios = resultados;
        } );

  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuariosService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');

    }


    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.usuariosService.eliminarUsuario(usuario)
          .subscribe( resp => {

            this.cargarUsuarios();
            Swal.fire(
            'Usuario borrado',
            `${ usuario.nombre } Fue eliminado por obra del señor que pico el si`,
            'success'
            );

    });
  }
});

}

cambiarRole( usuario: Usuario ) {
 // console.log(usuario);
   this.usuariosService.guardarUsuario( usuario )
    .subscribe( resp => {
      console.log(resp);
    });

}
abrirModal( usuario: Usuario ){

  this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
}
/* rgja5791
rgja5791
Ramirez76 */



}
