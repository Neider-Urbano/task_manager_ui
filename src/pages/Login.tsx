import useToken from "../hooks/useToken";
import { Button } from "@nextui-org/react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { generateToken, loading, existToken } = useToken();

  const handleGenerateToken = () => {
    generateToken();
  };

  if (existToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar sesión</h2>
      <p className="text-lg text-gray-600 mb-6">Para iniciar genera un token</p>

      <Button
        onPress={handleGenerateToken}
        color="secondary"
        className="w-full py-3"
        isDisabled={existToken}
        isLoading={loading}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
