create table projects_donation_options (
	project_id INT,
    amount NUMERIC(14,2) DEFAULT 0.00,
    description TEXT,
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
            REFERENCES projects(id),
    PRIMARY KEY(project_id, amount)
);