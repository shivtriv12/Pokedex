class CacheEntry {
    constructor(data) {
        this.createdAt = new Date();
        this.val = data;
    }
}

class Cache {
    constructor(expirationInterval) {
        this.entries = new Map();
        this.expirationInterval = expirationInterval;
        this.reapLoop();
    }

    add(key, val) {
        const entry = new CacheEntry(val);
        this.entries.set(key, entry);
    }

    get(key) {
        const entry = this.entries.get(key);
        if (entry) {
            const now = new Date();
            const timeDiff = now - entry.createdAt;

            if (timeDiff < this.expirationInterval) {
                return { data: entry.val, found: true };
            } else {
                this.entries.delete(key);
            }
        }
        return { data: null, found: false };
    }

    reapLoop() {
        setInterval(() => {
            const now = new Date();

            this.entries.forEach((entry, key) => {
                const timeDiff = now - entry.createdAt;

                if (timeDiff >= this.expirationInterval) {
                    this.entries.delete(key);
                }
            });

        }, this.expirationInterval);
    }
}

function newCache(expirationInterval) {
    return new Cache(expirationInterval);
}

export { newCache };