import { filter, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router) {

   this.tituloSubs$ =  this.getArgumentosRuta()
                 .subscribe( ({titulo}) => {
                       this.titulo = titulo;
                       document.title = `AdminPro - ${titulo}`;
                       // antes para mostrar la data en el subscribe cambio a data console.log(data);
                 });


   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getArgumentosRuta(){
   return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map ((event: ActivationEnd) => event.snapshot.data),
    );
   }




}
