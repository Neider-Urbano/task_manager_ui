import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../types/taskTypes";
import { Config } from "../config";
import { UseTokenReturn } from "../types/tokenTypes";
import { toast } from "react-toastify";

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const useToken = (): UseTokenReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(getToken());

  const API_URL_TOKEN = Config.API_URL + "/api/login";

  const setTokenStorage = (token: string): void => {
    localStorage.setItem("token", token);
    setToken(token);
    toast.success("¡Token generado!", {
      position: "bottom-center",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const removeTokenStorage = (): void => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("¡Sesión cerrada!", {
      position: "bottom-center",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const generateToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const tokenData = {
        username: "admin",
        password: "password123",
      };

      const response = await axios.post(API_URL_TOKEN, tokenData);
      setTokenStorage(response.data.token);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.error ?? "Error al crear la tarea";

      setError(errorMessage);
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 3000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const existToken = token != null && token != undefined;

  return {
    token,
    loading,
    error,
    existToken,
    setTokenStorage,
    removeTokenStorage,
    generateToken,
  };
};

export default useToken;
