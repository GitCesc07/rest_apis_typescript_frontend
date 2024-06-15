import {Link, useLoaderData, type ActionFunctionArgs} from "react-router-dom";
import {
  getProducts,
  updateProductAvalability
} from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { Product } from "../types";

export async function loader() {
  const products = await getProducts()
  return products
}

export async function action({request} : ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  await updateProductAvalability(+data.id)  
  return {}
}

export default function Products() {

  const products = useLoaderData() as Product[]

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row flex-1 gap-2 md:gap-0">
        <h2 className="text-4xl font-black text-slate-500 text-center md:text-start">Productos</h2>
        <Link
          to="productos/nuevo"
          className="rounded-md bg-indigo-600 px-4 text-center py-2 text-sm md:text-lg font-bold text-white shadow-md hover:bg-indigo-800 transition duration-150"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="mt-5 overflow-y-auto h-[34rem] overflow-x-auto">
        <table className="w-full p-2">
          <thead className="bg-slate-800 text-white sticky top-0">
            <tr>
              <th className="p-2 text-start">Producto</th>
              <th className="p-2 text-start">Precio</th>
              <th className="p-2 text-start">Disponibilidad</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
