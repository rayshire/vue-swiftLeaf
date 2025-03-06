import { ref } from "vue";
import { defineStore } from "pinia";
import { getCategoryApi } from "@/apis/layout";
export const useCategoryStore = defineStore("category", () => {
  // 导航列表的数据管理
  // state 导航列表数据
  const categoryList = ref([
    {
      id: 0,
      name: "首页",
    },
  ]);

  // action 获取导航数据的方法
  async function getCategory() {
    try {
      const response = await getCategoryApi();
      // 深拷贝response，解决该死的ts类型检查
      categoryList.value = JSON.parse(JSON.stringify(response)).result;
    } catch (error) {
      console.error("获取分类数据失败:", error);
    }
  }

  return {
    categoryList,
    getCategory,
  };
});
