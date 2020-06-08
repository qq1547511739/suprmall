<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles" :key="index" 
    class="tabcontrol-item" 
    :class="{active:index === currentindex}"
    @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'tabcontrol',
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      currentindex:0
    }
  },
  methods:{
    itemclick(index){
      this.currentindex = index;
      this.$emit('tabclick',index)
    }
  }
}
</script>

<style>
.tabcontrol{
  display: flex;
  text-align: center;
  font-size: 15px;
  background: #fff;
}

.tabcontrol-item{
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.active{
  color: var(--color-high-text);
}

.active span{
  border-bottom:3px solid var(--color-tint)
}

.tabcontrol-item span{
  padding: 5px;
}
</style>