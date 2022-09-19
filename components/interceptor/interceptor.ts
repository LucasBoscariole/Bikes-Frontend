import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    console.log('interceptor error')
    console.log(error)
    if (
      error.response.status === 403 &&
      !refresh &&
      error.response.data.detail === "unauthenticated"
    ) {
      refresh = true;
      console.log('im here')
      const response = await axios.post(
        "/refresh",
        {},
        { withCredentials: true }
      );
      console.log('response', response)
      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        // Redo last request
        return axios(error.config);
      }
    }
    refresh = false;
    return Promise.reject(error);
  }
);
