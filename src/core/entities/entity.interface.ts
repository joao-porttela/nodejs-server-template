export interface IEntity {
    _id?: string;
}

export type Entity<T> = T & IEntity;