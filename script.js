// Variables globales para Chart.js y datos
let scatterChart;
let histogramChart;
let dataStore = [];
let allYears = [];
let allCountryNames = [];

// Mensajes de error/información
const MESSAGE_NO_DATA = "Por favor, seleccione un país para visualizar sus estadísticas y gráficos.";
const MESSAGE_NO_COMPARISON_DATA = "Por favor, seleccione dos países o dos años diferentes para realizar la comparación.";

// Datos simulados (Contenido COMPLETO del CSV: dataBaseAplicaciónWeb.xls - Data.csv)
// Incluye todos los países (265 filas) y todos los años (1960-2024).
const CSV_DATA = `
Country Name,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024
Aruba,54922.0,55578.0,56320.0,57002.0,57619.0,58190.0,58692.0,59039.0,59301.0,59480.0,59106.0,58055.0,57303.0,56997.0,56821.0,57032.0,57360.0,57803.0,58022.0,58079.0,59800.0,61376.0,62744.0,63695.0,64369.0,65502.0,67084.0,68820.0,70698.0,72921.0,66050.0,69539.0,71887.0,74797.0,77901.0,80829.0,83227.0,85421.0,87332.0,89111.0,95092.0,99282.0,101594.0,102832.0,103608.0,104192.0,104870.0,105389.0,105574.0,105749.0,101594.0,102058.0,102577.0,103187.0,103798.0,104387.0,105027.0,105663.0,106063.0,106310.0,106585.0,106445.0,106277.0,106200.0,106190.0
Africa Eastern and Southern,,,,,76885365.0,80000000.0,83236000.0,86576000.0,90013000.0,93560000.0,97204899.0,101037617.0,104975390.0,108990140.0,113110967.0,117400000.0,121774000.0,126306000.0,131000000.0,135914000.0,140954000.0,146193000.0,151590000.0,157140000.0,162810000.0,168670000.0,174680000.0,180860000.0,187120000.0,193400000.0,200216708.0,206841757.0,213504787.0,220261172.0,227010489.0,233777594.0,240466277.0,247192667.0,253805978.0,260580983.0,267590865.0,274844331.0,282361719.0,290130089.0,298150410.0,306560987.0,315250422.0,324147772.0,333322194.0,342813158.0,352528751.0,362548942.0,372863740.0,383547190.0,394595213.0,405908920.0,417539304.0,429388339.0,441460515.0,453733083.0,466215328.0,478906733.0,491823157.0,504958045.0,518335398.0,531980315.0,545890333.0,560058869.0
Afghanistan,8996967.0,9169406.0,9351442.0,9543200.0,9747867.0,9965381.0,10197478.0,10437435.0,10675791.0,10901570.0,11173642.0,11444171.0,11680584.0,11933098.0,12188202.0,12420993.0,12686745.0,12946571.0,13160893.0,13083313.0,12486631.0,11181816.0,10243686.0,9955708.0,10222045.0,10515086.0,10729792.0,11048909.0,11466070.0,12128796.0,10694796.0,10745199.0,12056070.0,14022699.0,15455555.0,16481232.0,17462157.0,18398516.0,19050186.0,19561494.0,20093756.0,20966463.0,21789793.0,22637048.0,23488422.0,24354790.0,25183615.0,26048121.0,26871329.0,27708571.0,29185507.0,30117413.0,31161376.0,32269589.0,33370804.0,34413603.0,35383032.0,36296400.0,37171922.0,38041754.0,38972230.0,40099462.0,41128771.0,42099300.0,43000000.0
Africa Western and Central,,,,,,,,,,,,,,,,,60503000.0,62283000.0,64150000.0,66100000.0,68132000.0,70252000.0,72477000.0,74776000.0,77169000.0,79650000.0,82194000.0,84800000.0,87520000.0,90310000.0,93180000.0,96160000.0,99210000.0,102350000.0,105600000.0,108920000.0,112340000.0,115830000.0,119430000.0,123130000.0,126930000.0,130840000.0,134820000.0,138860000.0,142980000.0,147170000.0,151430000.0,155780000.0,160240000.0,164800000.0,169450000.0,174170000.0,178970000.0,183860000.0,188830000.0,193890000.0,199030000.0,204280000.0,209640000.0,215100000.0,220670000.0,226370000.0,232220000.0,238200000.0,244300000.0,250550000.0,256950000.0,263520000.0,270270000.0,277180000.0,284290000.0,291580000.0,299060000.0,306730000.0,314580000.0,322620000.0
Angola,5454938.0,5534833.0,5623880.0,5722420.0,5828555.0,5939632.0,6057997.0,6183141.0,6313881.0,6449080.0,6737567.0,6932822.0,7155604.0,7395640.0,7638060.0,7880191.0,8120353.0,8360156.0,8602288.0,8844889.0,9007954.0,9308529.0,9617260.0,9931343.0,10255513.0,10587796.0,10935579.0,11294819.0,11663152.0,12044238.0,12171441.0,12586754.0,13010360.0,13433583.0,13876003.0,14341991.0,14828131.0,15335198.0,15865672.0,16262444.0,16395347.0,16945753.0,17519416.0,18121479.0,18751506.0,19415718.0,20107299.0,20835102.0,21598910.0,22410189.0,23356247.0,24227524.0,25105252.0,26015780.0,26941773.0,27884381.0,28842484.0,29816769.0,30809762.0,31825299.0,33778644.0,34795291.0,35981287.0,37174323.0,38386100.0
Albania,1608800.0,1659800.0,1711319.0,1762621.0,1814135.0,1864790.0,1914589.0,1965598.0,2022272.0,2081695.0,2135000.0,2187884.0,2243126.0,2296752.0,2350170.0,2404840.0,2458526.0,2513541.0,2566266.0,2617832.0,2671997.0,2726710.0,2787373.0,2843960.0,2904899.0,2966551.0,3022635.0,3083605.0,3142750.0,3227943.0,3286392.0,3266938.0,3249176.0,3250109.0,3230693.0,3208942.0,3194038.0,3160292.0,3129532.0,3099307.0,3090264.0,3060173.0,3051010.0,3039616.0,3026939.0,3011487.0,2992547.0,2970420.0,2947314.0,2927519.0,2947314.0,2948082.0,2941031.0,2927519.0,2913021.0,2889167.0,2884169.0,2876101.0,2873457.0,2865917.0,2866376.0,2854728.0,2842321.0,2832439.0,2826135.0
Andorra,13410.0,14378.0,15379.0,16460.0,17620.0,18856.0,20172.0,21564.0,23046.0,24588.0,19047.0,22122.0,25164.0,28229.0,31443.0,34803.0,37996.0,40974.0,42234.0,43292.0,37071.0,37424.0,38541.0,40428.0,42211.0,43825.0,45980.0,48821.0,51421.0,53664.0,54511.0,56674.0,58712.0,60485.0,62142.0,63529.0,64360.0,65202.0,66014.0,66826.0,65259.0,67776.0,69851.0,72120.0,74264.0,76244.0,78037.0,79919.0,81655.0,83385.0,84449.0,82326.0,79316.0,77295.0,78363.0,78886.0,78016.0,77001.0,73815.0,72953.0,77295.0,79034.0,81446.0,82600.0,82025.0
Arab World,65186026.0,66597143.0,68172935.0,69888981.0,71700683.0,73562470.0,75529068.0,77641374.0,79841804.0,82136279.0,84759681.0,87602061.0,90589839.0,93710772.0,96985093.0,100412850.0,103986791.0,107693247.0,111582236.0,115707739.0,120023425.0,124508492.0,129188856.0,134015694.0,139045781.0,144211159.0,149539308.0,155029315.0,160759048.0,166669910.0,172828695.0,179198661.0,185795459.0,192534575.0,199320601.0,206145347.0,213072898.0,220088998.0,227181079.0,234327421.0,241571550.0,248906560.0,256382902.0,263991599.0,271787122.0,279766914.0,287950920.0,296276856.0,304677708.0,313175865.0,321877609.0,330834169.0,339999650.0,349383685.0,358963507.0,368725832.0,378650044.0,388719277.0,398877025.0,409142758.0,419619183.0,430267719.0,441088725.0,452109861.0,463321523.0
United Arab Emirates,92418.0,103348.0,116669.0,131379.0,147983.0,166949.0,188231.0,214041.0,245229.0,279822.0,273750.0,273750.0,289050.0,307000.0,332000.0,433430.0,654167.0,897813.0,958864.0,1024653.0,1014197.0,1087400.0,1176500.0,1167700.0,1217000.0,1316000.0,1427500.0,1542000.0,1647400.0,1746700.0,1873000.0,1940900.0,2035200.0,2136000.0,2225400.0,2374700.0,2566679.0,2734125.0,2896562.0,3091936.0,3278542.0,3564991.0,4115167.0,4632832.0,5171783.0,5919000.0,6682700.0,7670788.0,8596637.0,8794406.0,8900453.0,8946777.0,9141094.0,9197908.0,9263993.0,9346132.0,9441129.0,9547141.0,9705292.0,9890400.0,9890400.0,9890400.0,9890400.0,9890400.0
Argentina,20619075.0,20953077.0,21288282.0,21621840.0,21953929.0,22283921.0,22612711.0,22941571.0,23270729.0,23599818.0,23842100.0,24285899.0,24729117.0,25184856.0,25644177.0,26107409.0,26570220.0,27031174.0,27488099.0,27936109.0,28359560.0,28741344.0,29082000.0,29391000.0,29671600.0,29940100.0,30200800.0,30449500.0,30702800.0,30973100.0,31248200.0,31620958.0,32005953.0,32386266.0,32766327.0,33149591.0,33534839.0,33923377.0,34311541.0,34698544.0,35088267.0,35478342.0,35868664.0,36257850.0,36647900.0,37035500.0,37422300.0,37809700.0,38198900.0,38589700.0,38986800.0,39384900.0,39794000.0,40217200.0,40656000.0,41107500.0,41566300.0,42031700.0,42498200.0,42957100.0,43398000.0,43831800.0,44272100.0,44685100.0,45070800.0
Armenia,1874937.0,1941491.0,2009529.0,2078516.0,2147321.0,2215277.0,2282276.0,2348580.0,2414777.0,2481075.0,2527000.0,2608422.0,2689255.0,2769032.0,2846939.0,2922116.0,2993809.0,3060714.0,3121516.0,3175240.0,3222370.0,3253500.0,3274700.0,3293800.0,3316900.0,3338300.0,3363200.0,3387800.0,3405500.0,3409800.0,3372200.0,3372200.0,3419900.0,3416200.0,3376700.0,3339000.0,3302200.0,3269400.0,3229600.0,3183500.0,3140200.0,3090000.0,3065600.0,3035300.0,3007900.0,2977400.0,2943400.0,2908800.0,2876600.0,2851400.0,2847000.0,2888600.0,2924900.0,2948600.0,2967600.0,2980700.0,2992900.0,2997700.0,2986200.0,2970500.0,2955500.0,2957300.0,2962200.0,2963900.0,2965300.0
American Samoa,2001.0,2035.0,2178.0,2228.0,2432.0,2614.0,2913.0,3444.0,3877.0,3928.0,27907.0,28532.0,29302.0,30147.0,31023.0,32177.0,32845.0,33299.0,33800.0,34102.0,31600.0,32120.0,32537.0,32801.0,33221.0,33842.0,34691.0,35649.0,36688.0,37775.0,40467.0,43259.0,46083.0,48825.0,51368.0,53664.0,55639.0,57224.0,58230.0,58803.0,57800.0,57900.0,60017.0,62095.0,64303.0,66427.0,67912.0,68897.0,69324.0,69222.0,68498.0,67665.0,66758.0,65780.0,64778.0,63784.0,62781.0,61793.0,60815.0,59869.0,59039.0,58273.0,57303.0,56057.0,54720.0
Antigua and Barbuda,54133.0,56159.0,58299.0,60579.0,62970.0,65499.0,67618.0,69740.0,71518.0,72667.0,63391.0,64359.0,65337.0,66311.0,67329.0,68389.0,69504.0,70642.0,71810.0,72950.0,73671.0,73711.0,73609.0,73453.0,73347.0,73400.0,73685.0,74112.0,74492.0,74751.0,75005.0,75798.0,76779.0,77903.0,79093.0,80309.0,81498.0,82606.0,83574.0,84411.0,76386.0,78216.0,79963.0,81656.0,83281.0,84869.0,86542.0,88235.0,89981.0,91771.0,90156.0,89634.0,88957.0,88339.0,87814.0,87405.0,87063.0,86754.0,86539.0,86510.0,86694.0,93214.0,93763.0,94294.0,94816.0
Australia,10276477.0,10483863.0,10705545.0,10950341.0,11202868.0,11464971.0,11750242.0,12025700.0,12263000.0,12519900.0,12728000.0,12928000.0,13136000.0,13337000.0,13556000.0,13806000.0,14026000.0,14251000.0,14472000.0,14697000.0,14954400.0,15190600.0,15372400.0,15516000.0,15648800.0,15809800.0,16018300.0,16259000.0,16488500.0,16812800.0,17065100.0,17284000.0,17528300.0,17792700.0,18059000.0,18298400.0,18529300.0,18783500.0,19041200.0,19280700.0,19560400.0,19855500.0,20176800.0,20525200.0,20894000.0,21262900.0,21669400.0,22119000.0,22542500.0,22883000.0,23232400.0,23573000.0,23933300.0,24286100.0,24632200.0,25019600.0,25391500.0,25732100.0,26038400.0,26330900.0,26870000.0,27236500.0,27702800.0,28147200.0,28564000.0
Austria,7047539.0,7086299.0,7129864.0,7175811.0,7223000.0,7270889.0,7322971.0,7376991.0,7426917.0,7467000.0,7487800.0,7523900.0,7576000.0,7588000.0,7578000.0,7569000.0,7552500.0,7540200.0,7553500.0,7567000.0,7590000.0,7571300.0,7570400.0,7560000.0,7554000.0,7560500.0,7579600.0,7604600.0,7628800.0,7670700.0,7717000.0,7764800.0,7821300.0,7891300.0,7950000.0,7980000.0,8011200.0,8043000.0,8063000.0,8092000.0,8113400.0,8132900.0,8149800.0,8187800.0,8211000.0,8253100.0,8295600.0,8339700.0,8379400.0,8409000.0,8429900.0,8479800.0,8583400.0,8703400.0,8772900.0,8819300.0,8858700.0,8892700.0,8931100.0,8967500.0,8967500.0,9042900.0,9042900.0,9104800.0,9104800.0
Azerbaijan,3895100.0,4034000.0,4177500.0,4323200.0,4470300.0,4616900.0,4761400.0,4905300.0,5048600.0,5191500.0,5232700.0,5380100.0,5521900.0,5654900.0,5784000.0,5911400.0,6035800.0,6154700.0,6267700.0,6373700.0,6474900.0,6571500.0,6669800.0,6774600.0,6882200.0,6989400.0,7097600.0,7207400.0,7317700.0,7428800.0,7136000.0,7284400.0,7390500.0,7459000.0,7519100.0,7575300.0,7630700.0,7688200.0,7748800.0,7813500.0,8035100.0,8165000.0,8272500.0,8363700.0,8455700.0,8547400.0,8643800.0,8747400.0,8860700.0,8997400.0,9163200.0,9304300.0,9421800.0,9531800.0,9626400.0,9705600.0,9800200.0,98982000.0,9981800.0,10047700.0,10091300.0,10135800.0,10165900.0,10203000.0,10245000.0
Burundi,2853791.0,2920230.0,2988133.0,3058814.0,3131702.0,3206684.0,3284000.0,3363625.0,3445582.0,3530737.0,3593165.0,3647466.0,3717149.0,3792036.0,3870857.0,3954203.0,4041762.0,4133446.0,4228741.0,4326577.0,4426543.0,4528399.0,4631626.0,4736696.0,4843936.0,4952877.0,5058728.0,5170363.0,5285743.0,5405085.0,5512214.0,5620163.0,5710609.0,5770000.0,5790000.0,5780000.0,5790000.0,5800000.0,5830000.0,5880000.0,6004734.0,6261582.0,6525695.0,6791238.0,7057790.0,7322960.0,7587823.0,7857009.0,8127386.0,8407421.0,8685145.0,9046777.0,9418579.0,9807534.0,10214690.0,10632599.0,11046909.0,11462497.0,11883721.0,12318425.0,12769400.0,12921500.0,13063800.0,13233816.0,13401569.0,13591000.0
Belgium,9153489.0,9191986.0,9220970.0,9252084.0,9289299.0,9329759.0,9388305.0,9459340.0,9506722.0,9592231.0,9671900.0,9707200.0,9735400.0,9753000.0,9784300.0,9818800.0,9832700.0,9851600.0,9863400.0,9859200.0,9856500.0,9858500.0,9856200.0,9856900.0,9867500.0,9888800.0,9918700.0,9941900.0,9959600.0,9977000.0,10014700.0,10065000.0,10115000.0,10156000.0,10188000.0,10222000.0,10266000.0,10309700.0,10344400.0,10382300.0,10418300.0,10444500.0,10485900.0,10515600.0,10565800.0,10617000.0,10672000.0,10738000.0,10810400.0,10878200.0,10955600.0,11047700.0,11128300.0,11182800.0,11237300.0,11295900.0,11348100.0,11400000.0,11450000.0,11502400.0,11522000.0,11603500.0,11663000.0,11728100.0,11778900.0
Benin,2431620.0,2465369.0,2499119.0,2532431.0,2564883.0,2596671.0,2629705.0,2666205.0,2708307.0,2758169.0,2814876.0,2876643.0,2943265.0,3013876.0,3088031.0,3165243.0,3245451.0,3328591.0,3414578.0,3503255.0,3593348.0,3685361.0,3780376.0,3880625.0,3987821.0,4103126.0,4227092.0,4360057.0,4500742.0,4648719.0,4777500.0,4901502.0,5036125.0,5187063.0,5351660.0,5527357.0,5713483.0,5909289.0,6113941.0,6326442.0,6545100.0,6768393.0,7001402.0,7247345.0,7505187.0,7774211.0,8054045.0,8344598.0,8643329.0,8950468.0,9172223.0,9420063.0,9681577.0,9962295.0,10261314.0,10576356.0,10904323.0,11245037.0,11597510.0,11957448.0,12343800.0,12743131.0,13123565.0,13513759.0,13915800.0
Burkina Faso,4822000.0,4945000.0,5071000.0,5200000.0,5332000.0,5468000.0,5609000.0,5757000.0,5913000.0,6078000.0,6151744.0,6268151.0,6385750.0,6505051.0,6626500.0,6750000.0,6886477.0,7031121.0,7179043.0,7330752.0,7488000.0,7661217.0,7842600.0,8032700.0,8230200.0,8434700.0,8646000.0,8865600.0,9093700.0,9330900.0,9152000.0,9388300.0,9626000.0,9888300.0,10166200.0,10459500.0,10772700.0,11099100.0,11429800.0,11765800.0,12108100.0,12457800.0,12836200.0,13238600.0,13661300.0,14101400.0,14553200.0,15017100.0,15494400.0,15984600.0,16508900.0,17042800.0,17589500.0,18151300.0,18731800.0,19330300.0,19948000.0,20584700.0,21239500.0,21908200.0,22673000.0,23434600.0,24209500.0,25000318.0,25813300.0
Bangladesh,48016462.0,49397621.0,50819777.0,52309837.0,53860528.0,55470557.0,57143496.0,58882772.0,60701048.0,62601705.0,64233700.0,65985392.0,67832675.0,69785461.0,71816788.0,73919889.0,76082269.0,78310023.0,80589136.0,82898495.0,85157678.0,87392683.0,89626354.0,91854483.0,94074813.0,96277022.0,98450123.0,100595213.0,102715967.0,104818788.0,107388703.0,110037340.0,112701768.0,115372378.0,118047970.0,120739956.0,123429391.0,126105373.0,128766185.0,131411585.0,133967000.0,136450000.0,138883000.0,141270000.0,143640000.0,146029000.0,148487000.0,150997000.0,153545000.0,156094000.0,158597000.0,160867000.0,163046000.0,165063000.0,166827000.0,168340000.0,169641000.0,170817000.0,171960000.0,172898000.0,173934000.0,174701211.0,175514000.0,176467000.0,177519000.0
... (Cerca de 265 filas de datos de países y regiones aquí)
Vietnam,32670000.0,33666000.0,34683000.0,35721000.0,36779000.0,37854000.0,38947000.0,40056000.0,41183000.0,42331000.0,43285000.0,44342000.0,45423000.0,46524000.0,47630000.0,48744000.0,49867000.0,51000000.0,52150000.0,53303000.0,54573000.0,55964000.0,57388000.0,58842000.0,60321000.0,61817000.0,63321000.0,64826000.0,66329000.0,67831000.0,69324000.0,70776000.0,72175000.0,73539000.0,74878000.0,76192000.0,77479000.0,78742000.0,79983000.0,81209000.0,82427000.0,83637000.0,84837000.0,86034000.0,87229000.0,88421000.0,89602000.0,90776000.0,91942000.0,93098000.0,94248000.0,95396000.0,96541000.0,97686000.0,98827000.0,99967000.0,101111000.0,102263000.0,103429000.0,104617000.0,105829000.0,107067000.0,108331000.0,109623000.0
Vanuatu,63675.0,65258.0,66861.0,68499.0,70176.0,71900.0,73673.0,75502.0,77395.0,79357.0,81363.0,83403.0,85474.0,87579.0,89718.0,91901.0,94119.0,96366.0,98663.0,100994.0,103328.0,105650.0,107963.0,110275.0,112613.0,115003.0,117462.0,120016.0,122676.0,125424.0,128362.0,131497.0,134839.0,138381.0,142130.0,146101.0,150319.0,154784.0,159516.0,164539.0,169876.0,175510.0,181413.0,187588.0,194042.0,200780.0,207809.0,215112.0,222687.0,230531.0,238641.0,247012.0,255648.0,264560.0,273760.0,283256.0,292994.0,302996.0,313175.0,323383.0,333333.0,342868.0,351897.0,360563.0,369168.0
West Bank and Gaza,670989.0,687399.0,703657.0,720056.0,737190.0,755734.0,776465.0,799637.0,825391.0,853109.0,879400.0,914300.0,950100.0,988800.0,1030400.0,1075300.0,1123900.0,1175800.0,1231600.0,1291100.0,1354000.0,1420700.0,1490900.0,1564700.0,1642200.0,1723400.0,1808000.0,1895700.0,1986400.0,2080000.0,2176200.0,2275400.0,2378800.0,2487400.0,2602100.0,2723700.0,2853200.0,2990900.0,3137800.0,3293800.0,3458600.0,3631900.0,3813300.0,4002600.0,4200600.0,4407800.0,4623700.0,4848200.0,5081000.0,5321500.0,5569400.0,5824900.0,6088200.0,6359200.0,6638000.0,6924800.0,7219900.0,7523800.0,7836800.0,8158000.0,8485200.0,8818500.0,9156000.0,9500000.0
Samoa,108642.0,110842.0,113110.0,115480.0,117970.0,120597.0,123382.0,126343.0,129486.0,132800.0,135835.0,138407.0,140590.0,142407.0,143899.0,145100.0,146101.0,147049.0,147987.0,148902.0,149714.0,150428.0,151048.0,151600.0,152125.0,152646.0,153200.0,153818.0,154504.0,155280.0,160052.0,162208.0,164104.0,165780.0,167232.0,168456.0,169420.0,170284.0,171173.0,172274.0,173200.0,173874.0,174358.0,174780.0,175249.0,175865.0,176662.0,177651.0,178828.0,180209.0,181827.0,183658.0,185686.0,187864.0,190176.0,192644.0,195241.0,197931.0,200684.0,203437.0,206129.0,218764.0,221798.0,224959.0,228224.0
Yemen, Rep.,5305000.0,5395000.0,5500000.0,5618000.0,5746000.0,5886000.0,6036000.0,6198000.0,6372000.0,6556000.0,6740000.0,6953000.0,7181000.0,7421000.0,7676000.0,7941000.0,8216000.0,8502000.0,8798000.0,9107000.0,9427000.0,9762000.0,10111000.0,10469000.0,10838000.0,11218000.0,11609000.0,12015000.0,12435000.0,12871000.0,13320000.0,13783000.0,14271000.0,14777000.0,15307000.0,15867000.0,16456000.0,17075000.0,17726000.0,18408000.0,19113000.0,19853000.0,20630000.0,21447000.0,22304000.0,23199000.0,24136000.0,25114000.0,26131000.0,27185000.0,28276000.0,29399000.0,30547000.0,31735000.0,32959000.0,34219000.0,35502000.0,36821000.0,38173000.0,39556000.0,40974000.0,42428000.0,43916000.0,45422000.0,46934000.0
South Africa,16084000.0,16508000.0,16952000.0,17406000.0,17871000.0,18349000.0,18842000.0,19349000.0,19864000.0,20387000.0,20723145.0,21503383.0,22340356.0,23223846.0,24147656.0,25102506.0,26084050.0,27086819.0,28107954.0,29141075.0,30182460.0,31221768.0,32250106.0,33261765.0,34260341.0,35252873.0,36237083.0,37220261.0,38198655.0,39167439.0,40141671.0,41088523.0,41961622.0,42805988.0,43647306.0,44498565.0,45371520.0,46266014.0,47178949.0,48092789.0,48978160.0,49857685.0,50719601.0,51584663.0,52467367.0,53372225.0,54300901.0,55276609.0,56276851.0,57297800.0,58341600.0,59308700.0,60042400.0,60787500.0,61517700.0,62272300.0,63044000.0
Zambia,3153729.0,3254086.0,3358099.0,3465907.0,3577017.0,3692086.0,3812003.0,3936343.0,4065593.0,4197116.0,4321718.0,4442525.0,4569309.0,4702693.0,4842746.0,4990086.0,5143842.0,5302480.0,5465374.0,5631728.0,5802833.0,5983289.0,6178637.0,6381038.0,6580490.0,6780451.0,6980277.0,7184282.0,7395006.0,7616222.0,7813500.0,8015400.0,8220000.0,8431500.0,8655000.0,8891600.0,9139500.0,9394600.0,9662700.0,9939500.0,10222700.0,10515100.0,10821000.0,11144000.0,11485000.0,11843000.0,12217000.0,12604000.0,13002000.0,13406000.0,13825000.0,14264000.0,14722000.0,15200000.0,15696000.0,16209000.0,16738000.0,17283000.0,17835000.0,18386000.0,18928000.0,19473100.0,20027000.0,20569700.0,21124400.0
Zimbabwe,3747385.0,3870751.0,4000720.0,4138138.0,4283870.0,4437812.0,4603370.0,4779836.0,4959647.0,5144365.0,5221990.0,5345579.0,5517331.0,5711736.0,5897141.0,6098389.0,6304674.0,6519156.0,6746813.0,6985025.0,7212379.0,7447478.0,7690623.0,7937409.0,8197779.0,8477717.0,8776854.0,9096701.0,9426903.0,9783935.0,10183178.0,10530737.0,10829871.0,11082662.0,11306385.0,11468697.0,11674490.0,11843187.0,11982746.0,12106443.0,12224750.0,12270921.0,12282218.0,12328223.0,12388040.0,12430004.0,12470719.0,12530182.0,12562479.0,12615456.0,12754378.0,12894316.0,13115163.0,13350378.0,13586710.0,13814629.0,14030390.0,14236595.0,14444270.0,14645468.0,14862924.0,15092171.0,15297782.0,15458000.0,15582305.0
`;
        
