<template>
  <div class="goods">
    <goodslistitem v-for="(item,index) in goods" :goodsItem="item" :key="index"></goodslistitem>
  </div>
</template>

<script>
import goodslistitem from './goodslistitem'

export default {
  name:'goodslist',
  components:{
    goodslistitem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.goods{
  display: flex;
  flex-wrap: wrap;
  /* 图片间隙设置均等分 */
  justify-content: space-evenly;
}
</style>