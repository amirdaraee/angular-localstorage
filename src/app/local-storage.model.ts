export class LocalStorage{
  public key: string;
  public value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
