export interface UseTokenReturn {
  token: string | null;
  loading: boolean;
  error: string | null;
  existToken: boolean;
  setTokenStorage: (token: string) => void;
  removeTokenStorage: () => void;
  generateToken: () => Promise<void>;
}
