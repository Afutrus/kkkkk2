export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({
      code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const {
      userId,
      amount,
      nickname = "",
      slug = "ROY",
      paymentMethod = "qris",
    } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        code: 400,
        message: "amount wajib diisi dan valid",
      });
    }

    const cleanAmount = Number(amount);
    const orderId = `NEO-${Date.now()}-${String(userId).trim()}`;

    const payUrl =
      `https://app.pakasir.com/pay/${encodeURIComponent(slug)}/${cleanAmount}` +
      `?order_id=${encodeURIComponent(orderId)}` +
      `&qris_only=1`;

    return res.status(200).json({
      code: 0,
      message: "",
      data: {
        order_id: orderId,
        userId: String(userId),
        amount: cleanAmount,
        nickname,
        payment_method: paymentMethod,
        centerInfullType: "PAKASIR",
        payUrl,
        infullUrl: payUrl,
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