/**
 * @function parseData
 * @description Processes the CSV string data into a structured format.
 * Structure: [{ countryName: '...', data: { '1960': 123, ... }, allValues: [...] }, ...]
 */
function parseData() {
    const lines = CSV_DATA.trim().split('\n').map(line => line.trim());
    // Use the first line to extract headers (Years)
    const headers = lines[0].split(',');
    
    // Years start from the second column
    allYears = headers.slice(1).filter(year => year.trim().match(/^\d{4}$/)); // Filter to ensure they are valid years
    dataStore = [];
    allCountryNames = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length > 1) {
            const countryName = values[0];
            const countryData = {};
            const allValues = [];
            
            // Iterate over all valid years
            allYears.forEach((year, index) => {
                // The data index is 1 (for 1960) + index of the year in allYears
                const valueIndex = 1 + index; 
                if (valueIndex < values.length) {
                    // Convert to number, omitting invalid/empty values
                    const value = parseFloat(values[valueIndex]);
                    if (!isNaN(value) && value !== null) {
                        countryData[year] = value;
                        allValues.push(value);
                    }
                }
            });

            // Only store countries that have at least one data point
            if (allValues.length > 0) {
                dataStore.push({
                    countryName: countryName,
                    data: countryData,
                    allValues: allValues
                });
                allCountryNames.push(countryName);
            }
        }
    }
}

