export class Product {
    constructor(
   public id?: number,
    public name?: string,
   public price?: number,
   public amount?: number,
  public  status?: boolean){

    }
}
export class ProductResponse{
  public statusCode: number;
  public data: Product[];
}