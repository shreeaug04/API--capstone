const BASE_URL = `https://api.covid19api.com`;

function getData() {
    const countrySlug = $("#search-by-country").val();
    fetch(`${BASE_URL}/country/${countrySlug}`)
        .then(response => response.json())
        .then(responseJson => {
            displayResults(responseJson)
        }).catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(data) {
    $("#results").empty()
    let rows = '';
    data.forEach(record => {
        rows += `<tr>
            <td>${new Date(record.Date).toLocaleDateString()}</td>
            <td>${record.Active}</td>
            <td>${record.Confirmed}</td>
            <td>${record.Recovered}</td>
            <td>${record.Deaths}</td>
        </tr>`
    });

    let html = `<table border = "1" cellpadding = "5" cellspacing = "5">
        <tr>
        <th>Date</th>
        <th>Active</th>
        <th>Confirmed</th>
        <th>Recovered</th>
        <th>Deaths</th>
        </tr>
        ${rows}
    </table>`
    $('#results').html(html);
}

function watchForm() {
    $('.search-form').submit(event => {
        event.preventDefault();
        getData()
    });
}

function showCountriesInDropdown(countries) {
    let options = ``
    countries.forEach((country) => {
        options += `<option value="${country.Slug}">${country.Country}</option>`
    })
    $('#search-by-country').html(options);
}

function getGlobalSummary() {
    fetch(`${BASE_URL}/summary`)
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)
            showCountriesInDropdown(responseJson.Countries)
            $("#today-confirmed").text(responseJson.Global.NewConfirmed)
            $("#today-recovered").text(responseJson.Global.NewRecovered)
            $("#today-death").text(responseJson.Global.NewDeaths)
            $("#total-confirmed").text(responseJson.Global.TotalConfirmed)
            $("#total-death").text(responseJson.Global.TotalConfirmed)
            $("#total-recovered").text(responseJson.Global.TotalRecovered)
        }).catch(error => alert('Something went wrong. Try again later.'));
}

$(() => {
    watchForm();
    getGlobalSummary();
});