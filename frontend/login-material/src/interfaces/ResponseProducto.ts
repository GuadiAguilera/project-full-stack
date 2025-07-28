import { Producto } from "./Producto";

export interface ResponseProducto{
    isSuccess: any;
    value: Producto[];
}