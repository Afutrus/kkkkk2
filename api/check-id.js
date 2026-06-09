export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({
      code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const { userId } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    const numericUserId = String(userId).trim();

    if (!/^\d+$/.test(numericUserId)) {
      return res.status(200).json({
        code: 304,
        message: "ID tidak ada.",
        data: null,
      });
    }

    const formData = new URLSearchParams({
      userId: numericUserId,
      costKey: "com.neptune.domino.coincard0035",
      languageType: "2",
      infullType: "40",
      timestamp: Date.now().toString(),
    });

    const response = await fetch(
      "https://www.pulaugame.com/web/rechargeOrder.do",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: formData.toString(),
      }
    );

    const result = await response.json();

    if (
      result.code !== "0" ||
      !result.data ||
      !result.data.nickName
    ) {
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
        nickname: result.data.nickName,
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
