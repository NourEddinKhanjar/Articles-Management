import {Injectable} from '@angular/core';

import {StorageKeyType} from '@models/storage/storage-keys';
import {EnumUtil} from '@utils/enum/enum.util';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  get<T>(key: StorageKeyType): T {
    const keyAsString: string = EnumUtil.getEnumKeyStringValue(StorageKeyType, key);
    const item: string = localStorage.getItem(keyAsString);
    return item ? <T>JSON.parse(item) : null;
  }

  set<T>(key: StorageKeyType, data: T): void {
    const keyAsString: string = EnumUtil.getEnumKeyStringValue(StorageKeyType, key);
    const item: string = JSON.stringify(data);
    localStorage.setItem(keyAsString, item);
  }

  remove(key: StorageKeyType): void {
    const keyAsString: string = EnumUtil.getEnumKeyStringValue(StorageKeyType, key);
    localStorage.removeItem(keyAsString);
  }
}
