const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("parking.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      lat REAL,
      lng REAL,
      available INTEGER
    )
  `);

  db.run("DELETE FROM slots");

  const stmt = db.prepare(
    "INSERT INTO slots (name, lat, lng, available) VALUES (?, ?, ?, ?)"
  );

  const slots = [
    ["Bengaluru", 12.9716, 77.5946, 1],
    ["Mysuru", 12.2958, 76.6394, 1],
    ["Shivamogga", 13.9299, 75.5681, 1],
    ["Hubballi", 15.3647, 75.1240, 0],
    ["Mangaluru", 12.9141, 74.8560, 1],
    ["Belagavi", 15.8497, 74.4977, 0],
    ["Kalaburagi", 17.3297, 76.8343, 1]
  ];

  slots.forEach(s => stmt.run(s));
  stmt.finalize();

  console.log("✅ Database initialized with parking slots");
});

db.close();
