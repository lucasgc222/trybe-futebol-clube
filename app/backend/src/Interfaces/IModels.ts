export interface IList<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
}

export interface IListWithQuery<T> {
  findAllWithQuery(inProgress: boolean): Promise<T[]>;
}

export interface IUpdateStatus<T, U> {
  updateStatus(data: Partial<T>): Promise<U>;
}

export interface ICreate<T, U> {
  create(data: Partial<T>): Promise<U>;
}

// export interface IAllOperations<T> extends IList<T>, ICreate<T> { }
