import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: {},
    rooms: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
      console.log(val);
    },
    setRooms(state, val) {
      state.rooms = val;
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
  },

  actions: {
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      router.push('/login');
    },
    async loginWithGoogle({ dispatch }) {
      const provider = new fb.firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      fb.firebase.auth().signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // let credential = result.credential;
        // let token = credential.accessToken;
        console.log(result);
        dispatch('fetchGoogleProfile', result.user);
        if (router.currentRoute.path === '/login' || router.currentRoute.path === '/' || router.currentRoute.path === '/createaccount') {
          router.push('/home/account');
        }
      }).catch((error) => {
        console.log(`error ${error.code}`);
      });
    },

    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUserProfile', user);
    },

    async fetchGoogleProfile({ commit }, user) {
      commit('setUserProfile', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isGoogle: true,
      });
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUserProfile', {
        id: userProfile.id,
        ...userProfile.data(),
      });
      if (router.currentRoute.path === '/login' || router.currentRoute.path === '/' || router.currentRoute.path === '/createaccount') {
        router.push('/home/account');
      }
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        lastname: form.lastname,
        email: form.email,
        roomId: '',
      });
      dispatch('fetchUserProfile', user);
    },
    async updateProfile({ state, dispatch }, user) {
      await fb.usersCollection.doc(state.userProfile.id).update({
        name: user.name,
        lastname: user.lastname,
        photoURL: user.photoURL,
      });
      dispatch('fetchUserProfile', { uid: state.userProfile.id });
    },
    async createRoom({ state, commit }, room) {
      const newRoom = {
        createdOn: new Date(),
        ...room,
        hostId: fb.auth.currentUser.uid,
        hostName: state.userProfile.name,
        members: [],
      };
      await fb.roomsCollection.add(newRoom);
      router.push('/home/room');
      commit('addRoom', newRoom);
    },
    async joinRoom({ state, dispatch }, roomId) {
      const room = state.rooms.find((e) => e.id === roomId);
      const members = [...room.members, { id: state.userProfile.id, photoURL: (state.userProfile.photoURL || '') }];
      await fb.roomsCollection.doc(room.id).update({ members });
      router.push('/home/room');
      dispatch('fetchRooms');
    },
    async fetchRooms({ commit }) {
      const rooms = [];
      const snapshot = await fb.roomsCollection.get();
      snapshot.forEach((doc) => rooms.push({ id: doc.id, ...doc.data() }));
      commit('setRooms', rooms);
    },
  },

  getters: {
    getRoomByName: (state) => (roomName) => state.rooms.find(
      (room) => room.name === roomName,
    ) || {},
  },

  modules: {
  },
});
