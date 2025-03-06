<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts" name="HomeBanner">
import { getBannerAPI } from '@/apis/home'
import { ref, onBeforeMount } from 'vue';

const bannerList = ref([
  {
    id: 1,
    imgUrl: 'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg',
  },
])

onBeforeMount(() => {
  getBanner()
})

async function getBanner() {
  try {
    const response = await getBannerAPI();
    // 深拷贝response，解决该死的ts类型检查
    bannerList.value = JSON.parse(JSON.stringify(response)).result;
  } catch (error) {
    console.error("获取分类数据失败:", error);
  }
}

</script>

<style scoped>
.home-banner {
  width: 990px;
  height: 500px;
  position: absolute;
  left: 250px;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
