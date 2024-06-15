import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }
  await addProduct(data)

  return redirect("/")
}

export default function NewProducts() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row flex-1 gap-2 md:gap-0">
        <h2 className="text-4xl font-black text-slate-500 text-center md:text-start">
          Registrar Producto
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
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded-lg hover:bg-indigo-700 transition duration-200"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
