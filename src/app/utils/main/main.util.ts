export class MainUtil{

  static guid(): string{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  static clone<T>(obj: T): T{
    return <T> JSON.parse(JSON.stringify(obj));
  }
}
