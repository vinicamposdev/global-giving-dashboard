const axios = require("axios");
const { Pool } = require("pg");
const { token } = require("../config");
const MongoClient = require("mongodb").MongoClient;
const { mongoUri } = require("../config");

const uri = mongoUri;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

let nextProjectId = 1;

const charge = async () => {
  try {
    const response = await axios({
      url: `https://api.globalgiving.org/api/public/projectservice/all/projects?api_key=${token}&nextProjectId=${nextProjectId}`,
      header: { Accept: "application/json" },
      method: "get",
    });

    const projects = response.data.projects.project;
    nextProjectId = response.data.projects.nextProjectId;

    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "docker",
      port: 5433,
    });

    let valuesprojects = "",
      valuesThemes = "",
      valuesCountries = "",
      valuesDonationOptions = "";
    const mongoCollectionDocument = [];
    projects.forEach(
      ({
        id,
        title,
        summary,
        region,
        activities,
        contactAddress,
        funding,
        goal,
        status,
        organization,
        iso3166CountryCode,
        themes,
        countries,
        donationOptions,
      }) => {
        const project_id = id;
        const organization_id =
          organization && organization.id ? organization.id : null;

        const country = iso3166CountryCode ? iso3166CountryCode : null;

        if (themes && themes.theme)
          themes.theme.forEach(({ id }) => {
            valuesThemes += `('${project_id}', '${id}'),`;
          });
        if (countries && countries.country)
          countries.country.forEach(({ iso3166CountryCode }) => {
            valuesCountries += `('${id}', '${iso3166CountryCode}'),`;
          });
        if (donationOptions && donationOptions.donationOption)
          donationOptions.donationOption.forEach(({ amount, description }) => {
            valuesDonationOptions += `('${project_id}', '${amount}', '${description}'),`;
          });

        const titleNormalized = `${title}`.replace(/\'/g, " ");
        const summaryNormalized = `${summary}`.replace(/\'/g, " ");
        const regionNormalized = `${region}`.replace(/\'/g, " ");
        const activitiesNormalized = `${activities}`.replace(/\'/g, " ");
        const ctcAddressNormalized = `${contactAddress}`.replace(/\'/g, " ");
        const fundingNormalized = `${funding}`.replace(/\'/g, " ");
        const goalNormalized = `${goal}`.replace(/\'/g, " ");
        const statusNormalized = `${status}`.replace(/\'/g, " ");

        mongoCollectionDocument.push({
          id,
          title: titleNormalized,
          summary: summaryNormalized,
          region: regionNormalized,
          activities: activitiesNormalized,
          contactAddress: ctcAddressNormalized,
          funding: fundingNormalized,
          goal: goalNormalized,
          status: statusNormalized,
          country,
          organization_id,
          themes: themes && themes.theme ? themes.theme : undefined,
          countries:
            countries && countries.country ? countries.country : undefined,
          donationOptions:
            donationOptions && donationOptions.donationOption
              ? donationOptions.donationOption
              : undefined,
        });

        valuesprojects += `('${id}', '${titleNormalized}', '${summaryNormalized}', '${regionNormalized}', '${activitiesNormalized}', '${ctcAddressNormalized}', '${fundingNormalized}', '${goalNormalized}', '${statusNormalized}', ${
          country ? "'" + country + "'" : "default"
        }, ${organization_id ? "'" + organization_id + "'" : "default"}),`;
      }
    );

    mongoClient.connect(async (err) => {
      const collection = mongoClient.db("global-giving").collection("projects");
      const insertDocument = await collection.insertMany(
        mongoCollectionDocument
      ); //.countDocuments()
      console.log(insertDocument, err);
      mongoClient.close();
    });

    const lastIndexValuesOrgs = valuesprojects.length - 1;
    const lastIndexValuesThemes = valuesThemes.length - 1;
    const lastIndexValuesCountries = valuesCountries.length - 1;
    const lastIndexValuesDonationOptions = valuesDonationOptions.length - 1;
    valuesprojects = valuesprojects.substring(0, lastIndexValuesOrgs);
    valuesThemes = valuesThemes.substring(0, lastIndexValuesThemes);
    valuesCountries = valuesCountries.substring(0, lastIndexValuesCountries);
    valuesDonationOptions = valuesDonationOptions.substring(
      0,
      lastIndexValuesDonationOptions
    );

    let query = `
      INSERT INTO projects (
		id,
        title,
        summary,
        region,
        activities,
        contactAddress,
        funding,
        goal,
        status,
        country,
        organization_id)
			VALUES ${valuesprojects}
			ON CONFLICT DO NOTHING;
			
			INSERT INTO countries_projects (project_id, country_code)
			VALUES ${valuesCountries}
			ON CONFLICT DO NOTHING;

			INSERT INTO themes_projects (project_id, theme_id)
			VALUES ${valuesThemes}
            ON CONFLICT DO NOTHING;
    `;
    query += valuesDonationOptions
      ? `
    INSERT INTO projects_donation_options (project_id, amount, description)
    VALUES ${valuesDonationOptions}
    ON CONFLICT DO NOTHING`
      : "";

    console.log({ query });

    pool.query(query, (err, res) => {
      console.log(err, res);
      pool.end();
    });

    if (nextProjectId) {
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
