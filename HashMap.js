class HashMap {
  constructor(initialCapacity = 16) {
    this.bucketSize = initialCapacity;
    this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
    this.size = 0;
  }
  
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (hashCode * primeNumber + primeNumber + key.charCodeAt(i)) %
        this.bucketSize;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.bucketSize.length) {
      throw new Error("Trying to access index out of bound!!");
    }

    let bucket = this.bucket[index];

    if (!bucket) {
      bucket = [];
      this.buckets[index] = bucket;
    }

    for (let i = 0; i < bucket.length; i++) {
      const entry = bucket[i];
      if (entry[0] === key) {
        entry[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;
  }
}
