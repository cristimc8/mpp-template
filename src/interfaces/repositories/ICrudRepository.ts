export interface ICrudRepository<T> {
  findById(id: number): Promise<T>;
  delete(id: number): Promise<T>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  findAll(): Promise<T[]>
}
