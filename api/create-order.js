const PRODUCT_MAP = {
  "com.neptune.domino.coincard0035": {
    productId: 101,
    name: "IDR5K Gold",
    amount: 5000,
    type: "gold",
  },
  "com.neptune.domino.coincard0066": {
    productId: 102,
    name: "IDR10K Gold",
    amount: 10000,
    type: "gold",
  },
  "com.neptune.domino.coincard0199": {
    productId: 103,
    name: "IDR30K Gold",
    amount: 30000,
    type: "gold",
  },
  "com.neptune.domino.coincard0399": {
    productId: 104,
    name: "IDR60K Gold",
    amount: 60000,
    type: "gold",
  },
  "com.neptune.domino.coincard1666": {
    productId: 105,
    name: "IDR250K Gold",
    amount: 250000,
    type: "gold",
  },
  "com.neptune.domino.coincard3333": {
    productId: 106,
    name: "IDR500K Gold",
    amount: 500000,
    type: "gold",
  },

  "com.neptune.domino.berliancard0035": {
    productId: 201,
    name: "IDR5K Diamond",
    amount: 5000,
    type: "diamond",
  },
  "com.neptune.domino.berliancard0066": {
    productId: 202,
    name: "IDR10K Diamond",
    amount: 10000,
    type: "diamond",
  },
  "com.neptune.domino.berliancard0199": {
    productId: 203,
    name: "IDR30K Diamond",
    amount: 30000,
    type: "diamond",
  },
  "com.neptune.domino.berliancard0399": {
    productId: 204,
    name: "IDR60K Diamond",
    amount: 60000,
    type: "diamond",
  },
  "com.neptune.domino.berliancard1666": {
    productId: 205,
    name: "IDR250K Diamond",
    amount: 250000,
    type: "diamond",
  },
  "com.neptune.domino.berliancard3333": {
    productId: 206,
    name: "IDR500K Diamond",
    amount: 500000,
    type: "diamond",
  },

  "com.neptune.domino.sc.coincard0099": {
    productId: 301,
    name: "Hadiah Menarik",
    amount: 3000,
    type: "firstGift",
  },
  "com.neptune.domino.sc.coincard00099": {
    productId: 302,
    name: "Hadiah Menarik",
    amount: 10000,
    type: "firstGift",
  },

  "com.neptune.domino.jr.coincard0035": {
    productId: 401,
    name: "Paket Tahun Baru",
    amount: 5000,
    type: "activityGift",
  },
  "com.neptune.domino.jr.coincard0066": {
    productId: 402,
    name: "Paket Tahun Baru",
    amount: 10000,
    type: "activityGift",
  },
  "com.neptune.domino.jr.coincard0199": {
    productId: 403,
    name: "Paket Tahun Baru",
    amount: 30000,
    type: "activityGift",
  },
  "com.neptune.domino.jr.coincard0666": {
    productId: 404,
    name: "Paket Tahun Baru",
    amount: 100000,
    type: "activityGift",
  },
};

function makeOrderId(userId, productId) {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `NEO-${ts}-${productId}-${String(userId).trim()}-${rand}`;
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
    const {
      userId,
      zoneId = "",
      costKey,
      paymentMethod = "qris",
      slug = "ROY",
      redirect = "",
      nickname: nicknameFromBody = "",
    } = req.body || {};

    if (!userId) {
      return res.status(400).json({
        code: 400,
        message: "userId wajib diisi",
      });
    }

    if (!costKey) {
      return res.status(400).json({
        code: 400,
        message: "costKey wajib diisi",
      });
    }

    const cleanUserId = String(userId).trim();
const cleanZoneId = String(zoneId).trim();

let nickname = nicknameFromBody;

if (!nickname) {
  const formData = new URLSearchParams({
    userId: cleanUserId,
    costKey: "com.neptune.domino.coincard0035",
    languageType: "2",
    infullType: "40",
    timestamp: Date.now().toString(),
  });

  const lookupResponse = await fetch(
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

  const lookupText = await lookupResponse.text();
  const lookupResult = JSON.parse(lookupText);

  if (!lookupResult?.data?.nickName) {
    return res.status(200).json({
      code: 304,
      message: "ID tidak ditemukan.",
      data: null,
    });
  }

  nickname = lookupResult.data.nickName;
}

    const product = PRODUCT_MAP[String(costKey).trim()];

    if (!product) {
      return res.status(200).json({
        code: 304,
        message: "costKey tidak ditemukan.",
        data: null,
      });
    }

    const amount = product.amount;
    const orderId = makeOrderId(cleanUserId, product.productId);

    const defaultRedirect =
      redirect ||
      `https://your-domain.com/success.html?userId=${encodeURIComponent(cleanUserId)}&productId=${product.productId}&amount=${amount}`;

    const payUrl =`https://app.pakasir.com/pay/${encodeURIComponent(slug)}/${amount}` +
      `?order_id=${encodeURIComponent(orderId)}` +
      `&qris_only=1` +
      `&redirect=${encodeURIComponent(defaultRedirect)}`;

    return res.status(200).json({
      code: 0,
      message: "",
      data: {
        order_id: orderId,
        userId: cleanUserId,
        zoneId: cleanZoneId,
        nickname,
        costKey: String(costKey).trim(),
        productId: product.productId,
        productName: product.name,
        productType: product.type,
        amount,
        payment_method: paymentMethod,
        centerInfullType: "PAKASIR",
        infullUrl: payUrl,
        payUrl,
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
