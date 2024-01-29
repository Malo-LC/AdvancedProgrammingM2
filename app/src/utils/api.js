class CRUDApi {
  baseUrl;
  token;

  constructor() {
    this.baseUrl = "http://localhost:8080";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  async post(resource, data) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async disconnect() {
    await this.post("auth/logout");
    localStorage.removeItem("token");
    window.location.reload();
  }

  async get(resource) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (response.headers.get("content-type")?.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async getPfp(resource) {
    const response = await fetch(resource, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response.text();
  }

  async put(resource, data) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async delete(resource) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response.json();
  }
}

const api = new CRUDApi();
export default api;
