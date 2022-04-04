export default class CRUD {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async readAll(): Promise<any[]> {
    return await this.makeRequest(this.baseUrl, "GET");
  }

  async readOne(id: number): Promise<any> {
    return await this.makeRequest(this.baseUrl + id, "GET");
  }

  async create(payload: any): Promise<any> {
    return await this.makeRequest(this.baseUrl, "POST", true, payload);
  }

  async update(id: number, payload: any): Promise<void> {
    await this.makeRequest(this.baseUrl + id, "PATCH", false, payload);
  }

  async delete(id: number): Promise<void> {
    await this.makeRequest(this.baseUrl + id, "DELETE", false);
  }

  private async makeRequest(
    url: string,
    type: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",
    jsonResponse: boolean = true,
    payload?: any
  ): Promise<any> {
    const request = await fetch(url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (jsonResponse) return await request.json();
  }
}
