//設定讀取網路資源(Axios)
let schoolLocationRequest = axios.get('https://raw.githubusercontent.com/KamiiLiu/FileStorage/main/school-location.json');
let schoolNumberRequest = axios.get('https://raw.githubusercontent.com/KamiiLiu/FileStorage/main/school-number.json');
let his = ["1895-1937", "1937-1945", "1945-1967", "196-1994", "1994-2022"]
let maps = document.querySelectorAll("[id*=map]")
let dataSets
let mapArray = [];
let markers = {};
// maps.forEach((e, i) => {
//     var map = L.map(e.id).setView([25.038606, 121.513015], 10);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//         attribution: his[i]
//     }).addTo(map);
// })
let schoolLocationD, schoolNumberD
window.onload = function () {
    Promise.all([schoolLocationRequest, schoolNumberRequest])
        .then(res => {
            let [schoolLocation, schoolNumber] = res;
            schoolLocationD = schoolLocation.data;
            schoolNumberD = schoolNumber.data;

            schoolNumberD.forEach(e => {
                let dict = e.School.substring(0, 3);
                let money = e.School.substring(4, 6);
                e["Dict"] = dict;
                e["Money"] = money;
                e.School = e.School.replace(`${dict}`, "").trim();
                let a = schoolLocationD.find((m) => m.School == e.School)
                if (a != undefined) {
                    e["Lat"] = a.Lat
                    e["Long"] = a.Long
                    e["His"] = a.His
                }
            })
            dataSet = schoolNumberD.filter(x => x.Lat != null && x.Number != 0)
            //做標籤
            let greyIcon = new L.Icon({
                iconUrl: 'img/marker-icon-grey.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            let blueIcon = new L.Icon({
                iconUrl: 'img/marker-icon-blue.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });
            let redIcon = new L.Icon({
                iconUrl: 'img/marker-icon-red.png',
                shadowUrl: 'img/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            maps.forEach((e, i) => {
                var map = L.map(e.id).setView([25.038606, 121.513015], 12);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: his[i]
                }).addTo(map);
                mapArray.push(map);
                if (i == 0) {
                    dataSet.forEach((school) => {
                        if (school.His[0]) {
                            var marker = L.marker([school.Lat, school.Long], { icon: blueIcon }).addTo(map)
                                .bindPopup(`${school.School}<br>學生人數：${school.Number}<br>學校性質：${school.Money}`)
                                .closePopup();
                            markers[school.School] = marker;
                        }
                    })
                    let marker = L.marker([25.04, 121.511944], { icon: redIcon }).addTo(map)
                        .bindPopup(`總督府`)
                        .openPopup();

                } else {
                    dataSet.forEach((school) => {
                        if (school.His[i] && !school.His[i - 1]) {
                            var marker = L.marker([school.Lat, school.Long], { icon: blueIcon }).addTo(map)
                                .bindPopup(`${school.School}<br>學生人數：${school.Number}<br>學校性質：${school.Money}`)
                                .closePopup()
                        } else if (school.His[i] && school.His[i - 1]) {
                            var marker = L.marker([school.Lat, school.Long], { icon: greyIcon }).addTo(map)
                                .bindPopup(`${school.School}<br>學生人數：${school.Number}<br>學校性質：${school.Money}`)
                            markers[school.School] = marker;
                        }
                    })
                    let marker = L.marker([25.04, 121.511944], { icon: redIcon }).addTo(map)
                        .bindPopup(`總統府（總督府）`)
                        .openPopup();

                }
            })

            let mapDes = document.querySelectorAll(".map-des");
            mapDes.forEach((e, i) => {

                let ul = document.createElement("ul");
                ul.setAttribute("class", "desc-ul");
                dataSet.forEach((school) => {
                    if (school.His[i] && !school.His[i - 1]) {
                        let li = document.createElement("li");
                        li.addEventListener("click",()=>{
                            let map = mapArray[i];
                            map.setView(new L.LatLng(school.Lat, school.Long), 15);
                        });
                        li.setAttribute("class", "desc-li");
                        ul.appendChild(li);
                        li.innerHTML =`<i class="fa-solid fa-location-crosshairs"></i>${school.School}<i class="fa-solid fa-hand-point-left"></i>` ;
                    }
                    e.appendChild(ul);
                })
            })
        });
}
