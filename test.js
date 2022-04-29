const https = require("https");

async function getCountryName(code) {
  let page = 2;
  const url = "https://jsonmock.hackerrank.com/api/countries?page=";
  let countries = [];
  let found = false;
  let results;

  const getCountry = async (url) => {
    const request = https.request(url, (response) => {
      let data = "";
      let result = [];

      response.on("data", (chunk) => {
        data = data + chunk.toString();
      });

      response.on("end", async () => {
        const body = await JSON.parse(data);
        countries = body.data;
        result = countries.filter((country) => country.alpha2Code === code);
        console.log(result);
      });
    });

    request.on("error", (error) => {
      console.log("An error", error);
    });

    request.end();
  };

  results = await getCountry(url + page);
  console.log(results);
}

getCountryName("AR");

// write your code here
// API endpoint: https://jsonmock.hackerrank.com/api/countries?page=<PAGE_NUMBER>
