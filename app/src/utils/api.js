class CRUDApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async post(resource, data) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async get(resource) {
    const response = await fetch(`${this.baseUrl}/${resource}`);
    return response.json();
  }

  async put(resource, data) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async delete(resource) {
    const response = await fetch(`${this.baseUrl}/${resource}`, {
      method: "DELETE",
    });

    return response.json();
  }
}

const api = new CRUDApi("http://localhost:8080");
export default api;
