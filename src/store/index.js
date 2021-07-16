import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    userProfile: {},
    rooms: [],
    room: {},
    messages: [],
    files: [],
    loading: false,
    sharingScreen: false,
    alert: {
      state: '',
      message: '',
    },
  },
  mutations: {
    setAlert({ alert }, newAlert) {
      Object.assign(alert, newAlert);
    },
    setLoadingState(state, isLoading) {
      state.loading = isLoading;
    },
    setSharingState(state, isSharing) {
      state.sharingScreen = isSharing;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setUsers(state, val) {
      state.users = val;
    },
    setRoom(state, val) {
      state.room = val;
    },
    setRooms(state, val) {
      state.rooms = val;
    },
    deleteRoom(state, room) {
      state.rooms = state.rooms.filter((el) => el.id !== room.id);
    },
    setMessages(state, val) {
      state.messages = val;
    },
    setFiles(state, val) {
      state.files = val;
    },
    addFile(state, val) {
      state.files.push(val);
    },
    deleteFile(state, val) {
      state.files = state.files.filter((el) => el.file.name !== val.file.name);
    },
    addMessage(state, message) {
      state.messages.unshift(message);
    },
  },

  actions: {
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
      commit('setRoom', {});
      router.push('/login');
    },
    async loginWithGoogle({ state, dispatch, commit }) {
      const provider = new fb.firebase.auth.GoogleAuthProvider();
      commit('setLoadingState', true);
      await fb.firebase.auth().signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // let credential = result.credential;
        // let token = credential.accessToken;
        if (result.additionalUserInfo.isNewUser) {
          fb.usersCollection.doc(result.user.uid).set({
            name: result.additionalUserInfo.profile.given_name,
            lastname: result.additionalUserInfo.profile.family_name || '',
            email: result.additionalUserInfo.profile.email,
            photoURL: result.additionalUserInfo.profile.picture,
            isGoogle: true,
            roomId: '',
          });
          dispatch('fetchData', result.user);
        } else {
          dispatch('fetchData', result.user).then(() => {
            dispatch('updateProfile', {
              id: result.user.uid,
              name: result.additionalUserInfo.profile.given_name,
              lastname: result.additionalUserInfo.profile.family_name || '',
              photoURL: result.additionalUserInfo.profile.picture,
              roomId: state.userProfile.roomId,
              isGoogle: true,
            });
          });
        }
        commit('setAlert', {
          state: 'success',
          message: 'A iniciado sesión',
        });
      });// .catch(() => {
      // });
      commit('setLoadingState', false);
    },

    async login(context, form) {
      await fb.auth.signInWithEmailAndPassword(form.email, form.password);
    },

    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid || user.id).get();
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
      dispatch('fetchData', user);
    },
    async updateProfile({ state, dispatch, commit }, user) {
      await fb.usersCollection.doc(user.id).update({
        name: user.name,
        lastname: user.lastname,
        photoURL: user.photoURL,
        roomId: user.roomId,
      });
      if (state.room && Object.keys(state.room).length) {
        const newRoom = { ...state.room };
        if (state.room.hostId === user.id) newRoom.hostName = `${user.name} ${(user.lastname || '')}`;
        state.room.members.forEach(async (member, index) => {
          if (member.id === state.userProfile.id) {
            newRoom.members[index] = {
              id: state.userProfile.id,
              photoURL: user.photoURL,
              memberName: `${user.name} ${user.lastname || ''}`,
            };
            await dispatch('updateRooms', newRoom);
          }
        });
      }
      commit('setUserProfile', {
        id: state.userProfile.id,
        email: state.userProfile.email,
        ...user,
      });
    },
    async updateRooms({ dispatch }, room) {
      await fb.roomsCollection.doc(room.id).update({ ...room });
      await dispatch('fetchMessages');
      await dispatch('fetchFiles');
    },
    async createRoom({ state, dispatch, commit }, room) {
      const newRoom = {
        createdOn: new Date(),
        ...room,
        hostId: fb.auth.currentUser.uid,
        hostName: state.userProfile.name,
        sharingId: '',
        members: [{ id: fb.auth.currentUser.uid, photoURL: (state.userProfile.photoURL || '') }],
      };

      commit('setLoadingState', true);
      fb.roomsCollection.add(newRoom).then(async (e) => {
        const newUser = { ...state.userProfile };
        newUser.roomId = e.id;
        commit('setRoom', { id: e.id, ...newRoom });
        await dispatch('updateProfile', newUser);
        commit('setLoadingState', false);
        router.push('/home/room');
      });
    },
    async joinRoom({ state, commit, dispatch }, roomId) {
      const room = state.rooms.find((e) => e.id === roomId);
      const members = [...room.members, { id: state.userProfile.id, photoURL: (state.userProfile.photoURL || ''), memberName: `${state.userProfile.name} ${state.userProfile.lastname || ''}` }];
      const newUser = { ...state.userProfile };
      newUser.roomId = roomId;
      commit('setLoadingState', true);
      await dispatch('updateProfile', newUser);
      await fb.roomsCollection.doc(room.id).update({ members });
      room.members = members;
      router.push('/home/room');
      await dispatch('updateRooms', room);
      commit('setLoadingState', false);
    },
    async shareScreen({ state, commit, dispatch }) {
      commit('setSharingState', true);
      const newRoom = state.room;
      newRoom.sharingId = state.userProfile.id;
      commit('setLoadingState', true);
      dispatch('updateRooms', newRoom).then(() => commit('setLoadingState', false));
    },
    async stopSharing({ state, commit, dispatch }) {
      commit('setSharingState', false);
      const newRoom = state.room;
      newRoom.sharingId = '';
      commit('setLoadingState', true);
      dispatch('updateRooms', newRoom).then(() => commit('setLoadingState', false));
    },
    async leaveRoom({ state, commit, dispatch }) {
      commit('setLoadingState', true);
      const members = [...state.room.members]
        .filter((member) => member.id !== state.userProfile.id);
      const newRoom = { ...state.room };
      newRoom.members = members;
      const newUser = { ...state.userProfile };
      newUser.roomId = '';
      if (state.userProfile.id === state.room.hostId && newRoom.members.length) {
        newRoom.hostId = newRoom.members[0].id;
        newRoom.hostName = newRoom.members[0].memberName;
        await dispatch('updateRooms', newRoom);
        commit('setRoom', {});
        dispatch('updateProfile', newUser);
      } else if (state.userProfile.id === state.room.hostId && !newRoom.members.length) {
        await fb.roomsCollection.doc(newRoom.id).delete();
        commit('setRoom', {});
        commit('deleteRoom', newRoom);
        dispatch('updateProfile', newUser);
      } else {
        await dispatch('updateRooms', newRoom);
        commit('setRoom', {});
        dispatch('updateProfile', newUser);
      }
      commit('setLoadingState', false);
      router.push('/home/account');
    },
    async fetchRooms({ state, commit }) {
      fb.roomsCollection.onSnapshot((snapshot) => {
        const rooms = [];
        snapshot.forEach((doc) => {
          rooms.push({ id: doc.id, ...doc.data() });
          if (doc.id === state.userProfile.roomId) {
            commit('setRoom', { id: doc.id, ...doc.data() });
            commit('setSharingState', doc.data().sharingId !== '');
          }
        });
        commit('setRooms', rooms);
      });
    },

    async fetchUsers({ commit }) {
      const users = [];
      const snapshot = await fb.usersCollection.get();
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      commit('setUsers', users);
    },

    async sendMessage({ state }, { messageContent, messageType }) {
      const newMessage = {
        createdOn: new Date(),
        content: messageContent,
        authorId: state.userProfile.id,
        authorName: `${state.userProfile.name} ${state.userProfile.lastname || ''}`,
        roomId: state.room.id,
        type: messageType,
      };
      await fb.messagesCollection.add(newMessage);
    },

    async fetchMessages({ state, commit }) {
      const messages = [];
      await fb.messagesCollection.orderBy('createdOn', 'asc')
        .onSnapshot((snapshot) => snapshot.forEach((doc) => {
          if (doc.data().roomId === state.room.id) messages.unshift({ id: doc.id, ...doc.data() });
        }));
      commit('setMessages', messages);
    },

    async uploadFile({ state, commit }, file) {
      commit('setLoadingState', true);
      const metadata = {
        customMetadata: {
          uploaderId: state.userProfile.id,
        },
      };
      let ref;
      await fb.storage
        .ref(`${state.room.id}/files/${file.name}`)
        .put(file).then((el) => { ref = el.ref; });
      await fb.storage.ref(`${state.room.id}/files/${file.name}`).updateMetadata(metadata).then((md) => commit('addFile', { file: ref, metadata: md }));
      commit('setLoadingState', false);
    },

    async deleteFile({ state, commit }, file) {
      await fb.storage
        .ref(`${state.room.id}/files/${file.file.name}`)
        .delete();
      commit('deleteFile', file);
    },

    async fetchFiles({ state, commit }) {
      const files = [];
      const storageRef = fb.storage.ref(`${state.room.id}/files/`);
      storageRef
        .listAll()
        .then((result) => {
          result.items.forEach((fileRef) => {
            fileRef.getMetadata().then((md) => files.push({ file: fileRef, metadata: md }));
          });
        });
      // .catch((error) => {
      // });
      commit('setFiles', files);
    },

    async fetchData({ dispatch, commit }, user) {
      commit('setLoadingState', true);
      await dispatch('fetchUserProfile', user);
      await dispatch('fetchRooms');
      await dispatch('fetchMessages');
      await dispatch('fetchUsers');
      await dispatch('fetchFiles');
      commit('setLoadingState', false);
    },
  },

  getters: {
    getRoomByName: (state) => (roomName) => state.rooms.find(
      (room) => room.name === roomName,
    ) || {},
    getRoomById: (state) => (roomId) => state.rooms.find(
      (room) => room.id === roomId,
    ) || {},
    getUserById: (state) => (userId) => state.users.find((user) => user.id === userId),
  },

  modules: {
  },
});
