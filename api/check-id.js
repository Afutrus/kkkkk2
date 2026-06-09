export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user_id, zone_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id wajib diisi",
      });
    }

    // TODO: ganti dengan logika cek asli kamu
    // misalnya cek ke API game / database / mapping sendiri
    const isValid = true;

    if (!isValid) {
      return res.status(200).json({
        success: false,
        message: "ID tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "ID valid",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
}
