/* eslint-disable no-shadow */
const state = {
  slides: [],
  errorMsg: '',
  successMsg: '',
};

const getters = {
  slides(state) {
    return state.slides;
  },
  errorMsg(state) {
    return state.errorMsg;
  },
  successMsg(state) {
    return state.successMsg;
  },
};

const mutations = {
  setSlides(state, payload) {
    state.slides = payload;
  },
  deleteSlide(state, payload) {
    let deleteId;
    if (!payload) {
      state.errorMsg = '삭제 할 아이디 값을 입력해주세요.';
      return;
    }

    if (typeof payload === 'string') {
      const trimmed = payload.trim();
      deleteId = payload.length > 0 ? Number(trimmed) : trimmed;
    }

    // 삭제 할 데이터의 index 값을 참조
    const indexToDelete = state.slides.findIndex(item => item.id === deleteId);
    if (indexToDelete === -1) {
      state.errorMsg = '해당 아이디 값의 데이터가 삭제 되었거나 없습니다.';
    } else {
      state.slides.splice(indexToDelete, 1);
      state.successMsg = `id: ${deleteId} 데이터가 삭제 되었습니다.`;
    }
  },
  resetMsgs(state) {
    state.errorMsg = '';
    state.successMsg = '';
  },
};

const actions = {
  setSlides({ commit }, payload) {
    commit('setSlides', payload);
  },
  deleteSlide({ commit }, payload) {
    commit('resetMsgs');
    commit('deleteSlide', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