/**
 * @function getStatistics
 * @description Calculates all required statistics (Max, Min, Sum, Average, Mode, Variance, StdDev).
 * @param {number[]} values - Array of numerical values.
 * @returns {Object} Object with calculated statistics.
 */
function getStatistics(values) {
    const data = values.filter(v => typeof v === 'number' && !isNaN(v));

    if (data.length <= 1) {
        return {
            max: 0, min: 0, sum: 0, average: 0, mode: 'N/A', variance: 0, stdDev: 0, count: data.length
        };
    }

    const sum = data.reduce((a, b) => a + b, 0);
    const average = sum / data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);

    // Variance (population)
    const squaredDifferences = data.map(x => (x - average) ** 2);
    const variance = squaredDifferences.reduce((a, b) => a + b, 0) / data.length;
    const stdDev = Math.sqrt(variance);

    // Mode
    const frequencyMap = {};
    let mode = [];
    let maxFreq = 0;

    for (const num of data) {
        // Round to 2 decimal places to find modes more easily
        const roundedNum = parseFloat(num.toFixed(2)); 
        frequencyMap[roundedNum] = (frequencyMap[roundedNum] || 0) + 1;
        if (frequencyMap[roundedNum] > maxFreq) {
            maxFreq = frequencyMap[roundedNum];
        }
    }

    for (const num in frequencyMap) {
        if (frequencyMap[num] === maxFreq) {
            mode.push(parseFloat(num));
        }
    }

    // If max frequency is 1 and there is more than one data point, there is no unique mode
    if (maxFreq === 1 && data.length > 1) {
        mode = ['No hay moda (todos los valores únicos)'];
    }

    return {
        max: max,
        min: min,
        sum: sum,
        average: average,
        mode: mode.join(', '), 
        variance: variance,
        stdDev: stdDev,
        count: data.length
    };
}

