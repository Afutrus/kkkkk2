import fs from "fs";
import path from "path";

const DATA_DIR = "/tmp";
const DB_PATH = path.join(DATA_DIR, "transactions.json");

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) return [];
    const raw = fs.readFileSync(DB_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    return false;
  }
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
    const { userId, order_id } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    const db = readDb();

    // Cari transaksi berdasarkan userId
    const tx = db
      .filter((item) => String(item.userId) === String(userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    if (!tx) {
      return res.status(200).json({
        code: 1,
        message: "Transaksi belum ditemukan",
        data: null,
      });
    }

    // Kalau order_id dikirim, validasi juga
    if (order_id && String(tx.order_id) !== String(order_id)) {
      return res.status(200).json({
        code: 2,
        message: "Order ID tidak cocok",
        data: null,
      });
    }

    return res.status(200).json({
      code: tx.status === "completed" ? 0 : 1,
      message: tx.status === "completed" ? "Pembayaran berhasil" : "Menunggu pembayaran",
      data: {
        userId: tx.userId,
        order_id: tx.order_id,
        amount: tx.amount,
        status: tx.status,
        payment_method: tx.payment_method || "qris",
        completed_at: tx.completedAt || null,
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
