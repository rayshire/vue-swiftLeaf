<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{ filterData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts" name="SubCategory">
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from 'vue';
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

//获取面包屑导航数据
const filterData = ref({
  parentId: '',
  parentName: '',
  name: '',
})
const route = useRoute();

async function getFilterData(id: string | string[]) {
  try {
    const response = await getCategoryFilterAPI(id);
    // 深拷贝response，解决该死的ts类型检查
    filterData.value = JSON.parse(JSON.stringify(response)).result;
  } catch (error) {
    console.error("获取分类数据失败:", error);
  }
}

//获取基础列表数据
//商品列表
const goodList = ref([])
//请求数据
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
watch(() => route.params.id, (newVal) => {
  reqData.value.categoryId = newVal
  getGoodList(reqData.value)
  getFilterData(newVal)
})
//获取商品列表
async function getGoodList(value) {
  try {
    const response = await getSubCategoryAPI(value);
    // 深拷贝response，解决该死的ts类型检查
    goodList.value = JSON.parse(JSON.stringify(response)).result.items;
  } catch (error) {
    console.error("获取分类数据失败:", error);
  }
}
onMounted(() => {
  getGoodList(reqData.value);
})
getFilterData(route.params.id)

//tab切换
function tabChange() {
  reqData.value.page = 1
  getGoodList(reqData.value)
}
//无限加载
const disabled = ref(false)
async function load() {
  // // 如果已经加载了三页数据，停止加载
  // if (reqData.value.page >= 3) {
  //   disabled.value = true
  //   return
  // }
  // 获取下一页的数据
  reqData.value.page++
  // 深拷贝response，解决该死的ts类型检查
  const res = JSON.parse(JSON.stringify(await getSubCategoryAPI(reqData.value)))
  // 将新数据添加到列表中,使用展开运算符
  goodList.value = [...goodList.value, ...res.result.items]
  // 加载完毕 停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}

</script>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
