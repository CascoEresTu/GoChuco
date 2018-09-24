const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// set the correct server time on each post when it's created
exports.setDate = functions.database.ref('/pagos/{postId}/')
.onCreate((snap, context) => {
  const postId = context.params.postId;
  const time = Date.now();
  console.log('Setting server time on post', postId, time);
  return snap.ref.child('serverTime').set(time);
});
