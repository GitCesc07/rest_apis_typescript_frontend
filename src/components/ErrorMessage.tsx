

export default function ErrorMessage({children}) {

  return (
    <div className="text-center rounded-md my-4 bg-red-600 text-white font-bold p-3 uppercase">
        {
          children
        }
    </div>
  )
}
