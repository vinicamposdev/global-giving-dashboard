create table organizations (
	id INT PRIMARY KEY,
	name VARCHAR(200) NOT NULL,
    city VARCHAR(50),
    state VARCHAR(50),
    postal varchar(50),
    address varchar(256),
    url varchar(150),
    logoUrl varchar(100),
    totalProjects smallint DEFAULT 0 CHECK (totalProjects >= 0),
	country VARCHAR(2),
    CONSTRAINT fk_country
        FOREIGN KEY (country)
            REFERENCES countries(code)
);