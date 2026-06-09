export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({
      code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const { userId, zoneId } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    const numericUserId = String(userId).trim();
    const numericZoneId = zoneId ? String(zoneId).trim() : "";

    if (!/^\d+$/.test(numericUserId)) {
      return res.status(200).json({
        code: 304,
        message: "ID tidak ada.",
        data: null,
      });
    }

    async function lookupNickname(userId, zoneId) {
      // TODO: ganti dengan API lookup asli game kamu
      // return fetch(...) lalu parse response
      return {
        nickname: `User${userId}`,
        userId,
        zoneId,
      };
    }

    const userInfo = await lookupNickname(numericUserId, numericZoneId);

    if (!userInfo) {
      return res.status(200).json({
        code: 304,
        message: "ID tidak ada.",
        data: null,
      });
    }

    return res.status(200).json({
      code: 0,
      message: "",
      data: {
        userId: numericUserId,
        zoneId: numericZoneId,
        nickname: userInfo.nickname,
      },
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server error",
      error: err.message,
    });
  }
}
