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

    // TODO: ganti dengan sumber data asli kamu
    const userInfo = {
      user_id,
      zone_id: zone_id || null,
      nickname: "CPH1803",
    };

    return res.status(200).json({
      success: true,
      message: "Data user ditemukan",
      data: userInfo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
}
