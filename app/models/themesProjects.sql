create table themes_projects (
	project_id INT NOT NULL,
	theme_id VARCHAR(20) NOT NULL,
    PRIMARY KEY(project_id, theme_id),
    CONSTRAINT fk_theme
        FOREIGN KEY (theme_id)
            REFERENCES themes(id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
            REFERENCES projects(id)
);
