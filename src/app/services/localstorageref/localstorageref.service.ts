import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return localStorage;
}

@Injectable({
  providedIn: 'root'
})
export class LocalstoragerefService {
  get localStorage(): Storage {
    return getLocalStorage();
  }
}
