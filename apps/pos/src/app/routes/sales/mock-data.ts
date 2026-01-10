import type {
  SalesRecord,
  DailySales,
  HourlySales,
  CategorySales,
  SalesStats,
  SalesCategory,
  PaymentMethod,
} from './types';

// 랜덤 ID 생성
const generateId = () => Math.random().toString(36).substring(2, 11);

// 오늘 날짜 기준으로 더미 매출 기록 생성
const generateSalesRecords = (): SalesRecord[] => {
  const records: SalesRecord[] = [];
  const categories: SalesCategory[] = ['time_package', 'food', 'drink', 'snack', 'etc'];
  const paymentMethods: PaymentMethod[] = ['cash', 'card', 'pg'];

  const items: Record<SalesCategory, { name: string; price: number }[]> = {
    time_package: [
      { name: '1시간권', price: 4000 },
      { name: '2시간권', price: 7000 },
      { name: '3시간권', price: 9000 },
      { name: '프리패스', price: 15000 },
    ],
    food: [
      { name: '치즈볼', price: 6000 },
      { name: '감자튀김', price: 5000 },
      { name: '치킨텐더', price: 8000 },
      { name: '나쵸', price: 7000 },
      { name: '떡볶이', price: 6000 },
    ],
    drink: [
      { name: '아메리카노', price: 3500 },
      { name: '카페라떼', price: 4000 },
      { name: '콜라', price: 2000 },
      { name: '사이다', price: 2000 },
      { name: '맥주', price: 5000 },
    ],
    snack: [
      { name: '팝콘', price: 3000 },
      { name: '쿠키', price: 2500 },
      { name: '초콜릿', price: 2000 },
      { name: '과자세트', price: 4000 },
    ],
    etc: [
      { name: '게임 구매', price: 35000 },
      { name: '굿즈', price: 15000 },
      { name: '파티룸 추가', price: 10000 },
    ],
  };

  // 오늘 기준 50개의 더미 주문 생성
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const itemList = items[category];
    const item = itemList[Math.floor(Math.random() * itemList.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    // 오늘 날짜의 랜덤 시간
    const now = new Date();
    const hour = Math.floor(Math.random() * (now.getHours() + 1));
    const minute = Math.floor(Math.random() * 60);
    const createdAt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

    records.push({
      id: generateId(),
      orderNumber: `ORD-${String(i + 1).padStart(4, '0')}`,
      roomNumber: category === 'time_package' ? Math.floor(Math.random() * 20) + 1 : null,
      category,
      itemName: item.name,
      quantity,
      unitPrice: item.price,
      totalPrice: item.price * quantity,
      paymentMethod,
      createdAt,
    });
  }

  return records.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// 주간 일별 매출 데이터 생성
const generateWeeklySales = (): DailySales[] => {
  const days: DailySales[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const timePackage = Math.floor(Math.random() * 200000) + 100000;
    const food = Math.floor(Math.random() * 150000) + 50000;
    const drink = Math.floor(Math.random() * 80000) + 30000;
    const snack = Math.floor(Math.random() * 40000) + 10000;
    const etc = Math.floor(Math.random() * 30000) + 5000;

    days.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      timePackage,
      food,
      drink,
      snack,
      etc,
      total: timePackage + food + drink + snack + etc,
    });
  }

  return days;
};

// 시간대별 매출 데이터 생성
const generateHourlySales = (): HourlySales[] => {
  const hours: HourlySales[] = [];

  for (let h = 10; h <= 23; h++) {
    // 피크 시간(14-16시, 19-21시)에 매출이 높게
    let base = 20000;
    if ((h >= 14 && h <= 16) || (h >= 19 && h <= 21)) {
      base = 80000;
    } else if (h >= 12 && h <= 13) {
      base = 50000;
    }

    hours.push({
      hour: `${h}시`,
      sales: base + Math.floor(Math.random() * 30000),
    });
  }

  return hours;
};

// 카테고리별 매출 데이터 생성
const generateCategorySales = (): CategorySales[] => {
  const data: CategorySales[] = [
    { category: 'time_package', categoryName: '시간권', sales: 245000, percentage: 0 },
    { category: 'food', categoryName: '음식', sales: 156000, percentage: 0 },
    { category: 'drink', categoryName: '음료', sales: 89000, percentage: 0 },
    { category: 'snack', categoryName: '스낵', sales: 34000, percentage: 0 },
    { category: 'etc', categoryName: '기타', sales: 28000, percentage: 0 },
  ];

  const total = data.reduce((sum, d) => sum + d.sales, 0);
  return data.map((d) => ({
    ...d,
    percentage: Math.round((d.sales / total) * 100),
  }));
};

// 매출 통계 생성
const generateSalesStats = (): SalesStats => ({
  todayTotal: 552000,
  todayDiff: 12.5,
  weekTotal: 3847000,
  weekDiff: 8.2,
  monthTotal: 15230000,
  monthDiff: -3.1,
  avgOrderPrice: 18400,
  avgOrderDiff: 5.8,
});

// Export 데이터
export const mockSalesRecords = generateSalesRecords();
export const mockWeeklySales = generateWeeklySales();
export const mockHourlySales = generateHourlySales();
export const mockCategorySales = generateCategorySales();
export const mockSalesStats = generateSalesStats();
