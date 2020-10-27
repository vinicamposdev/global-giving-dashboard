create table themes (
	id SERIAL PRIMARY KEY,
	original_id VARCHAR(20) unique,
	name VARCHAR(40)
);