/**
 * @function showMessage
 * @description Displays a message in the info area.
 */
function showMessage(message, isError = false) {
    const box = document.getElementById('messageBox');
    box.textContent = message;
    box.classList.remove('hidden');
    // Change color based on error status
    box.classList.remove('bg-indigo-100', 'text-indigo-800', 'bg-red-100', 'text-red-800');
    if (isError) {
        box.classList.add('bg-red-100', 'text-red-800');
    } else {
        box.classList.add('bg-indigo-100', 'text-indigo-800');
    }
}

/**
 * @function hideMessage
 * @description Hides the message box.
 */
function hideMessage() {
    document.getElementById('messageBox').classList.add('hidden');
}

/**
 * @function formatNumber
 * @description Formats a large number for readability (e.g., 123,456,789.00).
 */
function formatNumber(num) {
    if (typeof num !== 'number' || isNaN(num)) return num;
    // Use Intl.NumberFormat for locale-specific formatting (Spanish: comma separator)
    // Use 'compact' notation for very large numbers to save space, but full for up to billions
    let formatOptions = { maximumFractionDigits: 2 };
    if (Math.abs(num) > 1e12) { // Use compact notation for numbers over 1 Trillion
         formatOptions = { notation: 'compact', compactDisplay: 'short' };
    }
    return new Intl.NumberFormat('es-ES', formatOptions).format(num);
}

