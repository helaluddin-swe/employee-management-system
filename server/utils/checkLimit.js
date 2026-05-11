const traker = new Map();
export const checkLimit = (key, limit, windowMs) => {
  const now = Date.now();
  if (!traker.has(key)) {
    traker.set(key, { count: 1, startTime: now });
    return { allowed: true };
  }

  const data = traker.get(key);
  const timePassed = now - data.startTime;
  if (windowMs > timePassed) {
    if (data.count >= limit) {
      return { allowed: false };
    }
    data.count++;
    return { allowed: true };
  }

  traker.set(key, { count: 1, startTime: now });
  return { allowed: true };
};
