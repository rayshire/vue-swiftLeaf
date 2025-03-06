<template>
  <div>
    <div class="home-panel">
      <div class="container">
        <div class="head">
          <!-- 主标题和副标题 -->
          <h3>
            {{ title }}<small>{{ subTitle }}</small>
          </h3>
        </div>
        <!-- 主体内容区域 -->
        <!--默认插槽 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Homepanel">
//定义props
// 定义props属性
defineProps({
  // 标题
  title: {
    type: String,
    // 默认值为空字符串
    default: ''
  },
  // 副标题
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
