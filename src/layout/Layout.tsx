import {Outlet} from "react-router-dom"

export default function Layout() {
  return (
    <>
        <header className="bg-slate-800">
            <div className="mx-auto max-w-6xl py-10">
                <h1 className="text-2xl text-center font-extrabold text-white md:text-start md:text-3xl lg:text-4xl">
                    Administrador de productos
                </h1>
            </div>
        </header>

        <main className="mt-5 mx-auto max-w-6xl p-2 bg-white shadow-lg shadow-gray-400/75">
            <Outlet />
        </main>
    </>
  )
}
