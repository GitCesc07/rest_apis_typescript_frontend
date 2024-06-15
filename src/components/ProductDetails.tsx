import {
  Form,
  useNavigate,
  ActionFunctionArgs,
  redirect,
  useFetcher
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  
  const fetcher = useFetcher()
  const navigate = useNavigate();
  const isAvailability = product.availability;

  return (
    <tr className="border-b border-gray-300">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailability ? "text-black" : "text-red-600"} rounded-lg p-2 text-sm uppercase font-bold w-full border border-gray-300 cursor-pointer`}
          >
            {isAvailability ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex items-center gap-2 justify-center">
          <button
            className="flex items-center gap-2 bg-blue-200 py-1 px-3 rounded-md hover:bg-blue-400 transition duration-200 uppercase font-bold"
            onClick={() => navigate(`productos/${product.id}/editar`)}
          >
            <svg
              className="size-6 fill-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"></path>
            </svg>
            Editar
          </button>

          <Form
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (
                !confirm(
                  `¿Seguro deseas eliminar el siguiente producto: ${product.name}?`
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="flex items-center gap-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-200 uppercase font-bold"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
