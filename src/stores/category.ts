import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryApi } from "@/apis/layout";
export const useCategoryStore = defineStore("category", () => {
  // 导航列表的数据管理
  // state 导航列表数据
  const categoryList = ref([
    {
      id: "1005000",
      name: "居家",
      picture: "1.png",
      children: [
        {
          id: "1005999003",
          name: "居家生活用品",
          picture: "1.png",
          children: null,
          goods: null,
        },
      ],
      goods: [
        {
          id: "3997602",
          name: "暖腰暖腹暖胃，蕲艾暖宫腰带",
          desc: "暖宫暖腰暖胃，大面积热敷≈3片暖宝宝",
          price: "49.00",
          picture: "1.jpg",
          orderNum: null,
        },
      ],
    },
  ]);

  // action 获取导航数据的方法
  async function getCategory() {
    try {
      const response = await getCategoryApi();
      // 深拷贝response，解决该死的ts类型检查
      categoryList.value = JSON.parse(JSON.stringify(response)).result;
      // categoryList.value.push({
      //   id: "100500023",
      //   name: "昊哥",
      //   picture: "1.png",
      //   children: [
      //     {
      //       id: "1005999003",
      //       name: "秘密商品",
      //       picture: "1.png",
      //       children: null,
      //       goods: null,
      //     },
      //     {
      //       id: "1005999003",
      //       name: "只卖会员",
      //       picture: "1.png",
      //       children: null,
      //       goods: null,
      //     },
      //   ],
      //   goods: [
      //     {
      //       id: "3997602",
      //       name: "昊哥👄",
      //       desc: "温阳补肾，扶正固本",
      //       price: "9999.00",
      //       picture: "@/assets/images/logo1.png",
      //       orderNum: null,
      //     },
      //   ],
      // });
    } catch (error) {
      console.error("获取分类数据失败:", error);
    }
  }

  return {
    categoryList,
    getCategory,
  };
});
