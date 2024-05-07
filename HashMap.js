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

  length() {
    return this.size;
  }
  

  clear() {
    this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
    this.size = 0;
  }
  
  keys() {
    const allKeys = [];
    
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allKeys.push(key);
        }
      }
    }
  
    return allKeys;
  }

  values() {
    const allValues = [];
  
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          allValues.push(value);
        }
      }
    }
  
    return allValues;
  }
  
  entries() {
    const allEntries = [];
  
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const entry of bucket) {
          allEntries.push(entry);  // entry is already an array [key, value]
        }
      }
    }
  
    return allEntries;
  }
  

}

// HashMap Functional Tests

// Setup: Create a new HashMap instance
let map = new HashMap();

// Setting Key-Value Pairs
// ========================
// Testing the `set` method
map.set("banana", 1);
map.set("apple", 5);
map.set("orange", 2);

// Keys Retrieval
// ==============
// Testing the `keys` method
console.log("All keys:", map.keys()); // Output: ['banana', 'apple', 'orange']

// Values Retrieval
// =================
// Testing the `values` method
console.log("All values:", map.values()); // Output: [1, 5, 2]

// Entries Retrieval
// ==================
// Testing the `entries` method
console.log("All entries:", map.entries()); // Output: [['banana', 1], ['apple', 5], ['orange', 2]]

// Bucket Structure Inspection
// ===========================
// Display the internal bucket structure to verify data distribution
console.log("After setting keys:");
map.buckets.forEach((bucket, index) => {
  if (bucket.length > 0) {
    console.log(`Bucket ${index}:`, bucket);
  }
});

// Length and Removal
// ==================
// Testing `length` and `remove` methods
console.log("Current number of key-value pairs:", map.length()); // Output: 3
map.remove("banana");
console.log("After removing 'banana', length is:", map.length()); // Output: 2
console.log("Remaining entries after 'banana' removal:", map.entries()); // Output: [['apple', 5], ['orange', 2]]

// Clear Method
// ============
// Testing the `clear` method
map.clear();
console.log("After clearing, length is:", map.length()); // Output: 0
console.log("Is map empty after clearing?", map.buckets.every(bucket => bucket.length === 0)); // Output: true

// Collision Handling
// ==================
// Testing collision handling by adding two keys that potentially hash to the same bucket
map.set("key1", "Test1");
map.set("key2", "Test2"); // Assume "key1" and "key2" collide
console.log("Check collision handling:", map.get("key1"), map.get("key2")); // Should output Test1 and Test2

// Removal after Collision
// =======================
// Testing removal of a colliding key and ensuring the other remains
map.remove("key1");
console.log("After removing 'key1':", map.get("key1"), "; 'key2' still exists:", map.get("key2")); // Should output null and Test2

// Re-test Clear Method
// =====================
// Ensure `clear` works after repopulating
map.clear();
console.log("After clearing again, verify buckets:", map.buckets.every(bucket => bucket.length === 0)); // Output: true
