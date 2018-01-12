import 'babel-polyfill';
import 'es6-map';

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
// import VueApollo from 'vue-apollo';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import fetch from 'unfetch';

import createStore from './store';
import App from './components/main_page/App.vue';
import Event from './components/event_page/Event.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
// Vue.use(VueApollo);

const routes = [{ path: '/', component: App }, { path: '/event/:eventId?', component: Event }];

const router = new VueRouter({
  mode: 'history',
  routes,
});

// const apolloClient = new ApolloClient({
//   link: createHttpLink({
//     uri: 'http://localhost:3000/graphql',
//     fetch,
//   }),
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// });

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// });

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store: createStore(),
  // apolloProvider,
  router,
});
