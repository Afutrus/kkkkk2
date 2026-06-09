import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function makeOrderId() {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `INV${ts}${rand}`;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    return res.status(405).json({
      code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    const { userId, amount, paymentMethod = "qris", nickname = null } = req.body || {};

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

    const orderId = makeOrderId();
    const project = process.env.PAKASIR_PROJECT;
    const apiKey = process.env.PAKASIR_API_KEY;

    if (!project || !apiKey) {
      return res.status(500).json({
        code: 500,
        message: "Konfigurasi Pakasir belum lengkap",
      });
    }

    const pakasirRes = await fetch(
      `https://app.pakasir.com/api/transactioncreate/${paymentMethod}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project,
          order_id: orderId,
          amount: Number(amount),
          api_key: apiKey,
        }),
      }
    );

    const pakasirData = await pakasirRes.json();

    if (!pakasirRes.ok) {
      return res.status(200).json({
        code: 1,
        message: pakasirData?.message || "Gagal membuat transaksi Pakasir",
        data: null,
      });
    }

    const payment = pakasirData.payment;

    const { error } = await supabase.from("transactions").insert({
      user_id: String(userId),
      order_id: orderId,
      amount: Number(amount),
      payment_method: paymentMethod,
      nickname: nickname || "",
      status: "pending",
      pakasir_payment_number: payment?.payment_number || null,
      pakasir_total_payment: payment?.total_payment || null,
      pakasir_expired_at: payment?.expired_at || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      return res.status(500).json({
        code: 500,
        message: "Gagal menyimpan transaksi",
        error: error.message,
      });
    }

    return res.status(200).json({
      code: 0,
      message: "",
      data: {
        order_id: orderId,
        userId: String(userId),
        amount: Number(amount),
        payment_method: paymentMethod,
        nickname: nickname || "",
        infullUrl: `https://app.pakasir.com/pay/${project}/${Number(amount)}?order_id=${orderId}`,
        centerInfullType: "PAKASIR",
        pakasir: payment,
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
