import axios from "axios";

class IPApiService {
  constructor() {
    this.baseURL = "https://ipapi.co";
  }

  async getIPInfo(ipAddress) {
    try {
      const { data } = await axios.get(`${this.baseURL}/${ipAddress}/json/`, {
        timeout: 10000,
      });

      if (data.error) throw new Error("API_ERROR");

      return this.transformResponse(data, ipAddress);
    } catch (error) {
      console.error("API Error:", error.message);
      throw new Error("API_ERROR");
    }
  }

  transformResponse(data, ipAddress) {
    return {
      ip: ipAddress,
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      latitude: parseFloat(data.latitude) || 0,
      longitude: parseFloat(data.longitude) || 0,
      isp: (data.org || "Unknown").substring(0, 25),
      threatLevel: this.determineThreatLevel(data),
    };
  }

  determineThreatLevel(data) {
    if (data.asn && data.asn.includes("CLOUDFLARENET")) return "Low";
    if (data.asn && data.asn.includes("GOOGLE")) return "Low";
    if (data.version === "IPv6") return "Medium";
    return "Unknown";
  }
}

export default new IPApiService();
