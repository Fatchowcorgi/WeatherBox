//functions
function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = showContents;
    httpRequest.open('GET', "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-625779B9-4B03-4474-BBD8-1AC0D59A91F0&locationName=%E8%87%BA%E5%8C%97%E5%B8%82,%E6%96%B0%E5%8C%97%E5%B8%82,%E6%A1%83%E5%9C%92%E5%B8%82,%E8%87%BA%E4%B8%AD%E5%B8%82,%E8%87%BA%E5%8D%97%E5%B8%82&elementName=Wx,PoP,MinT,MaxT");
    httpRequest.send();
}

function showContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let response = JSON.parse(httpRequest.responseText);
            for (let i = 0; i < response['records']['location'].length; i++) {
                if (document.querySelector('select').value == response['records']['location'][i].locationName) {
                    const minTemp = response['records']['location'][i]['weatherElement'][2]['time'][0].parameter.parameterName;
                    const maxTemp = response['records']['location'][i]['weatherElement'][3]['time'][0].parameter.parameterName;
                    const wX = response.records.location[i].weatherElement[0].time[0].parameter.parameterName;
                    const rain = response.records.location[i].weatherElement[1].time[0].parameter.parameterName;
                    document.querySelector('.temp').innerHTML = `<p class="temp">${minTemp}~${maxTemp}C</p>`;
                    document.querySelector('.weather').innerHTML = `<p class="weather">${wX}</p>`;
                    document.querySelector('.rain').innerHTML = `<p class="rain">降雨機率${rain}%</p>`;
                }
            }

        } else {
            alert('There was a problem with the request.');
        }
    }
}

let httpRequest;
makeRequest();
document.querySelector(".ajaxButton").addEventListener('change', showContents);