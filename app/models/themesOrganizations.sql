create table themes_organizations (
	organization_id INT NOT NULL,
	theme_id VARCHAR(20) NOT NULL,
    PRIMARY KEY(organization_id, theme_id),
    CONSTRAINT fk_theme
        FOREIGN KEY (theme_id)
            REFERENCES themes(id),
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
            REFERENCES organizations(id)
);
