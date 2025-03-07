//封装分类数据业务代码
import { onMounted, ref } from "vue";
import { getTopCategoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory() {
  const categoryData = ref({
    id: "",
    name: "",
    children: [],
  });
  const route = useRoute();

  // 获取分类数据
  async function getCategory(id: string | string[]) {
    try {
      const response = await getTopCategoryAPI(id);
      // 深拷贝response，解决该死的ts类型检查
      categoryData.value = JSON.parse(JSON.stringify(response)).result;
    } catch (error) {
      console.error("获取人气推荐数据失败:", error);
    }
  }
  onMounted(() => {
    getCategory(route.params.id);
  });
  //解决缓存问题
  //在路由变化时重新获取数据
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });
  return {
    categoryData,
  };
}
