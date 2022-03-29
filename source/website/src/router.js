import Vue from 'vue'
import VueRouter from 'vue-router'
import Analysis from '@/views/Analysis.vue'
import Upload from '@/views/UploadToAWSS3.vue'
import Collection from '@/views/Collection.vue'
import Login from '@/views/Login.vue'
import SearchFlix from '@/views/SearchFlix.vue'
import VideoPlayer2 from '@/components/VideoPlayer2.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'SearchFlix',
      component: SearchFlix,
      meta: { requiresAuth: true }
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: { requiresAuth: true }
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
      meta: { requiresAuth: true }
    },
    {
      path: '/analysis/:asset_id',
      name: 'analysis',
      component: Analysis,
      meta: { requiresAuth: true }
    },
    {
      path: "/",
      name: "Login",
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/video',
      name: 'video',
      component: VideoPlayer2,
    },

  ]
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      await Vue.prototype.$Amplify.Auth.currentAuthenticatedUser();
      next();
    } catch (e) {
      console.log(e);
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    }
  }
  console.log(next);
  next();
});

export default router;
