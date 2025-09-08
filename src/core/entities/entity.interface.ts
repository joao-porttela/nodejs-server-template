export interface IEntity<T> {
    _id: string;
    data: T;
    createdAt: Date;
    updatedAt: Date;
}