//const chambery = [45.64325, 5.8720];
/*var postalMap = L.map("mapPollution").setView([45.64325, 5.8720], 10);
console.log("Yohann il dort");
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(postalMap);
/*L.circle([lon, lat], {
    color: ,
    fillColor: ,
    fillOpacity: 0.5,
    radius:
})
    .addTo(postalMap)
    .bindPopup("Emplacement: " + item.postal + ", " + item.count + " personnes, " + dist + " km");*/
var postalMap = L.map("mapPollution").setView([45.583843, 5.907417], 5);
var rapportMap = L.map("mapRapport").setView([45.583843, 5.907417], 5);

/*L.circle([45.583843, 5.907417], {
    color: "#ff0000",
    fillColor: "#ff0000",
    fillOpacity: 0.5,
    radius: 5
})
    .addTo(postalMap)
    .bindPopup("Fromage");*/

var markMap = function(url, map, str, pointColor) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var max = data[0].value;

            for (var i = 1; i < data.length; i++) {
                if (data[i].value > max) {
                    max = data[i].value;
                }
            }

            for (var i = 0; i < data.length; i++) {
                console.log(data[i]);
                L.circle([data[i]._id[1], data[i]._id[0]], {
                    color: pointColor,
                    fillColor: pointColor,
                    fillOpacity: 0.5,
                    radius: (data[i].value/max)*75
                })
                    .addTo(map)
                    .bindPopup(str + data[i].value);
            }

        }
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

markMap("http://nuitinfo2020.ythepaut.com:8004/api/pollution", postalMap, "Pollution : ", "#78e08f");
/*postalMap.eachLayer(function (layer) {
    layer.bindPopup("Emplacement: ");
});*/
markMap("http://nuitinfo2020.ythepaut.com:8004/api/rapport", rapportMap, "Nombre de rapports : ", "#ff0000");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(postalMap);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
}).addTo(rapportMap);
