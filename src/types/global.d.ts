interface APIResponse<T> {
  results: any;
  error: null | string | Record<string, string>;
  message: string;
  status: boolean;
  data: T;
}

interface IErrorResponse {
  response: {
    data: {
      message?: string;
    };
  };
}
