create table countries_projects (
    project_id int,
	country_code VARCHAR(2),
    PRIMARY KEY(project_id, country_code),
    CONSTRAINT fk_country
        FOREIGN KEY (country_code)
            REFERENCES countries(code),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
            REFERENCES projects(id)
);
