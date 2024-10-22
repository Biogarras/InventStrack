export interface Producto{

    id_inventario: number | null;
    sku: string;
    nombre: string;
    familia: string;
    modelo: string;
    stock: number | null;
    costo: number | null;
    precioVenta: number | null;


}