import { Link } from "react-router-dom";

export default function PagenotFound() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center flex-col">
        <img
          className="h-96"
          src="https://i.ibb.co/9nKGYjB/img-404.webp"
          alt="Imagen 404"
        />
        <h2 className="font-bold text-gray-500 text-4xl">Error 404</h2>
        <p className="text-gray-700 text-center">
          Lo sentimos, la página que solicitaste no existe
        </p>
        <Link
          className="rounded-md bg-indigo-600 px-4 py-2 text-md md:w-auto w-full font-bold text-white shadow-md hover:bg-indigo-800 transition duration-150 mt-8 text-center"
          to="/"
        >
          Ir a inicio
        </Link>
      </div>
    </div>
  );
}
