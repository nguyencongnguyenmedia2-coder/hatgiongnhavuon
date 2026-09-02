/**
 * AI Content Generator Helper for Hạt Giống Nhà Vườn
 * Generates professional Short Descriptions and 4-Step Planting Technical Guides based on Product Name & Category.
 */

export interface AiGeneratedContent {
  shortDescription: string;
  detailedDescription: string;
}

export function generateProductAiContent(productName: string, categoryName?: string): AiGeneratedContent {
  const nameClean = productName.trim() || 'Hạt giống chuẩn F1';
  const nameLower = nameClean.toLowerCase();

  const isFlower = nameLower.includes('hoa') || nameLower.includes('cúc') || nameLower.includes('hồng') || nameLower.includes('hướng dương') || categoryName?.includes('Hoa');
  const isVeg = nameLower.includes('rau') || nameLower.includes('cải') || nameLower.includes('muống') || nameLower.includes('xà lách') || nameLower.includes('ớt') || categoryName?.includes('Rau');
  const isFruit = nameLower.includes('cà chua') || nameLower.includes('dâu tây') || nameLower.includes('dưa') || nameLower.includes('chanh') || categoryName?.includes('Trái');

  // 1. Generate Short Description
  let shortDesc = '';
  if (isFlower) {
    shortDesc = `${nameClean} dòng F1 thuần chủng, màu sắc rực rỡ, tỷ lệ nảy mầm cao >90%. Hoa nở bền màu, tỏa hương thơm dịu nhẹ, rất dễ chăm sóc tại ban công và sân thượng gia đình.`;
  } else if (isVeg) {
    shortDesc = `${nameClean} hạt giống hữu cơ F1 chọn lọc, lớn nhanh, kháng sâu bệnh tốt. Cho lá xanh non mượt mà, nhiều dinh dưỡng, thu hoạch siêu nhanh chỉ sau 20-30 ngày gieo.`;
  } else if (isFruit) {
    shortDesc = `${nameClean} giống chậu lùn sai quả, quả mọng ngọt chuẩn F1. Cây sinh trưởng khỏe, thích hợp trồng chậu nhỏ trên sân thượng và ban công gia đình.`;
  } else {
    shortDesc = `${nameClean} hạt giống F1 chất lượng cao, đóng gói chuẩn bảo quản chống ẩm mốc. Tỷ lệ nảy mầm cao >90%, cây lớn khỏe, mọc nhanh và thích nghi tốt khí hậu Việt Nam.`;
  }

  // 2. Generate Detailed Description & 4-Step Planting Technique
  let detailedDesc = '';
  if (isFlower) {
    detailedDesc = `🌸 HƯỚNG DẪN GIEO TRỒNG & CHĂM SÓC ${nameClean.toUpperCase()} ĐẠT TỶ LỆ NẢY MẦM >90%

1. Mô tả chi tiết:
${nameClean} là loài hoa mang vẻ đẹp tự nhiên rực rỡ, thích hợp làm đẹp cho không gian sống, ban công, lối đi sân vườn. Cây ưa ánh nắng nhẹ, phát triển tán xòe đều và cho bông nở rộ quanh năm.

2. Kỹ thuật 4 bước gieo hạt hiệu quả nhất:
• BƯỚC 1 (NGÂM HẠT): Ngâm hạt trong nước ấm 40 - 45°C (2 phần nước sôi + 3 phần nước lạnh) từ 3 - 5 giờ để kích hoạt vỏ hạt.
• BƯỚC 2 (Ủ HẠT): Vớt hạt ra đặt vào khăn ẩm ấm ủ từ 24 - 48 giờ cho đến khi hạt nứt nanh mầm trắng nhỏ.
• BƯỚC 3 (GIEO ĐẤT & KHAY ƯƠM): Sử dụng đất giá thể xơ dừa tơi xốp mixed phân trùn quế. Gieo hạt sâu 0.5cm, phủ lớp mụn dừa mỏng và phun sương giữ ẩm.
• BƯỚC 4 (CHĂM SÓC & ÁNH NẮNG): Đặt chậu nơi có nắng nhẹ 4-6 tiếng/ngày. Tưới phun sương 2 lần (sáng sớm và chiều mát). Khi cây ra 4 lá thật tiến hành tỉa cạ và bón phân hữu cơ NPK định kỳ 10 ngày/lần.

3. Bảo quản:
Bảo quản gói hạt giống chưa dùng ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.`;
  } else if (isVeg) {
    detailedDesc = `🥬 CẨM NANG GIEO TRỒNG RAU SẠCH HỮU CƠ ${nameClean.toUpperCase()} THU HOẠCH NHANH

1. Mô tả sản phẩm:
${nameClean} cung cấp nguồn rau tươi giàu vitamin, chất xơ và khoáng chất cho bữa ăn gia đình. Giống kháng sâu bệnh cao, lớn nhanh, cho lá xanh dày ngọt mát.

2. Quy trình gieo trồng rau sạch chuẩn kỹ thuật:
• BƯỚC 1 (CHUẨN BỊ GIÁ THỂ): Trộn 50% đất thịt sạch + 30% xơ dừa mụn dừa + 20% phân trùn quế hữu cơ. Sới đất thật tơi xốp thoát nước tốt.
• BƯỚC 2 (NGÂM Ủ HẠT): Ngâm hạt rau trong nước ấm 40°C từ 2 - 4 giờ. Vớt ra ráo nước gieo trực tiếp vào khay ươm hoặc thùng xốp.
• BƯỚC 3 (TƯỚI GIỮ ẨM): Phun sương đều đặn 2 lần/ngày. Giữ đất luôn ẩm nhẹ nhưng không ngập úng. Hạt sẽ nảy mầm đều sau 3 - 5 ngày.
• BƯỚC 4 (THU HOẠCH): Sau 20 - 30 ngày gieo trồng có thể tỉa lá ăn dần hoặc thu hoạch trọn lứa. Bón bổ sung phân hữu cơ sinh học để lứa sau phát triển tiếp.

3. Cam kết chất lượng:
Hạt giống được bảo quản trong bao bì bọc bạc chống ẩm, tỷ lệ nảy mầm trên 90%.`;
  } else if (isFruit) {
    detailedDesc = `🍓 HƯỚNG DẪN TRỒNG CÂY ĂN TRÁI CHẬU LÙN ${nameClean.toUpperCase()} SAI QUẢ

1. Đặc điểm nổi bật:
${nameClean} thuộc dòng giống chậu lùn F1, chiều cao vừa phải (30 - 60cm), cực kỳ sai quả. Thích hợp trồng thùng xốp, chậu sứ trang trí ban công sân thượng.

2. Hướng dẫn gieo mầm & Chăm sóc cây ra quả:
• BƯỚC 1 (NGÂM KÍCH MẦM): Ngâm hạt trong nước ấm 45°C trong 4 - 6 giờ. Dùng khăn giấy ẩm ủ hạt ở nơi tối ấm trong 2-3 ngày.
• BƯỚC 2 (GIEO CHẬU ƯƠM): Gieo hạt đã nứt mầm vào chậu ươm nhỏ, phủ 0.8cm đất tơi xốp. Tưới giữ ẩm 2 lần/ngày.
• BƯỚC 3 (CHUYỂN CHẬU LỚN): Khi cây con có 4-6 lá thật (sau 20 ngày), sang chậu lớn đường kính >30cm có phân hữu cơ hoai mục.
• BƯỚC 4 (CHĂM SÓC RA HOA KẾT TRÁI): Đặt chậu nơi ngập tràn ánh nắng (6-8h/ngày). Bón bổ sung KALI & NPK giai đoạn ra hoa để tăng tỷ lệ đậu quả mọng ngọt.

3. Hạn sử dụng & Bảo quản:
Hạt giống đóng gói chống ẩm mốc, bảo quản tốt nhất từ 18 - 25°C.`;
  } else {
    detailedDesc = `🌿 HƯỚNG DẪN GIEO TRỒNG HẠT GIỐNG CHUẨN ${nameClean.toUpperCase()}

1. Giới thiệu sản phẩm:
${nameClean} hạt giống F1 tỷ lệ nảy mầm cao, cây khỏe mạnh, sinh trưởng nhanh và đề kháng tốt với thời tiết nắng mưa thất thường.

2. Các bước gieo hạt đạt chuẩn kỹ thuật:
• BƯỚC 1: Ngâm hạt 3-5 giờ trong nước ấm 40°C.
• BƯỚC 2: Ủ mầm bằng khăn ẩm 24h đến khi nứt vỏ.
• BƯỚC 3: Gieo vào khay đất tơi xốp, giữ ẩm bằng bình xịt phun sương.
• BƯỚC 4: Đặt nơi có nắng nhẹ, tưới nước vừa đủ hằng ngày và bón phân định kỳ.

3. Bảo quản:
Bảo quản nơi khô ráo, mát mẻ, tránh ánh nắng trực tiếp.`;
  }

  return {
    shortDescription: shortDesc,
    detailedDescription: detailedDesc,
  };
}
