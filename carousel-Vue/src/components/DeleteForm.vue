<template lang="pug">
  .image-delete
    h3.title 이미지 삭제
    div.input-box
      label id:
        input(
          type="text"
          autocomplete="false"
          v-model="deleteValue"
          @keypress="handleKeyEvent"
        )
      span.input-error {{ errorMsg }}
      button.btn-delete(@click="handleDelete(deleteValue)") 삭제
      span.success {{ successMsg }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('carousel');

export default {
  name: 'DeleteForm',
  data() {
    return {
      deleteValue: null,
    };
  },
  computed: {
    ...mapGetters(['errorMsg', 'successMsg']),
    inputValue: {
      get() {
        return this.toDelete;
      },
      set(newValue) {
        this.toDelete = newValue;
        return this.toDelete;
      },
    },
  },
  methods: {
    ...mapActions(['deleteSlide']),
    handleKeyEvent($event) {
      if ($event.keyCode === 13) {
        this.handleDelete(this.deleteValue);
      }
    },
    handleDelete(id) {
      this.deleteSlide(id);

      // 인풋 값 1초 뒤에 리셋
      setTimeout(this.resetInput, 600);
    },
    resetInput() {
      this.toDelete = '';
    },
  },
};
</script>

<style scoped lang="scss">
.image-delete {
  padding: 30px 0;
  .title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .input-box {
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    align-items: center;
    position: relative;
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ececec;
    box-sizing: content-box;
    label {
      display: flex;
      align-items: center;
      width: 100%;
      font-weight: bold;
      input[type="text"] {
        width: 100%;
        height: 40px;
        margin-left: 10px;
        padding: 0 15px;
        border: 0;
        border-radius: 5px 0 0 5px;
        font-size: 15px;
        &:focus {
          outline: none;
          border: 1px solid #000;
        }
      }
    }
    .input-error, .success {
      position: absolute;
      bottom: -25px;
      font-size: 14px;
      color: red;
    }
    .btn-delete {
      width: 60px;
      height: 40px;
      font-size: 14px;
      color: #fff;
      background-color: #000;
      border-radius: 0 5px 5px 0;
      border: 0;
      &:hover {
        background: #444141;
        transition: background 0.34s cubic-bezier(0.11, 0.47, 1, 1);
        // color: #000;
      }
    }
    .success {
      color: teal;
    }
  }

}
</style>
