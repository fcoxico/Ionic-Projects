import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

// A linha de cima está chamando as Classes Contato e
// ContactProvider

import { ContactProvider, Contact } from '../../providers/contact/contact';



@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {
  //A Classe EditContactPage recebe duas variáveis - Model (Informações do Contato) e Key (Posição do Contato).
  model: Contact;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactProvider,
    private toast: ToastController) {
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key =  this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }


  //Método para chamar o salvar contato
  save() {
    this.saveContact()
      .then(() => {
        this.toast.create({ message: 'Contato salvo.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o contato.', duration: 3000, position: 'botton' }).present();
      });
  }


  //Método para salvar o contato
  private saveContact() {
    if (this.key) {
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
  }

}
