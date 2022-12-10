import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //CRUD Operations
  public async create(name: string, object) {
    return await window.api.invoke('create', name, object);
  }
  public async readOne(name: string, object) {
    return await window.api.invoke('read:one', name, object);
  }
  public async readAll(name: string) {
    return await window.api.invoke('read:all', name);
  }
  public async update(id: number, name: string, object) {
    return await window.api.invoke('update', name, id, object);
  }
  public async delete(name: string, object) {
    return await window.api.invoke('delete', name, object);
  }
}
