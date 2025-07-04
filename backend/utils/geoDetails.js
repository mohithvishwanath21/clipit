import axios from "axios";

export const getLocationFromIp = async (ip) => {
  const defaultLocation = {
    country: "Unknown",
    region: "Unknown",
    city: "Unknown",
    isp: "Unknown",
    latitude: null,
    longitude: null,
    timezone: "Unknown",
    org: "Unknown",
  };

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const data = response.data;

    if (data && !data.error) {
      return {
        country: data.country_name,
        region: data.region,
        city: data.city,
        isp: data.org || "Unknown",
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        org: data.org,
      };
    } else {
      return defaultLocation;
    }
  } catch (error) {
    console.error("Geo API error:", error.message);
    return defaultLocation;
  }
};

export const getClientIp = (req) => {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    req.ip ||
    "0.0.0.0"
  );
};
