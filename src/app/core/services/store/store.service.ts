import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  //CRUD Operations
  public async create(name: string, object, params: any = {}) {
    return await window.api.invoke('create', name, object, params);
  }
  public async save(name: string, object, params: any = {}) {
    return await window.api.invoke('save', name, object, params);
  }
  public async findOneBy(name: string, object, params: any = {}) {
    return await window.api.invoke('find:one:by', name, object, params);
  }
  public async find(name: string, params: any = {}) {
    return await window.api.invoke('find', name, params);
  }
  public async update(id: number, name: string, object, params: any = {}) {
    return await window.api.invoke('update', name, id, object, params);
  }
  public async remove(name: string, object, params: any = {}) {
    return await window.api.invoke('remove', name, object, params);
  }
}