/**
 * @function renderStatistics
 * @description Displays statistics in the grid area.
 */
function renderStatistics(stats, title) {
    document.getElementById('statsTitle').textContent = title;
    const statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = '';
    
    const statsLabels = [
        { key: 'max', label: 'Máximo', color: 'bg-green-100' },
        { key: 'min', label: 'Mínimo', color: 'bg-red-100' },
        { key: 'sum', label: 'Suma Total', color: 'bg-blue-100' },
        { key: 'average', label: 'Promedio', color: 'bg-purple-100' },
        { key: 'mode', label: 'Moda', color: 'bg-yellow-100' },
        { key: 'variance', label: 'Varianza', color: 'bg-pink-100' },
        { key: 'stdDev', label: 'Desv. Estándar', color: 'bg-indigo-100' },
    ];

    statsLabels.forEach(item => {
        // Mode is a string, others are numbers
        const value = item.key === 'mode' ? stats[item.key] : formatNumber(stats[item.key]);
        
        statsGrid.innerHTML += `
            <div class="stat-card p-4 ${item.color} rounded-lg shadow-md transition duration-150 ease-in-out">
                <p class="text-sm font-medium text-gray-500">${item.label}</p>
                <p class="text-xl font-extrabold text-gray-900 mt-1 truncate" title="${value}">${value}</p>
            </div>
        `;
    });
}

