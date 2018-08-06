DROP TABLE IF EXISTS test_person;

CREATE TABLE test_person (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	attitude TEXT,
	height INTEGER NOT NULL,
	iq INTEGER
);

INSERT INTO test_person (name, attitude, height, iq)
VALUES
('John Doe', 	'bad', 		180, 	90),
('Jane Doe', 	'bad', 		175, 	85),
('John Smith', 	NULL, 		165, 	85),
('Pete Frum', 	'worst', 	200, 	NULL),
('Some Guy', 	'best', 	190, 	120);
