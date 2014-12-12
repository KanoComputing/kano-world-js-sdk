var Service = require('api-service'),
    config = require('../config'),
    middleware = require('./service-middleware');

var apiService = new Service(config.API_URL)
    .use(middleware)
    .on('error', console.warn);

apiService

/*
 * Accounts
 */

.add('accounts.activate', {
    route  : '/accounts/activate/:code',
    method : 'post'
})

.add('accounts.invalidate', {
    route  : '/accounts/invalidate/:code',
    method : 'post'
})

.add('accounts.password.reset', {
    route  : '/accounts/reset-password',
    method : 'post'
})

.add('accounts.password.change', {
    route      : '/accounts/change-password',
    method     : 'put'
})

.add('accounts.activation.resend', {
    route      : '/accounts/resend-activation-code',
    method     : 'post'
})

/*
 * Apps
 */

.add('apps.list', {
    method : 'get',
    route  : '/apps'
})

.add('apps.get.byId', {
    method : 'get',
    route  : '/apps/:id'
})

.add('apps.get.bySlug', {
    method : 'get',
    route  : '/apps/slug/:slug'
})

.add('apps.get.categories', {
    method : 'get',
    route  : '/apps/categories'
})

.add('apps.like', {
    method : 'post',
    route  : '/apps/:id/like',
})

.add('apps.unlike', {
    method : 'delete',
    route  : '/apps/:id/like',
})

/*
 * Attachments
 */

.add('attachments.post', {
    method : 'post',
    route  : '/attachments'
})

.add('attachments.list', {
    route  : '/attachments/:type/:itemId'
})

.add('attachments.delete', {
    method: 'delete',
    route  : '/attachments/:id'
})

/*
 * Auth
 */

.add('auth.post', {
    method : 'post',
    route  : '/auth'
})

.add('auth.session.get', {
    method : 'get',
    route  : '/auth/session'
})

.add('auth.session.get.asUser', {
    method : 'get',
    route  : '/auth/as-user/:id'
})

/*
 * Comments
 */

.add('comments.post', {
    method : 'post',
    route  : '/comments'
})

.add('comments.list', {
    method : 'get',
    route  : '/comments/:type/:item_id'
})

.add('comments.listAll', {
    method : 'get',
    route  : '/comments'
})

.add('comments.flag', {
    method : 'post',
    route  : '/comments/flag/:id'
})

.add('comments.delete.byId', {
    method : 'delete',
    route  : '/comments/:id'
})

/*
 * Forum
 */

.add('forum.categories.list', {
    method : 'get',
    route  : '/forum/categories'
})

.add('forum.categories.get.byId', {
    method : 'get',
    route  : '/forum/categories/:id'
})

.add('forum.categories.get.bySlug', {
    method : 'get',
    route  : '/forum/categories/slug/:slug'
})

.add('forum.topics.list', {
    method : 'get',
    route  : '/forum/topics'
})

.add('forum.topics.post', {
    method : 'post',
    route  : '/forum/topics'
})

.add('forum.topics.delete', {
    method : 'delete',
    route  : '/forum/topics/:id'
})

.add('forum.topics.get.byId', {
    method : 'get',
    route  : '/forum/topics/:id'
})

.add('forum.topics.get.bySlug', {
    method : 'get',
    route  : '/forum/topics/slug/:slug'
})

.add('forum.modt.get', {
    method : 'get',
    route  : '/forum/modt'
})

.add('forum.search', {
    method : 'get',
    route  : '/forum/search'
})

/*
 * Leaderboards
 */

.add('leaderboard.get', {
    method : 'get',
    route  : '/leaderboard'
})

/*
 * News
 */

.add('news.list', {
    method : 'get',
    route  : '/news'
})

.add('news.get.byId', {
    method : 'get',
    route  : '/news/:id'
})

.add('news.get.bySlug', {
    method : 'get',
    route  : '/news/slug/:slug'
})

/*
 * Notifications
 */

.add('notifications.get', {
    method : 'get',
    route  : '/notifications'
})

.add('notifications.read', {
    method : 'post',
    route  : '/notifications/read/:id'
})

.add('notifications.readAll', {
    method : 'post',
    route  : '/notifications/read'
})

/*
 * Projects
 */

.add('projects.post', {
    method : 'post',
    route  : '/projects'
})

.add('projects.list', {
    method : 'get',
    route  : '/projects'
})

.add('projects.get.byId', {
    method : 'get',
    route  : '/projects/:id'
})

.add('projects.get.bySlug', {
    method : 'get',
    route  : '/projects/slug/:slug'
})

.add('projects.get.categories', {
    method : 'get',
    route  : '/projects/categories'
})

.add('projects.update', {
    method : 'put',
    route  : '/projects/:id'
})

.add('projects.delete', {
    method : 'delete',
    route  : '/projects/:id'
})

.add('projects.like', {
    method : 'post',
    route  : '/projects/:id/like'
})

.add('projects.unlike', {
    method : 'delete',
    route  : '/projects/:id/like'
})

/*
 * Share
 */

.add('share.list', {
    method : 'get',
    route  : '/share'
})

.add('share.get.byId', {
    method : 'get',
    route  : '/share/:id'
})

.add('share.get.bySlug', {
    method : 'get',
    route  : '/share/slug/:slug'
})

.add('share.delete.byId', {
    method : 'delete',
    route  : '/share/:id'
})

.add('share.like', {
    method : 'post',
    route  : '/share/:id/like'
})

.add('share.unlike', {
    method : 'delete',
    route  : '/share/:id/like'
})

.add('share.flag', {
    method : 'post',
    route  : '/share/flag/:id'
})

.add('share.count', {
    method : 'get',
    route  : '/share/count'
})

.add('share.post', {
    method : 'post',
    route  : '/share/:app'
})

/*
 * Stats
 */

.add('stats.get.activity', {
    method : 'get',
    route  : 'stats/activity'
})

/*
 * Sync
 */

.add('sync.settings.get', {
    method : 'get',
    route  : 'sync/settings'
})

.add('sync.settings.update', {
    method : 'put',
    route  : 'sync/settings'
})

/*
 * Users
 */

.add('users.post', {
    method : 'post',
    route  : '/users'
})

.add('users.get.byId', {
    method : 'get',
    route  : '/users/:id'
})

.add('users.get.byUsername', {
    method : 'get',
    route  : '/users/username/:username'
})

.add('users.get.following', {
    method : 'get',
    route  : '/users/:id/following'
})

.add('users.get.followers', {
    method : 'get',
    route  : '/users/:id/followers'
})

.add('users.profile.update', {
    method : 'put',
    route  : '/users/profile'
})

.add('users.list', {
    method : 'get',
    route  : '/users'
})

.add('users.follow', {
    method : 'post',
    route  : '/users/follow/:id'
})

.add('users.unfollow', {
    method : 'delete',
    route  : '/users/follow/:id'
})

.add('users.delete', {
    method : 'delete',
    route  : '/users'
});

module.exports = apiService;