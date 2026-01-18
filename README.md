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

CREATE TABLE dinner_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ingredients TEXT NOT NULL, -- JSON-string, f.eks. '[{"name": "laks", "unit": "kg", "amount": 0.4}, {"name": "poteter", "unit": "kg", "amount": 0.8}]'
  portions INTEGER DEFAULT 4, -- Standardverdi: 4 porsjoner
  preparation TEXT NOT NULL
);


CREATE TABLE dinner_suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  ingredients_json TEXT NOT NULL,
  base_portions INTEGER NOT NULL DEFAULT 4,
  preparation TEXT NOT NULL
);
```

`npm install`
`npm run dev`

Gjøremål
1. Finn ut hvorfor noe av styling ikke virker å production.
2. Lag en liste med middagsretter å lagre i databasen. Start med 20 forskelige retter.
3. Integrer middagsforslag i nettsiden.
4. Webworker