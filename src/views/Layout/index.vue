<template>
  <div>
    <!-- 二级路由出口 -->
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />

  </div>
</template>
//触发获取导航数据的action,在主页加载时获取,优化重复获取数据
<script setup lang="ts" name="Layout">
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

import { useCategoryStore } from '@/stores/category'
import { onBeforeMount } from 'vue';
//获取分类数据
onBeforeMount(() => {
  categoryStore.getCategory()
})
const categoryStore = useCategoryStore()

</script>

<style scoped></style>
