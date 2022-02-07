export abstract class BaseEntity<T> {
  private _entity: T;

  protected abstract excludes: Array<keyof T>;

  constructor(o: T) {
    this._entity = o;
  }

  serialize(): Partial<T> {
    const serialized: T = { ...this.entity };
    this.excludes.forEach((exclude) => delete serialized[exclude]);
    return serialized;
  }

  get entity(): T {
    return this._entity;
  }
}
