
/* global angular */
angular
    .module('studis')
    .controller('VpisniListCtrl', VpisniListCtrl)
    .directive('samoCrke', function() {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            var transformedInput = text.replace(/[^a-zA-ZčČšŠžŽđĐćĆ]/g, '');
            if(transformedInput !== text) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
            } return transformedInput; 
          } ngModelCtrl.$parsers.push(fromUser);
        }
      }; 
    })
    .directive('samoStevilke', function() {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            var transformedInput = text.replace(/[^0-9]/g, '');
            if(transformedInput !== text) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
            } return transformedInput; 
          } ngModelCtrl.$parsers.push(fromUser);
        }
      }; 
    });


function VpisniListCtrl($scope, $window, $routeParams, studen){
    $scope.vl_rojstvo = new Date(1996, 0, 1); //year month(0=januar) day
    $scope.spoli = [ {code: 1, ime: 'ženski'}, {code: 2, ime: 'moški'}];
    $scope.drzave = ['Afganistan','Alandski otoki','Albanija','Alžirija','Ameriška Samoa','Andora','Angola','Angvila','Antarktika','Antigva in Barbuda','Argenitna','Armenija','Aruba','Avstralija','Avstrija','Azerbajdžan','Bahami','Bahrajn','Bangladeš','Barbados','Belorusija','Belgija','Belize','Benin','Bermudi','Butan','Bolivija','Otočje Bonaire, Sv. Eustatij in Saba','Bosna in Hercegovina','Bocvana','Bouvetov otok','Brazilija','Britansko ozemlje v Indijskem oceanu','Brunej','Bolgarija','Burkina Faso','Burundi ','Kambodža','Kamerun','Kanada','Kapverdski otoki (Zelenortski otoki)','Kajmanski otoki','Srednjeafriška republika','Čad','Čile','Kitajska','Božični otok','Kokosovi in Keelingovi otoki','Kolumbija','Komori','Kongo','Demokratična republika Kongo','Cookovi otoki','Kostarika','Slonokoščena obala','Hrvaška','Kuba','Kurasao','Ciper','Češka','Danska','Džibuti','Dominika','Dominikanska republika','Ekvador','Egipt','Salvador','Ekvatorialna Gvineja','Eritreja','Estonija','Etiopija','Falkalndski otoki','Ferski otoki','Fidži','Finska','Francija','Francoska Gvajana','Francoska Polinezija','Francoska južna ozemlja','Gabon','Gambija','Gruzija','Nemčija','Gana','Gibraltar','Grčija','Grenlandija','Grenada','Guadeloupe','Guam','Gvatemala','Otok Guernsey','Gvineja','Gvineja-Bissau','Gvajana','Haiti','Otok Heard in otočje McDonald','Vatikan','Honduras','Hong Kong','Madžarska','Islandija','Indija','Indonezija','Iran','Irak','Irska','Otok Man','Izrael','Italija','Jamajka','Japonska','Otok Jersey','Jordanija','Kazahstan','Kenija','Kiribati','Severna Koreja','Južna Koreja','Kuvajt','Kirgizistan (Kirgizija)','Laos','Latvija','Libanon','Lesoto','Liberija','Libija','Lihtenštajn','Litva','Luksemburg','Makao','Makedonija','Madagaskar','Malavi','Malezija','Maldivi','Mali','Malta','Maršalovi otoki','Martinik','Mavretanija','Mauricius (Moris)','Francoska skupnost Mejot','Mehika','Mikronezija','Moldavija','Monako','Mongolija','Črna Gora','Montserat','Maroko','Mozambik','Mjanmar','Namibija','Nauru','Nepal','Nizozemska','Nova Kaledonija','Nova Zelandija','Nikaragva','Niger ','Nigerija','Niu','Otok Norflok','Severni Marianski otoki','Norveška','Oman','Pakistan','Palau ','Palestina','Panama','Papua Nova Gvineja','Paragvaj','Peru','Filipini','Pitcairnovi otoki','Poljska','Portugalska','Portoriko','Katar','Francoska skupnost Reunion','Romunija','Ruska federacija','Ruanda','Sveti Bartolomej','Sveta Helena','Sveti Kits in Nevis','Sveta Lucija','Otok svetega Martina','Sveta Pierre in Miquelon','Sveti Vincent in Grenadini','Samoa','San Marino','Sao Tome in Principe','Savdska Arabija','Senegal','Srbija','Sejšeli','Siera Leone','Singapur','Otok svetega.Martina (Nizozemska)','Slovaška','Slovenija','Solomonovi otoki','Somalija','Južna afrika','Južna Georgia in Južni Sandwichevi otoki','Južni Sudan','Španija','Šri Lanka','Sudan','Surinam','Svalbard in Jan Majen ','Svazi','Švedska','Švica','Sirija','Tajvan','Tadžikistan','Tanzanija','Tajska','Vzhodni Timor','Togo','Tokelau','Tonga','Trinidad in Tobago','Tunizija','Turčija','Turkmenistan','Tirški in Kajkoški otoki','Tuvalu','Uganda','Ukrajina','Združeni Arabski Emirati','Velika Britanija','Združene države Amerike','ZDA zunanji otoki','Urugvaj','Uzbekistan','Republika Vanuatu','Venezuela','Vietnam','Britanski Deviški otoki','Ameriški Deviški otoki','Otočje Valis in Futuna','Zahodna Sahara','Jemen','Zambija','Zimbabve'];
    $scope.obcine = [{code:213,ime:"Ankaran"},{code:1, ime: "Ajdovščina"},{code:195, ime:  "Apače "},{code:2, ime: "Beltinci "},{code:148, ime:    "Benedikt "},{code:149, ime:    "Bistrica ob Sotli "},{code:3, ime: "Bled "},{code:150, ime:    "Bloke" },{code:4, ime: "Bohinj "},{code:5, ime:    "Borovnica "},{code:6, ime: "Bovec "},{code:151, ime:   "Braslovče" },{code:7, ime: "Brda "},{code:8, ime:  "Brezovica" },{code:9, ime: "Brežice "},{code:152, ime: "Cankova "},{code:11,ime:"Celje "},{code:12   ,ime: "Cerklje na Gorenjskem "},{code:13    ,ime: "Cerknica "},{code:14 ,ime: "Cerkno "},{code:153,ime: "   Cerkvenjak "},{code:196,ime: "  Cirkulane "},{code:15   ,ime: "Črenšovci "},{code:16    ,ime: "Črna na Koroškem "},{code:17 ,ime: "Črnomelj "},{code:18 ,ime: "Destrnik "},{code:19 ,ime: "Divača "},{code:154,ime: "   Dobje "},{code:20   ,ime: "Dobrepolje "},{code:155,ime: "   Dobrna "},{code:21  ,ime: "Dobrova - Polhov Gradec "},{code:156,ime: "  Dobrovnik "},{code:22   ,ime: "Dol pri Ljubljani "},{code:157,ime: "    Dolenjske Toplice "},{code:23   ,ime: "Domžale "},{code:24  ,ime: "Dornava "},{code:25  ,ime: "Dravograd "},{code:26    ,ime: "Duplek "},{code:27   ,ime: "Gorenja vas - Poljane "},{code:28    ,ime: "Gorišnica "},{code:207,ime: "    Gorje "},{code:29   ,ime: "Gornja Radgona "},{code:30   ,ime: "Gornji Grad "},{code:31  ,ime: "Gornji Petrovci "},{code:158,ime: "  Grad "},{code:32    ,ime: "Grosuplje "},{code:159,ime: "    Hajdina "},{code:160,ime: " Hoče - Slivnica "},{code:161,ime: " Hodoš "},{code:162,ime: "   Horjul "},{code:34  ,ime: "Hrastnik "},{code:35 ,ime: "Hrpelje - Kozina "},{code:36 ,ime: "Idrija "},{code:37   ,ime: "Ig "},{code:38   ,ime: "Ilirska Bistrica "},{code:39 ,ime: "Ivančna Gorica "},{code:40   ,ime: "Izola "},{code:41    ,ime: "Jesenice "},{code:163,ime: " Jezersko "},{code:42    ,ime: "Juršinci "},{code:43 ,ime: "Kamnik "},{code:44   ,ime: "Kanal "},{code:45    ,ime: "Kidričevo "},{code:46    ,ime: "Kobarid "},{code:47  ,ime: "Kobilje "},{code:48  ,ime: "Kočevje "},{code:49  ,ime: "Komen "},{code:164,ime: "    Komenda "},{code:50 ,ime: "Koper "},{code:197,ime: "    Kostanjevica na Krki "},{code:165,ime: "    Kostel "},{code:51  ,ime: "Kozje "},{code:52    ,ime: "Kranj "},{code:53    ,ime: "Kranjska Gora "},{code:166,ime: "    Križevci "},{code:54    ,ime: "Krško "},{code:55    ,ime: "Kungota "},{code:56  ,ime: "Kuzma "},{code:57    ,ime: "Laško "},{code:58    ,ime: "Lenart "},{code:59   ,ime: "Lendava "},{code:60  ,ime: "Litija "},{code:61   ,ime: "Ljubljana "},{code:62    ,ime: "Ljubno "},{code:63   ,ime: "Ljutomer "},{code:208,ime: " Log - Dragomer "},{code:64,ime: "Logatec "},{code:65,ime: "Loška dolina "},{code:66,ime: "Loški Potok "},{code:167,ime: "   Lovrenc na Pohorju "},{code:67,ime: "Luče "},{code:68,ime: "Lukovica "},{code:69,ime: "Majšperk "},{code:198,ime: " Makole "},{code:70,ime: "Maribor "},{code:168,ime: "    Markovci "},{code:71,ime: "Medvode "},{code:72,ime: "Mengeš "},{code:73,ime: "Metlika "},{code:74,ime: "Mežica "},{code:169,ime: "  Miklavž na Dravskem polju"},{code:75,ime: "Miren - Kostanjevica "},{code:212,ime: "Mirna "},{code:170,ime: "Mirna Peč "},{code:76   ,ime: "Mislinja "},{code:199,ime: "Mokronog - Trebelno "},{code:77,ime: "Moravče "},{code:78,ime: "Moravske Toplice "},{code:79,ime: "Mozirje "},{code:80,ime: "Murska Sobota "},{code:81,ime: "Muta "},{code:82,ime: "Naklo "},{code:83,ime: "Nazarje "},{code:84,ime: "Nova Gorica "},{code:85,ime: "Novo mesto "},{code:86,ime: "Odranci "},{code:171,ime: " Oplotnica "},{code:87,ime: "Ormož "},{code:88,ime: "Osilnica "},{code:89,ime: "Pesnica "},{code:90,ime: "Piran "},{code:91,ime: "Pivka "},{code:92,ime: "Podčetrtek "},{code:172,ime: "Podlehnik "},{code:93,ime:"Podvelka "},{code:200,ime: "Poljčane "},{code:173,ime: "Polzela "},{code:94,ime:"Postojna "},{code:174,ime: "Prebold "},{code:95,ime:"Preddvor "},{code:175,ime:"Prevalje "},{code:96,ime:"Ptuj "},{code:97,ime:"Puconci "},{code:98,ime:"Rače - Fram "},{code:99,ime:"Radeče "},{code:100,ime: "Radenci "},{code:101,ime: "Radlje ob Dravi "},{code:102,ime: "Radovljica "},{code:103,ime: "Ravne na Koroškem "},{code:176,ime: "Razkrižje "},{code:209,ime: "Rečica ob Savinji "},{code:201,ime: "Renče - Vogrsko "},{code:104,ime: "Ribnica "},{code:177,ime: "Ribnica na Pohorju "},{code:106,ime: "Rogaška Slatina "},{code:105,ime: "Rogašovci "},{code:107,ime: "Rogatec "},{code:108,ime: "Ruše "},{code:178,ime: "Selnica ob Dravi "},{code:109,ime: "Semič "},{code:110,ime: "Sevnica "},{code:111,ime: "Sežana "},{code:112,ime: "Slovenj Gradec "},{code:113,ime: "Slovenska Bistrica "},{code:114,ime: "Slovenske Konjice "},{code:179,ime: "Sodražica "},{code:180,ime: "Solčava "},{code:202,ime: "Središče ob Dravi "},{code:115,ime: "Starše "},{code:203,ime: "Straža "},{code:204,ime: "Sv. Trojica v Slov. Goricah "},{code:181,ime: "Sveta Ana "},{code:182,ime: "Sveti Andraž v Slov. Goricah "},{code:116,ime: "Sveti Jurij ob Ščavnici "},{code:210,ime: "Sveti Jurij v Slov. Goricah "},{code:205,ime: "Sveti Tomaž "},{code:33,ime: "Šalovci "},{code:183,ime: "Šempeter - Vrtojba "},{code:117,ime: "Šenčur "},{code:118,ime: "Šentilj "},{code:119,ime: "Šentjernej "},{code:120,ime: "Šentjur pri Celju "},{code:211,ime: "Šentrupert "},{code:121,ime: "Škocjan "},{code:122,ime: "Škofja Loka "},{code:123,ime: "Škofljica "},{code:124,ime: "Šmarje pri Jelšah "},{code:206,ime: "Šmarješke Toplice "},{code:125,ime: "Šmartno ob Paki "},{code:194,ime: "Šmartno pri Litiji "},{code:126,ime: "Šoštanj "},{code:127,ime: "Štore "},{code:184,ime: "Tabor "},{code:10,ime: "Tišina "},{code:128,ime: "Tolmin "},{code:129,ime: "Trbovlje "},{code:130,ime: "Trebnje "},{code:185,ime: "Trnovska vas "},{code:186,ime: "Trzin "},{code:131,ime: "Tržič "},{code:132,ime: "Turnišče "},{code:133,ime: "Velenje "},{code:187,ime: "Velika Polana "},{code:134,ime: "Velike Lašče "},{code:188,ime: "Veržej "},{code:135,ime: "Videm "},{code:136,ime: "Vipava "},{code:137,ime: "Vitanje "},{code:138,ime: "Vodice "},{code:139,ime: "Vojnik "},{code:189,ime: "Vransko "},{code:140,ime: "Vrhnika "},{code:141,ime: "Vuzenica "},{code:142,ime: "Zagorje ob Savi "},{code:143,ime: "Zavrč "},{code:144,ime: "Zreče "},{code:190,ime: "Žalec "},{code:146,ime: "Železniki "},{code:191,ime: "Žetale "},{code:147,ime: "Žiri "},{code:192,ime: "Žirovnica "},{code:193,ime: "Žužemberk"}];
    
    //zamenja char v stringu
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substring(0,index) + chr + str.substring(index+1);
    }
    function dopolni_emso(emso) {
        if (emso == null) emso = "1";
        var manjka = 13 - emso.length;
        for (var i = 0; i < manjka; i++)
            emso = emso + "1";
        return emso;
    }
    
    $scope.primerjaj_rojstvo_emso = function() {
        var rojstvo = document.getElementById("date").value;
        var emso = $scope.vl_emso;
        emso = dopolni_emso(emso);
        
        emso = setCharAt(emso, 0, '1');//dan rojstva
        emso = setCharAt(emso, 1, rojstvo.charAt(9));
        emso = setCharAt(emso, 2, rojstvo.charAt(5));//mesec rojstva
        emso = setCharAt(emso, 3, rojstvo.charAt(6));
        emso = setCharAt(emso, 4, rojstvo.charAt(1));//leto rojstva
        emso = setCharAt(emso, 5, rojstvo.charAt(2));
        emso = setCharAt(emso, 6, rojstvo.charAt(3));

        //TOLE JE HARDODIRANO - NUJNO SPREMENI(KODA OBČINE ROJSTVA)
        emso = setCharAt(emso, 7, '5');
        emso = setCharAt(emso, 8, '0');
        $scope.vl_emso = emso; 
    }
    $scope.primerjaj_emso_rojstvo = function() {
        var emso = $scope.vl_emso;
        emso = dopolni_emso(emso);

        var leto = 1+emso.substring(4,7);
        var mesec = (parseInt(emso.substring(2,4))-1);
        var dan = emso.substring(0,2);
        $scope.vl_rojstvo = new Date(leto, mesec, dan);        
    }

    $scope.primerjaj_spol_emso = function() {
        var emso = $scope.vl_emso;
        emso = dopolni_emso(emso);

        if ($scope.vl_spol.ime == "ženski") {
            if (parseInt(emso.charAt(9)+emso.charAt(10)+emso.charAt(11)) < 500) {
                console.log("manj od 50000");
                emso = setCharAt(emso, 9, '5');
                emso = setCharAt(emso, 10, '0');
                emso = setCharAt(emso, 11, '0');
                $scope.vl_emso = emso;
            } 
        }

    }


    $scope.logout = function() {
        $window.localStorage.removeItem('studis');
        $window.localStorage.removeItem("tip");
        $window.location.href = '/#/prijava';
      }        


    var trenutni_logirani_uporabnik = function() {
        if ($window.localStorage['studis']) {
          var zeton = $window.localStorage['studis'];
          return JSON.parse($window.atob(zeton.split('.')[1]));
        }
        else return null;
    }


    //v primeru da do vpisnega lista dostopa kandidat
    if (trenutni_logirani_uporabnik().tip === "Kandidat") {
        studen.service_kandidat(trenutni_logirani_uporabnik().uid).then(function(response){
            $scope.vl_vpisna = response.data.vpisnaStevilka;
            $scope.vl_ime = response.data.ime;
            $scope.vl_priimek = response.data.priimek;
            $scope.vl_email = response.data.email;

            $scope.vl_letnik = "1."; //kandidat se mnde vedno vpiše v prvi letnik
            $scope.vl_vrsta_vpisa = "Prvi vpis v letnik"; //mnde konstantno?
            $scope.vl_program_naziv = response.data.studijskiProgram.naziv;
            
        }).catch(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }

    //v primeru da do vpisnega lista dostopa študent z žetonom
    else if (trenutni_logirani_uporabnik().tip === "Student") {
        studen.service_student(trenutni_logirani_uporabnik().uid).then(function(response){
            var id = $routeParams.id-1; //1 ali 2, odvisno do kterega vpisnega lista dostopamo
            $scope.vl_vpisna = response.data[id].student.vpisnaStevilka;
            $scope.vl_ime = response.data[id].student.ime;
            $scope.vl_priimek = response.data[id].student.priimek;
            $scope.vl_email = response.data[id].student.email;
            $scope.vl_telefonska = response.data[id].student.telefonskaStevilka;

            $scope.vl_letnik = response.data[id].letnik.letnik;
            $scope.vl_program_naziv = response.data[id].studijskiProgram.naziv;
            $scope.vl_vrsta_vpisa = response.data[id].vrstaVpisa.vrstaVpisa;
            $scope.vl_nacin_studija = response.data[id].nacinStudija.opis;//*/
            
        }).catch(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }



}

