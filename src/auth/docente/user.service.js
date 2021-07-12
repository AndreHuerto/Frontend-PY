import authAheader from "../auth-header";

const API_URL = "https://sepcadbackend.herokuapp.com/api/v1/";

class UserService {
  async getConcurso(id) {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}docente/concurso/${id}`, {
      method: "GET",
      headers: headers,
    }).then((res) => res.json());
  }

  async createPreins(body) {
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}checkout`, {
      method: "POST",
      body,
      headers,
    }).then((res) => res.json());
  }
  async findByDni(dni) {
    return await fetch(
      `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImtldmluZ29uemFsZXNAdXBldS5lZHUucGUifQ.TEmctght8VFYuD42OzTPP3Jq_kjFSfYL9qHzLvkUV1E`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  }
  async createLegajo(body){
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}docente/concurso/`, {
      method: "POST",
      headers,
      body
    }).then(res => res.json());

  }

  async verifyCheckout(body) {
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}checkout/verified`, {
      method: "POST",
      headers,
      body,
    }).then((res) => res.json());
  }
  async getModulos() {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}legajos/modulos`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async getByIdModulos(id) {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}legajos/modulos/${id}`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async getSubmodulos(id) {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}legajos/submodulos/${id}`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async getItems(name) {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}legajos/formulario/${name}`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  }
  async createFormulario(body,name) {
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}legajos/formulario/${name}`, {
      method: "POST",
      headers,
      body,
    }).then((res) => res.json());
  }
  async uploadFile(body) {
    let headers = new Headers(authAheader());
    return await fetch(`${API_URL}upload`, {
      method: "POST",
      body,
      headers,
    }).then((res) => res.json());
  }
  async updatePuntajeSubmodulo(body,id){
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}legajos/formulario/puntaje/${id}`,{
      method: "PUT",
      headers,
      body
    }).then((res) => res.json());
  }
  async getPuntajesSubmodulo(body,id){
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return await fetch(`${API_URL}legajos/modulos/puntaje/submodulos/${id}`,{
      method: "PUT",
      headers,
      body
    }).then(res => res.json());
  }
  async updatePuntajeModulos(body,id){
    let headers = new Headers(authAheader());
    headers.append("Content-Type", "application/json");
    return await fetch(`${API_URL}legajos/formulario/puntaje/modulo/${id}`,{
      method: "PUT",
      headers,
      body
    }).then(res => res.json());
  }
}

export default new UserService();