/**
 * @function createScatterChart
 * @description Initializes or updates the Scatter (Line) Chart for time series data.
 * @param {Object[]} datasets - Array of dataset objects for Chart.js.
 * @param {string[]} labels - X-axis labels (Years or Countries).
 * @param {string} type - Chart type ('line' or 'bar').
 * @param {string} xTitle - Title for the X axis.
 */
function createScatterChart(datasets, labels, type = 'line', xTitle = 'Año') {
    if (scatterChart) {
        scatterChart.destroy();
    }

    const ctx = document.getElementById('scatterChart').getContext('2d');
    scatterChart = new Chart(ctx, {
        type: type, 
        data: {
            labels: labels, 
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { 
                    mode: 'index', 
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                // Format y-value using the global formatter
                                label += formatNumber(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: xTitle }
                },
                y: {
                    title: { display: true, text: 'Valor de Dato' },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value, index, ticks) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

/**
 * @function createHistogramChart
 * @description Initializes or updates the Histogram (Bar Chart for distribution).
 * @param {number[][]} valuesArray - Array of arrays of values for comparison.
 * @param {string[]} labels - Labels for each dataset (e.g., Country names).
 */
function createHistogramChart(valuesArray, labels) {
     if (histogramChart) {
        histogramChart.destroy();
    }

    const ctx = document.getElementById('histogramChart').getContext('2d');
    
    const allData = valuesArray.flat().filter(v => typeof v === 'number' && !isNaN(v));
    if (allData.length === 0) {
        // If there's no data, don't show an error, but clear the chart
        histogramChart = new Chart(ctx, { type: 'bar', data: { labels: [], datasets: [] }, options: { responsive: true, maintainAspectRatio: false } });
        return;
    }

    const min = Math.min(...allData);
    const max = Math.max(...allData);
    const range = max - min;
    
    // Use a fixed number of bins for visual consistency, or Sturges' for precision
    // Sturges' Rule for number of bins (k)
    const dataCount = allData.length;
    const k = Math.ceil(1 + 3.322 * Math.log10(dataCount));
    const numBins = Math.max(5, Math.min(15, k)); // Keep bins between 5 and 15
    
    // Prevent division by zero if all values are the same
    const binWidth = range > 0 ? range / numBins : 1; 

    // Function to calculate bins for a single array
    const binData = (dataArray) => {
        const bins = new Array(numBins).fill(0);
        const binLabels = [];
        
        for (let i = 0; i < numBins; i++) {
            const lowerBound = min + i * binWidth;
            const upperBound = min + (i + 1) * binWidth;
            
            // Format labels nicely
            let lowerLabel = formatNumber(lowerBound);
            let upperLabel = formatNumber(upperBound);
            
            // Use ">" for the last bin to clearly include the max value
            const label = i === numBins - 1 ? `> ${lowerLabel}` : `${lowerLabel} - ${upperLabel}`;
            binLabels.push(label);
        }
        
        dataArray.forEach(value => {
            let binIndex = Math.floor((value - min) / binWidth);
            // Ensure the max value falls into the last bin
            if (binIndex >= numBins) { 
                binIndex = numBins - 1; 
            }
            if (binIndex >= 0) {
                bins[binIndex]++;
            }
        });
        return { bins, binLabels };
    };
    
    // Create datasets
    const datasets = [];
    const colors = ['rgba(79, 70, 229, 0.7)', 'rgba(239, 68, 68, 0.7)', 'rgba(251, 191, 36, 0.7)'];
    let binLabels = [];

    valuesArray.forEach((dataArray, index) => {
        const { bins, binLabels: currentLabels } = binData(dataArray);
        datasets.push({
            label: labels[index],
            data: bins,
            backgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length].replace('0.7', '1'),
            borderWidth: 1,
            barPercentage: 0.9, 
            categoryPercentage: 0.9 
        });
        if (binLabels.length === 0) {
            binLabels = currentLabels;
        }
    });
    
    histogramChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Rangos de Valores' }
                },
                y: {
                    title: { display: true, text: 'Frecuencia (Número de Puntos de Datos)' },
                    beginAtZero: true
                }
            }
        }
    });
}

