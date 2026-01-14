/**
 * 데이터 생성 규모:
 * - 매장: 100개소
 * - 카테고리: 매장당 10개 (총 1,000개)
 * - 음식: 카테고리당 20개 (총 20,000개)
 * - 게임: 매장당 100개 (총 10,000개)
 * - 방: 매장당 30개 (총 3,000개)
 * - 시간 플랜: 매장당 4개 (총 400개)
 * - 음식 주문: 매장당 5개 (총 500개) - 첫 번째 매장만
 *
 * 주의: DB 스키마 변경 시 이 파일도 함께 업데이트 필요
 */
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ko';
import {
  GAME_DIFFICULTY_VALUES,
  GAME_GENRE_VALUES,
  STORE_ROOM_STATUS,
  STORE_ROOM_STATUS_VALUES,
  FOOD_ORDER_STATUS_VALUES,
} from '@repo/consts';

const prisma = new PrismaClient();

// 이미지/동영상 URL 상수
const FOOD_IMAGE_URL = 'https://static.imkdw.dev/maratang.webp';
const GAME_IMAGE_URL = 'https://static.imkdw.dev/boardgame.webp';
const STORE_VIDEO_URL = 'https://static.imkdw.dev/dog.mp4';

// 음식 카테고리 목록
const FOOD_CATEGORY_NAMES = [
  '식사류',
  '분식',
  '튀김류',
  '음료',
  '디저트',
  '주류',
  '안주',
  '샐러드',
  '스낵',
  '세트메뉴',
];

// 보드게임 이름 목록
const BOARD_GAME_NAMES = [
  '스플렌더',
  '카탄',
  '뱅!',
  '다빈치코드',
  '루미큐브',
  '아줄',
  '티켓투라이드',
  '킹도미노',
  '코드네임',
  '하나비',
  '팬데믹',
  '러브레터',
  '도블',
  '할리갈리',
  '7원더스',
  '테라포밍마스',
  '버건디의성',
  '푸에르토리코',
  '아그리콜라',
  '글룸헤이븐',
  '윙스팬',
  '브라스 버밍엄',
  '스컬킹',
  '딕싯',
  '텔레스트레이션',
  '아발론',
  '레지스탕스',
  '마피아',
  '원나잇얼티밋웨어울프',
  '비밀의문',
  '스타워즈 리벨리온',
  '루트',
  '사이쓰',
  '임페리얼 세틀러',
  '에버델',
  '클랭크',
  '도미니언',
  '스톤에이지',
  '카르카손',
  '오를레앙',
  '마르코폴로',
  '가이아 프로젝트',
  '이스탄불',
  '투 제너럴스',
  '컨커러스 오브 어스',
  '라스베가스',
  '킹 오브 도쿄',
  '칵스',
  '모노폴리',
  '클루',
];

// 음식 이름 목록
const FOOD_NAMES = [
  '마라탕',
  '떡볶이',
  '순대',
  '튀김',
  '오뎅',
  '김밥',
  '라면',
  '우동',
  '돈까스',
  '치킨',
  '피자',
  '파스타',
  '햄버거',
  '감자튀김',
  '나초',
  '콜라',
  '사이다',
  '맥주',
  '소주',
  '막걸리',
  '아이스티',
  '커피',
  '주스',
  '스무디',
  '케이크',
  '와플',
  '아이스크림',
  '쿠키',
  '브라우니',
  '마카롱',
  '샌드위치',
  '샐러드',
  '치즈볼',
  '모짜렐라스틱',
  '양념감자',
  '핫도그',
  '타코',
  '부리또',
  '양꼬치',
  '닭발',
];

function generateUUID(): string {
  return faker.string.uuid();
}

function padNumber(num: number, length: number): string {
  return String(num).padStart(length, '0');
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)]!;
}

