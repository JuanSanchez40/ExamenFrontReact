import http from "../http-common";

class EntradasService {
  getAll() {
    return http.get("/entradas");
  }

  create = async (data) => {
    return await http.post('/entradas',data, {
      headers: {
        "Content-Type": "application/json",
      },
    } )
  }
}

export default new EntradasService();