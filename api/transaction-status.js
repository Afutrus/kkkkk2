export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({
      code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const { userId, order_id } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    return res.status(200).json({
      code: 1,
      message: "Menunggu pembayaran",
      data: {
        userId: String(userId),
        order_id: order_id || null,
        status: "pending",
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
