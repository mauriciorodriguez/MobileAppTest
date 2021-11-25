import http from "../http-common";

class VehicleService {
  getAll() {
    return http.get("/vehiculos");
  }

  get(id) {
    return http.get(`/vehiculo/${id}`);
  }

  create(data) {
    return http.post("/vehiculos", data);
  }

  update(id, data) {
    return http.put(`/vehiculos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vehiculos/${id}`);
  }

  deleteAll() {
    return http.delete(`/vehiculos`);
  }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new VehicleService();
