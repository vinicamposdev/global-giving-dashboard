create table organizations (
	id INT PRIMARY KEY,
	name VARCHAR(80) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    postal varchar(50),
    address varchar(200),
    url varchar(150),
    logoUrl varchar(100),
    totalProjects smallint DEFAULT 0 CHECK (totalProjects >= 0)
);