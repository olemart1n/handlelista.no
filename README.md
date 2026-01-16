# Handlelista-qwik

[Handlelista](https://handlelista.no)


```brew install tursodatabase/tap/turso```
create a database file eg: ```dev.db``` and run ```turso dev --db-file dev.db``` and then interact with it in a new terminal tab ```turso db shell http://127.0.0.1:8080```

Create a .env file

```
PRIVATE_TURSO_DB_URL=http://127.0.0.1:8080
PRIVATE_TURSO_DB_AUTH_TOKEN=
```

```sql
CREATE TABLE items (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	name TEXT NOT NULL,
	list_id INTEGER,
	extra_info TEXT,
	purchased BOOLEAN DEFAULT 0,
	FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);                                                               

CREATE TABLE lists (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

`npm install`
`npm run dev`

