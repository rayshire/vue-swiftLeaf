<template>
  <div>
    <nav class="topnav">
      <div class="container">
        <ul>
          <template v-if="true">
            <li><a href="javascript:;"><i class="iconfont icon-user"></i>方大同rip</a></li>
            <li>
              <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
                <template #reference>
                  <a href="javascript:;">退出登录</a>
                </template>
              </el-popconfirm>
            </li>
            <li><a href="javascript:;">我的订单</a></li>
            <li><a href="javascript:;">会员中心</a></li>
          </template>
          <template v-else>
            <li><a href="javascript:;">请先登录</a></li>
            <li><a href="javascript:;">帮助中心</a></li>
            <li><a href="javascript:;">关于我们</a></li>
          </template>
        </ul>

      </div>

    </nav>
  </div>
</template>

<script setup lang="ts" name="LayoutNav">

</script>
<!-- scss Sass 允许将一套 CSS 样式嵌套进另一套样式中，
内层的样式将它外层的选择器作为父选择器 -->
<style scoped lang="scss">
.topnav {
  background-color: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        // 鼠标悬停时，字体颜色变为白色,&在scss中为父选择器
        &:hover {
          color: $xtxColor;
        }
      }

      // 除了第一个li标签，其他li标签都添加左边框
      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
