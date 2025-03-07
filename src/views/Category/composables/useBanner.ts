//封装轮播图业务代码
import { ref, onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";

export function useBanner() {
  const bannerList = ref([]);
  async function getBanner() {
    try {
      const response = await getBannerAPI({
        distributionSite: "2",
      });
      // 深拷贝response，解决该死的ts类型检查
      bannerList.value = JSON.parse(JSON.stringify(response)).result;
    } catch (error) {
      console.error("获取分类数据失败:", error);
    }
  }
  onMounted(() => {
    getBanner();
  });
  return {
    bannerList,
  };
}
