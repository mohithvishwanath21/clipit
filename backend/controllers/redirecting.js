import { UAParser } from "ua-parser-js";
import urlData from "../models/URL.js";
import { getClientIp, getLocationFromIp } from "../utils/geoDetails.js";
import { connectDB } from "../connection.js";

export const handleGetRedirectUrl = async (req, res) => {
  const { id } = req.params;

  try {
    await connectDB();

    const RedirectURL = await urlData.findOne({ shortId: id });

    if (!RedirectURL) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // ❗️Important: Block if link is inactive
    if (RedirectURL.isActive === false) {
      return res.status(403).json({ message: "This link has been deactivated by the user." });
    }

    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "";
    const location = await getLocationFromIp(ip);
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const click = {
      ipAddress: ip,
      userAgent,
      location,
      clickedAt: new Date(),
    };

    RedirectURL.clicks.push(click);
    RedirectURL.clickCount = (RedirectURL.clickCount || 0) + 1;

    await RedirectURL.save();

    return res.redirect(RedirectURL.originalUrl);

  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
