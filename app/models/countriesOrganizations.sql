create table countries_organizations (
    organization_id INT,
	country_code VARCHAR(2),
    PRIMARY KEY(organization_id, country_code),
    CONSTRAINT fk_country
        FOREIGN KEY (country_code)
            REFERENCES countries(code),
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
            REFERENCES organizations(id)
);
