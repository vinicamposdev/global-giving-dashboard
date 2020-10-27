const axios = require("axios");
const { Pool } = require("pg");
const { token } = require("../config");

let nextOrgId = 5184;

const charge = async () => {
  try {
    const response = await axios({
      url: `https://api.globalgiving.org/api/public/orgservice/all/organizations?api_key=${token}&nextOrgId=${nextOrgId}`,
      header: { Accept: "application/json" },
      method: "get",
    });

    const organizations = response.data.organizations.organization;
    nextOrgId = response.data.organizations.nextOrgId;

    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "docker",
      port: 5433,
    });

    let valuesOrganizations = "",
      valuesThemes = "",
      valuesCountries = "";
    organizations.forEach(
      ({
        id,
        name,
        city,
        state,
        postal,
        addressLine1,
        addressLine2,
        url,
        logoUrl,
        totalProjects,
        themes,
        countries,
      }) => {
        const organization_id = id;
        if (themes && themes.theme)
          themes.theme.forEach(({ id }) => {
            valuesThemes += `('${organization_id}', '${id}'),`;
          });
        if (countries && countries.country)
          countries.country.forEach(({ iso3166CountryCode }) => {
            valuesCountries += `('${id}', '${iso3166CountryCode}'),`;
          });

        const logoUrlNormalized = logoUrl ? logoUrl : "";

        const address = `${addressLine1} ${addressLine2}`.replace(/\'/g, " ");
        const nameNormalized = `${name}`.replace(/\'/g, " ");
        const cityNormalized = `${city}`.replace(/\'/g, " ");
        const stateNormalized = `${state}`.replace(/\'/g, " ");
        const postalNormalized = `${postal}`.replace(/\'/g, " ");

        valuesOrganizations += `('${id}', '${nameNormalized}', '${cityNormalized}', '${stateNormalized}', '${postalNormalized}', '${address}', '${url}', '${logoUrlNormalized}', '${totalProjects}'),`;
      }
    );
    const lastIndexValuesOrgs = valuesOrganizations.length - 1;
    const lastIndexValuesThemes = valuesThemes.length - 1;
    const lastIndexValuesCountries = valuesCountries.length - 1;
    valuesOrganizations = valuesOrganizations.substring(0, lastIndexValuesOrgs);
    valuesThemes = valuesThemes.substring(0, lastIndexValuesThemes);
    valuesCountries = valuesCountries.substring(0, lastIndexValuesCountries);

    const query = `
      INSERT INTO organizations (
				id,
        name,
        city,
        state,
        postal,
        address,
        url,
        logoUrl,
        totalProjects)
			VALUES ${valuesOrganizations}
			ON CONFLICT DO NOTHING;
			
			INSERT INTO countries_organizations (organization_id, country_code)
			VALUES ${valuesCountries}
			ON CONFLICT DO NOTHING;

			INSERT INTO themes_organizations (organization_id, theme_id)
			VALUES ${valuesThemes}
			ON CONFLICT DO NOTHING;
    `;

    console.log({ query });

    pool.query(query, (err, res) => {
      console.log(err, res);
      pool.end();
    });

    if (nextOrgId) {
      charge();
    }

    return "success";
  } catch (e) {
    console.log(e);
    return null;
  }
};

charge();

exports.default = charge;
