<template>
  <HomePanel title="新鲜好物" sub-title="——多种商品，待君挑选">
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>


<script setup lang="ts" name="HomeNew">
import HomePanel from './HomePanel.vue'
import { getNewAPI } from '@/apis/home'
import { ref } from 'vue'
const newList = ref([
  {
    id: 1,
    name: '特惠推荐',
    picture: 'https://yanxuan-item.nosdn.127.net/6f4b6e3a5f7a7f3b1d4f9c7d7a4f7a7f.jpg?quality=75&type=webp&imageView&thumbnail=375x375',
    price: 123
  }
])

async function getNewList() {
  try {
    const response = await getNewAPI();
    // 深拷贝response，解决该死的ts类型检查
    newList.value = JSON.parse(JSON.stringify(response)).result;
  } catch (error) {
    console.error("获取新鲜好物数据失败:", error);
  }
}
//setup生命周期调用
getNewList()
</script>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
