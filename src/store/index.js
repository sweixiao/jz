import { createStore } from "vuex";
const store = createStore({
  state: {
    tabIdx: 0, //导航索引
  },
  mutations: {
    SET_TAB_IDX(state, idx) {
      state.tabIdx = idx;
    },
  },
});

export default store;
