export interface ProductType {
  id: string;
  name: string;
  thumbnail: string;
  explanation: string;
  price: number;
  discount?: number;
}

const products: ProductType[] = [
  {
    id: "de8a0304-ea0a-42f5-b908-986869a49e6d",
    name: "용과",
    explanation:
      "제주도에서 재배되는 신선한 용과입니다. 달콤하고 시원한 맛이 특징이며, 비타민C가 풍부하여 건강에 좋습니다. 제주의 맑은 공기와 깨끗한 물로 키워진 최고급 용과입니다.",
    price: 15000,
    thumbnail: "thumbnails/jeju-dragon-fruit-001.jpeg",
  },
  {
    id: "0200a6e6-4ee8-4463-a7a4-91539a9834e2",
    name: "바나나",
    explanation:
      "제주도 특산 바나나입니다. 일반 바나나보다 더 달콤하고 부드러운 맛이 특징입니다. 제주의 온화한 기후에서 천천히 익어 더욱 맛있고 영양가가 높습니다.",
    price: 12000,
    thumbnail: "thumbnails/jeju-banana-002.jpeg",
  },
  {
    id: "83a7e17f-637c-447b-a89b-cb0c8edc932a",
    name: "천혜향",
    explanation: "제주도 대표 감귤인 천혜향입니다. 껍질이 얇고 과즙이 풍부하며, 달콤하고 새콤한 맛의 균형이 완벽합니다. 비타민C가 풍부하여 면역력 증진에 도움이 됩니다.",
    price: 25000,
    thumbnail: "thumbnails/jeju-cheonhaehyang-003.jpeg",
  },
  {
    id: "032a8cfb-05f2-421d-a418-ed6e2b0d0522",
    name: "한라봉",
    explanation:
      "제주도 특산 한라봉입니다. 감귤과 오렌지의 교배종으로, 달콤하고 향긋한 맛이 특징입니다. 과육이 부드럽고 과즙이 풍부하여 생과로 먹기에 최적입니다.",
    price: 30000,
    thumbnail: "thumbnails/jeju-hallabong-004.jpeg",
  },
  {
    id: "a404f88f-f7be-4000-911e-23ffcad7ffb5",
    name: "카라향",
    explanation:
      "제주도 특산 카라향입니다. 한라봉과 레드향의 교배종으로, 붉은 과육과 달콤한 맛이 특징입니다. 항산화 성분이 풍부하여 건강에 좋습니다.",
    price: 28000,
    thumbnail: "thumbnails/jeju-carahyung-005.jpeg",
  },
  {
    id: "c1a5f6e5-1e3f-4d7c-aef8-ac47bc82b2ff",
    name: "레드향",
    explanation: "제주도 특산 레드향입니다. 붉은 과육이 특징이며, 달콤하고 새콤한 맛의 균형이 완벽합니다. 비타민C와 항산화 성분이 풍부합니다.",
    price: 22000,
    thumbnail: "thumbnails/jeju-redhyung-006.jpeg",
  },
  {
    id: "f4bf010c-1310-4f2c-87b2-ce3a1b08f067",
    name: "하우스 감귤",
    explanation: "제주도 노지에서 재배되는 감귤입니다. 자연 그대로의 맛과 향이 특징이며, 비타민C가 풍부합니다. 제주의 맑은 공기와 깨끗한 토양에서 자라 더욱 건강합니다.",
    price: 18000,
    thumbnail: "thumbnails/jeju-orange-007.jpeg",
  },
  {
    id: "8a8a1b2b-200a-44cb-9c60-9375d82dd8bb",
    name: "황금향",
    explanation: "제주도 특산 황금향입니다. 황금빛 과육이 특징이며, 달콤하고 향긋한 맛이 일품입니다. 비타민C와 베타카로틴이 풍부하여 건강에 좋습니다.",
    price: 32000,
    thumbnail: "thumbnails/jeju-golden-008.jpeg",
  },
];

export const getById = (id: string) => {
  const productIndex = products.findIndex((product) => product.id === id);

  if (products[productIndex]) {
    return products[productIndex];
  }

  return null;
};

export const deleteById = (id: string) => {
  const productIndex = products.findIndex((product) => product.id === id);

  products.splice(productIndex, 1);
};

export default products;
