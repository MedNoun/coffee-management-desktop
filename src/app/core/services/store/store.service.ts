import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService<T> {
  private _name: string;

  //CRUD Operations
  public async create(object: Partial<T>): Promise<T> {
    return await window.api.invoke('create', this.name, object);
  }
  public async readOne(object: Partial<T> | void): Promise<T> {
    return await window.api.invoke('read:one', this.name, object);
  }
  public async readAll(): Promise<T> {
    return await window.api.invoke('read:all', this.name);
  }
  public async update(id: number, object: Partial<T>): Promise<T> {
    return await window.api.invoke('update', this.name, id, object);
  }
  public async delete(object: Partial<T>): Promise<T> {
    return await window.api.invoke('delete', this.name, object);
  }

  //getters
  set name(str: string) {
    this._name = str;
  }
  get name() {
    return this._name;
  }
}
