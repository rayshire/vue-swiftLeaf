<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="">
          <!-- <img :src="item.picture" alt=""> -->
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script setup lang="ts" name="HomeHot">
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/apis/home'
import { ref } from 'vue'
import pic from '@/assets/images/200.png'
const hotList = ref([
  {
    id: 1,
    title: '特惠推荐',
    alt: '特惠推荐123123',
    picture: pic,
    price: 123
  }
])

async function getHotList() {
  try {
    const response = await getHotAPI();
    // 深拷贝response，解决该死的ts类型检查
    hotList.value = JSON.parse(JSON.stringify(response)).result;
  } catch (error) {
    console.error("获取人气推荐数据失败:", error);
  }
}
//setup生命周期调用
getHotList()
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
