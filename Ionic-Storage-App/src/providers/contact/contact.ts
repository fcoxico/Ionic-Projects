import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



//Importação do Storage para cuidar da parte do armazenamento
import { Storage } from '@ionic/storage';

//Importação do Datepipe para cuidar da parte da data. Ele é responsável por
//formatar a data que é inserida no app
import { DatePipe } from '@angular/common';

@Injectable()
export class ContactProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  //Método inserir contato.
  public insert(contact: Contact) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, contact);
  }

  //Método editar contato.
  public update(key: string, contact: Contact) {
    return this.save(key, contact);
  }

  //Método salvar contato.
  private save(key: string, contact: Contact) {
    return this.storage.set(key, contact);
  }

  //Método remover contato.
  public remove(key: string) {
    return this.storage.remove(key);
  }


  //Método listar todos os contatos.
  public getAll() {

    //Listar os contatos que estão como array.
    let contacts: ContactList[] = [];

    return this.storage.forEach((value: Contact, key: string, iterationNumber: Number) => {
      let contact = new ContactList();
      contact.key = key;
      contact.contact = value;
      contacts.push(contact);
    })

    // Aqui foi usada uma promise que trabalha de maneira assincrona.
    // Assim ou é mostrado uma lista com os contatos ou é mostrado um erro.
    // Por isso é usado o promise

      .then(() => {
        return Promise.resolve(contacts);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

//Objeto Contato com as suas carcterísticas

export class Contact {
  name: string;
  phone: number;
  birth: Date;
  active: boolean;
}

//Objeto Contato List com as suas carcterísticas
export class ContactList {
  key: string;
  contact: Contact;
}
