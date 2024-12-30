export const NotFound = () => {
  return (
    <div className="flex justify-center">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Página No Encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition duration-300"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};
