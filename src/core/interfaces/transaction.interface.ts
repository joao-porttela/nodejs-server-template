export interface ITransaction {
  $transaction: (cb: any) => Promise<any>;
}