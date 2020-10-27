create table projects (
	id INT,
	title VARCHAR(200) NOT NULL,
    summary TEXT,
    region VARCHAR(200),
    activities TEXT,
    contactAddress VARCHAR(200),
    funding NUMERIC(14,2) DEFAULT 0.00, 
    goal NUMERIC(14,2) DEFAULT 0.00,
    status boolean NOT NULL,
    organization_id INT,
	country VARCHAR(2),
    CONSTRAINT fk_country
        FOREIGN KEY (country)
            REFERENCES countries(name),
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
            REFERENCES organizations(id),
    PRIMARY KEY(organization_id, country)
);