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
    },
    setRooms(state, val) {
      state.rooms = val;
    },
    addRoom(state, room) {
      state.rooms.push(room);
    },
    updateRoom(state, room) {
      state.rooms = state.rooms.map((el) => (room.id === el.id ? room : el));
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
        if (result.additionalUserInfo.isNewUser) {
          fb.usersCollection.doc(result.user.uid).set({
            name: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name,
            email: result.additionalUserInfo.profile.email,
            photoURL: result.additionalUserInfo.profile.picture,
            isGoogle: true,
            roomId: '',
          });
        }
        dispatch('fetchUserProfile', result.user);
      }).catch((error) => {
        console.log(`error ${error}`);
      });
    },

    async login({ dispatch }, form) {
      await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        .then((e) => dispatch('fetchUserProfile', e.user)).catch((error) => alert(error));
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
        photoURL: '',
      });
      dispatch('fetchUserProfile', user);
    },
    async updateProfile({ state, dispatch }, user) {
      await fb.usersCollection.doc(state.userProfile.id).update({
        name: user.name,
        lastname: user.lastname,
        photoURL: user.photoURL,
        roomId: user.roomId,
      });
      const room = state.rooms.find((el) => el.id === user.roomId);
      console.log(room);
      if (room && Object.keys(room).length) {
        const newRoom = { ...room };
        room.members.forEach((member, index) => {
          if (member.id === state.userProfile.id) {
            newRoom.members[index] = {
              id: state.userProfile.id,
              photoURL: user.photoURL,
            };
            dispatch('updateRoom', newRoom);
          }
        });
      }
      dispatch('fetchUserProfile', { uid: state.userProfile.id });
    },
    async updateRoom({ commit }, room) {
      await fb.roomsCollection.doc(room.id).update({ ...room });
      commit('updateRoom', room);
    },
    async createRoom({ state, commit, dispatch }, room) {
      const newRoom = {
        createdOn: new Date(),
        ...room,
        hostId: fb.auth.currentUser.uid,
        hostName: state.userProfile.name,
        members: [{ id: fb.auth.currentUser.uid, photoURL: (state.userProfile.photoURL || '') }],
      };

      await fb.roomsCollection.add(newRoom).then((e) => {
        commit('addRoom', { id: e.id, ...newRoom });
        const newUser = { ...state.userProfile };
        newUser.roomId = e.id;
        dispatch('updateProfile', newUser);
      });
      router.push('/home/room');
    },
    async joinRoom({ state, dispatch }, roomId) {
      const room = state.rooms.find((e) => e.id === roomId);
      const members = [...room.members, { id: state.userProfile.id, photoURL: (state.userProfile.photoURL || '') }];
      const newUser = { ...state.userProfile };
      newUser.roomId = roomId;
      dispatch('updateProfile', newUser);
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
    getRoomById: (state) => (roomId) => state.rooms.find(
      (room) => room.id === roomId,
    ) || {},
  },

  modules: {
  },
});