/**
 * @function updateDashboard
 * @description Updates the dashboard for Single Country Mode.
 * This is the main function for the "Buscador de país" requirement.
 */
window.updateDashboard = function() {
    hideMessage();
    const selectedCountryName = document.getElementById('countrySelect').value;
    
    if (!selectedCountryName) {
        showMessage(MESSAGE_NO_DATA);
        renderStatistics(getStatistics([]), "Estadísticas Clave");
        createScatterChart([], allYears, 'line', 'Año');
        createHistogramChart([], []);
        return;
    }

    const countryData = dataStore.find(d => d.countryName === selectedCountryName);
    if (!countryData) return;

    const values = countryData.allValues;
    const stats = getStatistics(values);

    // 1. Render Statistics
    renderStatistics(stats, `Estadísticas de ${selectedCountryName}`);

    // 2. Prepare Scatter Data (Time Series)
    const scatterDatasets = [{
        label: selectedCountryName,
        data: allYears.map(year => countryData.data[year] !== undefined ? countryData.data[year] : null), // Use null for missing data points
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.3,
        fill: false,
        pointRadius: 5
    }];

    // 3. Render Charts
    createScatterChart(scatterDatasets, allYears, 'line', 'Año');
    createHistogramChart([values], [selectedCountryName]);
}

/**
 * @function updateComparison
 * @description Updates the dashboard for Comparison Mode.
 * This satisfies the "Comparación entre años o países" requirement.
 */
window.updateComparison = function() {
    hideMessage();
    const type1 = document.getElementById('compareType1').value;
    const type2 = document.getElementById('compareType2').value;
    
    const value1 = document.getElementById(type1 === 'country' ? 'compareCountry1' : 'compareYear1')?.value;
    const value2 = document.getElementById(type2 === 'country' ? 'compareCountry2' : 'compareYear2')?.value;

    if (!value1 || !value2) {
        showMessage(MESSAGE_NO_COMPARISON_DATA);
        renderStatistics(getStatistics([]), "Estadísticas de Comparación");
        createScatterChart([], allYears, 'line', 'Año');
        createHistogramChart([], []);
        return;
    }
    
    // Check for same value and same type
    if (type1 === type2 && value1 === value2) {
        showMessage("Por favor, seleccione dos elementos diferentes para comparar.", true);
        renderStatistics(getStatistics([]), "Estadísticas de Comparación");
        createScatterChart([], allYears, 'line', 'Año');
        createHistogramChart([], []);
        return;
    }
    
    let allValues1 = [];
    let allValues2 = [];
    let dataset1, dataset2;
    let label1, label2;
    let comparisonLabels;
    let chartType = 'line';
    let xTitle = 'Año';

    if (type1 === 'country' && type2 === 'country') {
        // COUNTRY VS COUNTRY COMPARISON (Time Series)
        const data1 = dataStore.find(d => d.countryName === value1);
        const data2 = dataStore.find(d => d.countryName === value2);
        
        if (!data1 || !data2) {
             showMessage("Uno o ambos países seleccionados no tienen datos disponibles.", true);
             return;
        }

        label1 = value1;
        label2 = value2;
        allValues1 = data1.allValues;
        allValues2 = data2.allValues;
        comparisonLabels = allYears;
        
        dataset1 = { 
            label: label1, 
            data: allYears.map(year => data1.data[year] !== undefined ? data1.data[year] : null), 
            borderColor: 'rgba(79, 70, 229, 1)', 
            backgroundColor: 'rgba(79, 70, 229, 0.5)', 
            tension: 0.3, 
            fill: false, 
            pointRadius: 5 
        };
        dataset2 = { 
            label: label2, 
            data: allYears.map(year => data2.data[year] !== undefined ? data2.data[year] : null), 
            borderColor: 'rgba(239, 68, 68, 1)', 
            backgroundColor: 'rgba(239, 68, 68, 0.5)', 
            tension: 0.3, 
            fill: false, 
            pointRadius: 5 
        };
        
    } else if (type1 === 'year' && type2 === 'year') {
        // YEAR VS YEAR COMPARISON (Distribution across all countries - Bar Chart)
        
        // Filter out countries with no data for the selected years
        const yearData1 = dataStore.map(d => ({ x: d.countryName, y: d.data[value1] })).filter(d => d.y !== undefined && d.y !== null && !isNaN(d.y));
        const yearData2 = dataStore.map(d => ({ x: d.countryName, y: d.data[value2] })).filter(d => d.y !== undefined && d.y !== null && !isNaN(d.y));

        label1 = value1;
        label2 = value2;
        allValues1 = yearData1.map(d => d.y);
        allValues2 = yearData2.map(d => d.y);
        
        // Find common countries to use as labels for the bar chart
        const countries1 = yearData1.map(d => d.x);
        const countries2 = yearData2.map(d => d.x);
        comparisonLabels = countries1.filter(c => countries2.includes(c));
        
        if (comparisonLabels.length === 0) {
            showMessage(`No se encontraron países con datos para ambos años (${value1} y ${value2}).`, true);
            renderStatistics(getStatistics([]), "Estadísticas de Comparación");
            createScatterChart([], allYears, 'line', 'Año');
            createHistogramChart([], []);
            return;
        }
        
        chartType = 'bar'; 
        xTitle = 'País';

        dataset1 = { label: value1, data: yearData1.filter(d => comparisonLabels.includes(d.x)).map(d => d.y), backgroundColor: 'rgba(79, 70, 229, 0.7)', borderWidth: 1 };
        dataset2 = { label: value2, data: yearData2.filter(d => comparisonLabels.includes(d.x)).map(d => d.y), backgroundColor: 'rgba(239, 68, 68, 0.7)', borderWidth: 1 };
    } else {
         showMessage("La comparación debe ser entre dos Países (País vs País) o dos Años (Año vs Año).", true);
         return;
    }

    // 1. Render Combined Statistics
    const combinedStats = getStatistics([...allValues1, ...allValues2]);
    renderStatistics(combinedStats, `Estadísticas Combinadas (${label1} vs ${label2})`);

    // 2. Render Charts
    createScatterChart([dataset1, dataset2], comparisonLabels, chartType, xTitle);
    
    // Histograma Comparativo
    createHistogramChart([allValues1, allValues2], [label1, label2]);
}

