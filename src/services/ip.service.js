import { prisma } from "../config/database.js";
import ipApiService from "./ipApi.service.js";
import { isValidIP, sanitizeIP } from "../utils/validators.js";

class IPService {
  /**
   * Get All IPs
   * @param {object} filters
   * @returns {Promise<Array>}
   */
  async getAllIPs(filters = {}) {
    const { country, city, threatLevel, page = 1, limit = 100 } = filters;

    const where = {
      ...(country && { country: { contains: country, mode: "insensitive" } }),
      ...(city && { city: { contains: city, mode: "insensitive" } }),
      ...(threatLevel && { threatLevel }),
    };

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(Math.max(1, parseInt(limit) || 100), 100);
    const skip = (pageNum - 1) * limitNum;

    const [data, total] = await Promise.all([
      prisma.iP.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
      }),
      prisma.iP.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    };
  }

  /**
   * Verified IP already exist
   * @param {string} ipAddress
   * @returns {Promise<Object | null>}
   */
  async checkIPExists(ipAddress) {
    return await prisma.iP.findUnique({ where: { ip: ipAddress } });
  }

  /**
   * Create new IP consulting API EXTERN
   * @param {string} ipAddress
   * @returns {Promise<Object>}
   */
  async createIP(ipAddress) {
    const sanitized = sanitizeIP(ipAddress);

    if (!isValidIP(sanitized)) throw new Error("INVALID_IP_FORMAT");
    if (await this.checkIPExists(sanitized))
      throw new Error("IP_ALREADY_EXISTS");

    const ipData = await ipApiService.getIPInfo(sanitized);
    if (!ipData) throw new Error("API_ERROR");

    return await prisma.iP.create({ data: ipData });
  }

  /**
   * Delete IP
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async deleteIP(id) {
    try {
      return await prisma.iP.delete({ where: { id } });
    } catch (error) {
      throw new Error(
        error.code === "P2025" ? "IP_NOT_FOUND" : "DATABASE_ERROR",
      );
    }
  }

  /**
   * Get IP for ID
   * @param {string} id
   * @returns {Promise<Object | null>}
   */
  async getIPById(id) {
    const data = await prisma.iP.findUnique({ where: { id } });
    if (!data) throw new Error("IP_NOT_FOUND");
    return data;
  }

  /**
   * Get stadistics IPs
   * @returns {Promise<Object>}
   */
  async getStats() {
    const [total, byThreatLevel, topCountries] = await Promise.all([
      prisma.iP.count(),
      prisma.iP.groupBy({
        by: ["threatLevel"],
        _count: true,
        orderBy: { _count: { threatLevel: "desc" } }
      }),
      prisma.iP.groupBy({
        by: ["country"],
        _count: true,
        orderBy: { _count: { country: "desc" } },
        take: 5,
      }),
    ]);
    return { total, byThreatLevel, topCountries };
  }
}

export default new IPService();
