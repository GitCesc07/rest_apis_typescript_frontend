import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);

    if (!product) {
      return redirect("/");
    }
    return product;
  }
}

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  if(params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

export default function EditProduct() {
  const product = useLoaderData() as Product;
  const error = useActionData() as string;


  return (
    <>
      <div className="flex justify-between flex-col md:flex-row flex-1 gap-2 md:gap-0">
        <h2 className="text-4xl font-black text-slate-500 text-center md:text-start">
          Editar Producto
        </h2>
        <Link
          to="/"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-indigo-800 transition duration-150 text-center"
        >
          Volver a productos
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        <ProductForm
          product={product}
        />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full outline-none active:bg-blue-200 bg-gray-50 border border-gray-500 px-4 py-2 rounded-lg"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-lg hover:bg-indigo-700 transition duration-200"
          value="Modificar Producto"
        />
      </Form>
    </>
  );
}