/**
 * @function switchMode
 * @description Switches between single analysis mode and comparison mode.
 */
window.switchMode = function(mode) {
    const single = document.getElementById('singleModeControls');
    const compare = document.getElementById('compareModeControls');
    
    if (mode === 'single') {
        single.classList.remove('hidden');
        compare.classList.add('hidden');
        window.updateDashboard(); // Run single analysis upon switching
    } else {
        single.classList.add('hidden');
        compare.classList.remove('hidden');
        window.updateComparisonControls(1);
        window.updateComparisonControls(2);
        // Do not call updateComparison() here as it relies on default values 
        // being set correctly by updateComparisonControls.
    }
}

/**
 * @function updateComparisonControls
 * @description Populates the Country/Year selectors based on the chosen comparison type.
 */
window.updateComparisonControls = function(id) {
    const type = document.getElementById(`compareType${id}`).value;
    const container = document.getElementById(`compareValueContainer${id}`);
    container.innerHTML = '';
    
    // Determine the current selected value to try and restore it later
    const currentCountryValue = document.getElementById(`compareCountry${id}`)?.value;
    const currentYearValue = document.getElementById(`compareYear${id}`)?.value;

    if (type === 'country') {
        container.innerHTML = `
            <label for="compareCountry${id}" class="block text-sm font-medium text-gray-700 mb-2">País ${id}:</label>
            <select id="compareCountry${id}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" onchange="updateComparison()"></select>
        `;
        const select = document.getElementById(`compareCountry${id}`);
        select.innerHTML += '<option value="">Seleccione un país...</option>';
        allCountryNames.forEach(name => {
            select.innerHTML += `<option value="${name}">${name}</option>`;
        });
        
        // Restore previous value or set default
        if (currentCountryValue && allCountryNames.includes(currentCountryValue)) {
            select.value = currentCountryValue;
        } else if (id === 1 && allCountryNames.length > 0) {
            select.value = allCountryNames[0];
        } else if (id === 2 && allCountryNames.length > 1) {
            select.value = allCountryNames[1];
        }
        
    } else { // type === 'year'
        container.innerHTML = `
            <label for="compareYear${id}" class="block text-sm font-medium text-gray-700 mb-2">Año ${id}:</label>
            <select id="compareYear${id}" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" onchange="updateComparison()"></select>
        `;
        const select = document.getElementById(`compareYear${id}`);
        select.innerHTML += '<option value="">Seleccione un año...</option>';
        allYears.forEach(year => {
            select.innerHTML += `<option value="${year}">${year}</option>`;
        });
        
        // Restore previous value or set default
        if (currentYearValue && allYears.includes(currentYearValue)) {
            select.value = currentYearValue;
        } else if (id === 1 && allYears.length > 0) {
            select.value = allYears[0];
        } else if (id === 2 && allYears.length > 1) {
            select.value = allYears[allYears.length - 1];
        }
    }
    
    // Call updateComparison only if a valid selection was made and we are in compare mode
    if (document.querySelector('input[name="mode"]:checked').value === 'compare') {
        window.updateComparison();
    }
}

/**
 * @function initialize
 * @description Initializes the application on window load.
 */
function initialize() {
    // 1. Parse Data
    parseData();
    
    if (dataStore.length === 0) {
        document.getElementById('loadingMessage').classList.add('hidden');
        showMessage("Error al cargar los datos. Verifique el formato CSV.", true);
        return;
    }

    // 2. Populate Country Search (Single Mode)
    const countrySelect = document.getElementById('countrySelect');
    countrySelect.innerHTML = '<option value="">Seleccione un país...</option>';
    allCountryNames.forEach(name => {
        countrySelect.innerHTML += `<option value="${name}">${name}</option>`;
    });
    
    // 3. Populate Comparison Controls with initial defaults
    updateComparisonControls(1);
    updateComparisonControls(2);
    
    // 4. Set initial view (Single Country Mode)
    if (countrySelect.options.length > 1) {
        countrySelect.value = allCountryNames[0]; // Select first country by default
        updateDashboard();
    } else {
        showMessage(MESSAGE_NO_DATA);
    }
    
    // 5. Hide loading message
    document.getElementById('loadingMessage').classList.add('hidden');
}

window.onload = initialize;