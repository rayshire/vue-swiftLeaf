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
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodList" :key="item.id" :goods="item" />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts" name="SubCategory">
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from "vue-router";
import { ref, onMounted } from 'vue';
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
getFilterData(route.params.id)
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

async function getGoodList() {
  try {
    const response = await getSubCategoryAPI(reqData.value);
    // 深拷贝response，解决该死的ts类型检查
    goodList.value = JSON.parse(JSON.stringify(response)).result.items;
  } catch (error) {
    console.error("获取分类数据失败:", error);
  }
}

onMounted(() => getGoodList())

//tab切换
function tabChange() {
  reqData.value.page = 1
  getGoodList()
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
