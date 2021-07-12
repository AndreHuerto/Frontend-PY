const API_URL = "https://sepcadbackend.herokuapp.com/auth/";

class AuthService {
  async login(username, password) {
    const data = { username, password };
   
    const body = JSON.stringify(data);

    return await fetch(`${API_URL}login`, {
      method:"POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body
    }).then(res => res.json());
  }

  async verify(accessToken) {
 
      return await fetch(`${API_URL}verify`, {
        method: "GET",
        headers: { Authorization: "Bearer " + accessToken },
      }).then((response) => response.json());

  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
