<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <!-- 用element-plus的面包屑组件 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Category">
import { getTopCategoryAPI } from '@/apis/category'
import { ref, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
const categoryData = ref({
  id: '',
  name: '',
})
const route = useRoute()

async function getCategory(id: string | string[]) {
  try {
    const response = await getTopCategoryAPI(id);
    // 深拷贝response，解决该死的ts类型检查
    categoryData.value = JSON.parse(JSON.stringify(response)).result;
  } catch (error) {
    console.error("获取人气推荐数据失败:", error);
  }
}
getCategory(route.params.id)
//在路由变化时重新获取数据
onUpdated(() => {
  getCategory(route.params.id)
})


</script>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
