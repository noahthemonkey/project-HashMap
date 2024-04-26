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
  
    if (index < 0 || index >= this.bucketSize) {
      throw new Error("Trying to access index out of bound!!");
    }
  
    let bucket = this.buckets[index];
  
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
  

  get(key) {
    const index = this.hash(key);
  
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  
    const bucket = this.buckets[index];
    
    if (bucket) {
      for (let [currentKey, value] of bucket) {
        if (currentKey === key) {
          return value;
        }
      }
    }
  
    return null;
  }

  has(key) {
    const index = this.hash(key);
  
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  
    const bucket = this.buckets[index];
    
    if (bucket) {
      for (let [currentKey, value] of bucket) {
        if (currentKey === key) {
          return true
        }
      }
    }
  
    return false;
  }

  remove(key) {
    const index = this.hash(key);
  
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  
    const bucket = this.buckets[index];
  
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);  
          this.size--;
          return true;  
        }
      }
    }
  
    return false;  
  }
  

}

let map = new HashMap();

map.set("banana", 1);
map.set("apple", 5);
map.set("orange", 10);

console.log("After setting keys:");
map.buckets.forEach((bucket, index) => {
  if (bucket.length > 0) {
    console.log(`Bucket ${index}:`, bucket);
  }
});

// Testing 'get' method
console.log("Get 'banana':", map.get("banana"));  // Should output 1
console.log("Get 'apple':", map.get("apple"));    // Should output 5
console.log("Get 'orange':", map.get("orange"));  // Should output 10
console.log("Get 'melon':", map.get("melon"));    // Should output null, not added

// Testing 'has' method
console.log("Has 'banana':", map.has("banana"));  // Should output true
console.log("Has 'melon':", map.has("melon"));    // Should output false, not added

// Testing 'remove' method
console.log("Remove 'orange':", map.remove("orange"));  // Should output true
console.log("Has 'orange' after removal:", map.has("orange"));  // Should output false
console.log("Remove 'melon':", map.remove("melon"));  // Should output false, not added

// Check size of the HashMap
console.log("Current size of the HashMap:", map.size);  // Should match the number of key-value pairs

// Add more keys to test resizing and collision handling
map.set("grape", 15);
map.set("peach", 20);

// Print all buckets after more additions to see collision handling
console.log("After more additions:");
map.buckets.forEach((bucket, index) => {
  if (bucket.length > 0) {
    console.log(`Bucket ${index}:`, bucket);
  }
});

// Remove a key and check the internal structure
map.remove("apple");
console.log("After removing 'apple':");
map.buckets.forEach((bucket, index) => {
  if (bucket.length > 0) {
    console.log(`Bucket ${index}:`, bucket);
  }
});

// Finally, check the consistency of keys and values
console.log("Keys in HashMap:", map.keys());  // Should list remaining keys
console.log("Values in HashMap:", map.values());  // Should list values corresponding to remaining keys
