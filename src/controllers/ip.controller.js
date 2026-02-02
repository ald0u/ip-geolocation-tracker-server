import ipService from "../services/ip.service.js";

class IPController {
  /**
   * Get /api/ips
   */
  getAllIPs = async (req, res, next) => {
    try {
      const result = await ipService.getAllIPs(req.query);
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/ips/stats
   */
  getStats = async (req, res, next) => {
    try {
      const data = await ipService.getStats();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get /api/ips/:id
   */
  getIPById = async (req, res, next) => {
    try {
      const ipData = await ipService.getIPById(req.params.id);
      res.status(200).json({ success: true, data: ipData });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/ips
   */
  createIP = async (req, res, next) => {
    try {
      const { ip } = req.body;
      if (!ip) throw new Error("VALIDATION_ERROR");
      const data = await ipService.createIP(ip);
      res.status(201).json({ success: true, message: "IP registred", data });
    } catch (error) {
      next(error);
    }
  };

  /**
   * DELETE /api/ips/:id
   */
  deleteIP = async (req, res, next) => {
    try {
      await ipService.deleteIP(req.params.id);
      res.status(200).json({ success: true, message: "IP deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default new IPController();