async function main() {
  const startTime = Date.now();

  await prisma.foodOrderItem.deleteMany();
  await prisma.foodOrder.deleteMany();
  await prisma.roomSession.deleteMany();
  await prisma.storeTimePlan.deleteMany();
  await prisma.storeFoodCategoryItem.deleteMany();
  await prisma.storeFood.deleteMany();
  await prisma.storeFoodCategory.deleteMany();
  await prisma.storeGame.deleteMany();
  await prisma.storeRoom.deleteMany();
  await prisma.store.deleteMany();

  const stores: { id: string; name: string }[] = [];

  for (let i = 1; i <= 100; i++) {
    const storeId = generateUUID();
    const storeName = `홀리쉣보드게임 ${padNumber(i, 3)}점`;

    stores.push({ id: storeId, name: storeName });

    await prisma.store.create({
      data: {
        id: storeId,
        name: storeName,
        address: faker.location.streetAddress({ useFullAddress: true }),
        wifiName: `HolySheet_${padNumber(i, 3)}`,
        wifiPassword: faker.string.alphanumeric(8),
        contact: faker.phone.number({ style: 'national' }),
        introVideoUrl: STORE_VIDEO_URL,
        ip: i === 1 ? '1.1.1.1' : `192.168.${Math.floor(i / 256)}.${i % 256}`,
        latitude: faker.location.latitude({ min: 33, max: 38 }),
        longitude: faker.location.longitude({ min: 125, max: 130 }),
      },
    });
  }

  let totalCategories = 0;
  let totalFoods = 0;
  let totalGames = 0;
  let totalRooms = 0;
  let totalTimePlans = 0;
  let totalFoodOrders = 0;

  // 첫 번째 매장의 음식 ID 저장 (주문 생성용)
  const firstStoreFoodIds: string[] = [];

  // 시간 플랜 템플릿
  const TIME_PLAN_TEMPLATES = [
    { name: '1시간', durationMinutes: 60, price: 4000, isRecommended: false, sort: 1 },
    { name: '2시간', durationMinutes: 120, price: 7000, isRecommended: true, sort: 2 },
    { name: '3시간', durationMinutes: 180, price: 10000, isRecommended: false, sort: 3 },
    { name: '종일권', durationMinutes: 480, price: 15000, isRecommended: false, sort: 4 },
  ];

  for (const store of stores) {
    const categories: { id: string; name: string }[] = [];
    for (let c = 0; c < 10; c++) {
      const categoryId = generateUUID();
      const categoryName = FOOD_CATEGORY_NAMES[c]!;
      categories.push({ id: categoryId, name: categoryName });

      await prisma.storeFoodCategory.create({
        data: {
          id: categoryId,
          storeId: store.id,
          name: categoryName,
        },
      });
      totalCategories++;
    }

    for (const category of categories) {
      const foodsInCategory: { id: string }[] = [];

      for (let f = 0; f < 20; f++) {
        const foodId = generateUUID();
        const foodNameIndex = (categories.indexOf(category) * 20 + f) % FOOD_NAMES.length;
        const foodName = `${FOOD_NAMES[foodNameIndex]} ${faker.commerce.productAdjective()}`;

        const foodPrice = faker.number.int({ min: 3000, max: 25000, multipleOf: 500 });

        await prisma.storeFood.create({
          data: {
            id: foodId,
            storeId: store.id,
            name: foodName,
            description: faker.commerce.productDescription(),
            price: foodPrice,
            isPopular: faker.datatype.boolean({ probability: 0.2 }),
            isNew: faker.datatype.boolean({ probability: 0.15 }),
            imageUrl: FOOD_IMAGE_URL,
          },
        });

        foodsInCategory.push({ id: foodId });
        totalFoods++;

        // 첫 번째 매장의 음식 ID와 정보 저장
        if (stores.indexOf(store) === 0) {
          firstStoreFoodIds.push(foodId);
        }
      }

      for (let order = 0; order < foodsInCategory.length; order++) {
        await prisma.storeFoodCategoryItem.create({
          data: {
            categoryId: category.id,
            foodId: foodsInCategory[order]!.id,
            order,
          },
        });
      }
    }

    for (let g = 0; g < 100; g++) {
      const gameId = generateUUID();
      const gameNameIndex = g % BOARD_GAME_NAMES.length;
      const gameName =
        g < BOARD_GAME_NAMES.length
          ? BOARD_GAME_NAMES[gameNameIndex]!
          : `${BOARD_GAME_NAMES[gameNameIndex]} ${faker.word.adjective()}`;

      const stock = faker.number.int({ min: 1, max: 5 });
      const availableStock = faker.number.int({ min: 0, max: stock });
      const minPlayers = faker.number.int({ min: 1, max: 3 });
      const maxPlayers = faker.number.int({ min: minPlayers + 1, max: 10 });

      await prisma.storeGame.create({
        data: {
          id: gameId,
          storeId: store.id,
          name: gameName,
          thumbnail: GAME_IMAGE_URL,
          images: [GAME_IMAGE_URL],
          minPlayers,
          maxPlayers,
          playTime: faker.number.int({ min: 10, max: 180, multipleOf: 5 }),
          difficulty: getRandomElement(GAME_DIFFICULTY_VALUES),
          genres: getRandomElements([...GAME_GENRE_VALUES], faker.number.int({ min: 1, max: 3 })),
          isRecommended: faker.datatype.boolean({ probability: 0.1 }),
          stock,
          availableStock,
          description: faker.lorem.paragraphs(2),
          rules: faker.lorem.paragraphs(3),
          videoUrl: faker.datatype.boolean({ probability: 0.3 })
            ? `https://www.youtube.com/watch?v=${faker.string.alphanumeric(11)}`
            : null,
        },
      });
      totalGames++;
    }

    for (let r = 1; r <= 30; r++) {
      const roomId = generateUUID();
      const minCapacity = faker.number.int({ min: 2, max: 4 });
      const maxCapacity = faker.number.int({ min: minCapacity + 2, max: 12 });

      await prisma.storeRoom.create({
        data: {
          id: roomId,
          storeId: store.id,
          roomNumber: r,
          status: r === 1 ? STORE_ROOM_STATUS.AVAILABLE : getRandomElement(STORE_ROOM_STATUS_VALUES),
          minCapacity,
          maxCapacity,
          description: `${r}번방 - ${minCapacity}~${maxCapacity}인실`,
        },
      });
      totalRooms++;
    }

    // 시간 플랜 생성
    for (const template of TIME_PLAN_TEMPLATES) {
      await prisma.storeTimePlan.create({
        data: {
          id: generateUUID(),
          storeId: store.id,
          name: template.name,
          durationMinutes: template.durationMinutes,
          price: template.price,
          isRecommended: template.isRecommended,
          sort: template.sort,
        },
      });
      totalTimePlans++;
    }
  }

  // 첫 번째 매장에 음식 주문 생성 (테스트용)
  const firstStore = stores[0]!;
  const firstStoreFoods = await prisma.storeFood.findMany({
    where: { storeId: firstStore.id },
    take: 10,
  });

  for (let o = 0; o < 5; o++) {
    const orderId = generateUUID();
    const roomNumber = faker.number.int({ min: 1, max: 30 });
    const status = getRandomElement(FOOD_ORDER_STATUS_VALUES);

    // 1~3개의 랜덤 음식 선택
    const orderFoods = getRandomElements(firstStoreFoods, faker.number.int({ min: 1, max: 3 }));

    const orderItems = orderFoods.map((food) => {
      const quantity = faker.number.int({ min: 1, max: 3 });
      return {
        id: generateUUID(),
        orderId,
        foodId: food.id,
        foodName: food.name,
        quantity,
        unitPrice: food.price,
        totalPrice: food.price * quantity,
      };
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + item.totalPrice, 0);

    await prisma.foodOrder.create({
      data: {
        id: orderId,
        storeId: firstStore.id,
        roomSessionId: null,
        roomNumber,
        status,
        totalPrice,
        items: {
          create: orderItems.map((item) => ({
            id: item.id,
            foodId: item.foodId,
            foodName: item.foodName,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });
    totalFoodOrders++;
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`Duration: ${duration} seconds`);
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
