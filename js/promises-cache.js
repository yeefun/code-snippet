/* #promise, #cache, #memo, #async */

// From https://www.jonmellman.com/posts/promise-memoization

const userPromisesCache = new Map();

function getUserById(userId) {
  if (!userPromisesCache.has(userId)) {
    const userPromise = request.get(`https://users-service/v1/${userId}`);

    userPromisesCache.set(userId, userPromise);
  }

  return userPromisesCache.get(userId);
}
