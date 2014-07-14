
	var ASFR = {} || ASFR;
	var JATH = {} || JATH;

	var THREE, renderer, scene, camera, controls;
	var mesh, geometry, material;

	var app;

	ASFR.addFileReaderTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Choose from a number of equations to display';
		tab.innerHTML =
			'<a href=# id=tabFileReader ><p class=button >' +
				'<i class="fa fa-file-image-o"></i> File Reader...' +
			'</p></a>'; 
		tabFileReader.onclick = function() { JA.toggleDialogs( ASFR.FileReader );ASFR.ifr.style.display=''; };

		ASFR.FileReader = tab.appendChild( document.createElement( 'div' ) );
		ASFR.FileReader.style.cssText = 'cursor: auto; display: none; ';

		var fileList = '* particularly pretty';
		var file;
		for ( var i = 0, len = ASFR.files.length; i < len; i++ ) {
			file = ASFR.files[ i ][ 1 ];
			fileList += '<a href=JavaScript:ASFR.updateIframe("' + i + '"); >' + file + '</a><br>';
		}
		ASFR.FileReader.innerHTML =
			'<h3>Parametric Equations</h3>' +
			'<div >' + fileList + '</div>' +
			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(ASFR.FileReader); ); >Close</a> ' +
			'</p>' +
		'';
	};

	ASFR.init = function() {
//		var file = ASFR.files[ Math.floor( Math.random() * ASFR.files.length ) ][0];
		chkMaterial.checked = true;
		var number = Math.floor( Math.random() * ASFR.files.length );
		ASFR.updateIframe( number );
	};

	ASFR.updateIframe = function( number ) { 
		var file = ASFR.files[ number ][ 0 ];

		if ( !ASFR.ifr ) {
			ASFR.ifr = JA.container.appendChild( document.createElement( 'iframe' ) );
			ASFR.ifr.height =  window.innerHeight;
			ASFR.ifr.width = window.innerWidth;
			ASFR.ifr.style.cssText = 'border-width: 0; position: absolute; ';
		}
		chkWires.checked = false;
		divCon.innerHTML = '';

		ASFR.ifr.onload = function() {
			JAPR.setRandomGradient();
			app = ASFR.ifr.contentWindow;
			THREE = app.THREE;
			JATH.renderer = app.renderer;
			JATH.scene = scene = app.scene;
			JATH.camera = camera = app.camera;
			JATH.controls = controls = app.controls;
// console.log( scene );

			ASFR.updateRenderer();
			JALI.toggleLightAmbient();
			JALI.toggleLightCamera();
			JALI.toggleLightPosition();

			JATH.selectedObject = scene.children[0];
			JATH.selectedObject.castShadow = true;
			JATH.selectedObject.receiveShadow = true;
			if ( chkMaterial.checked === false ) {
				JAMA.updateMaterial( JATH.materialKey );
//console.log( 'reader', JATH.materialKey );
			} else {
				divMsg2.innerHTML = 'Material: <b>from HTML file</b>';
			}

 			divMsg1.innerHTML = 'Equation: <b>' + ASFR.files[ number ][ 1 ] + '</b>';
			divMsg3.style.cssText += 'font-size: small; width: 300px;';
			divMsg3.innerText = app.curve;

			ASCO.updateControlsTab( number );

/*
			if ( app.a !== undefined) { 
				divCon.innerHTML += 'a: <input type=range id=inpA title="default ' + app.a + '" ' +
					'min=' + app.aMin + ' max=' + app.aMax + ' step=' + app.aStep + ' value=' + app.a + 
					' onmousemove=outA.value=inpA.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outA style=width:30px; onchange=inpA.value=outA.value;ASCO.updateMesh(); value=' + app.a + ' ><br>'; 
//	not			inpA.type = 'range';
//				inpA.value = app.a;
//				outA.value = app.a;
//				inpA.min = app.aMin;
//				inpA.max = app.aMax;
//				inpA.step = app.aStep;
//				inpA.onchange = updateMesh;
//				outA.onchange = updateMesh;
			}

			if ( app.b !== undefined) { 
				divCon.innerHTML += 'b: <input type=range id=inpB title="default ' + app.b + '" ' +
					'min=' + app.bMin + ' max=' + app.bMax + ' step=' + app.bStep + ' value=' + app.b + 
					' onmousemove=outB.value=inpB.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outB style=width:30px; onchange=inpB.value=outB.value;ASCO.updateMesh(); value=' + app.b + ' ><br>'; 
			}

			if ( app.c !== undefined) { 
				divCon.innerHTML += 'c: <input type=range id=inpC title="default ' + app.c + '" ' +
					'min=' + app.cMin + ' max=' + app.cMax + ' step=' + app.cStep + ' value=' + app.c+ 
					' onmousemove=outC.value=inpC.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outC style=width:30px; onchange=inpC.value=outC.value;ASCO.updateMesh(); value=' + app.c + ' ><br>'; 
			}

			if ( app.d !== undefined ) { 
				divCon.innerHTML += 'd: <input type=range id=inpD title="default ' + app.d + '" ' +
					'min=' + app.dMin + ' max=' + app.dMax + ' step=' + app.dStep + ' value=' + app.d + 
					' onmousemove=outD.value=inpD.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outD style=width:30px; onchange=inpD.value=outD.value;ASCO.updateMesh(); value=' + app.d + ' ><br>'; 
			}

			if ( app.e !== undefined  ) { 
				divCon.innerHTML += 'e: <input type=range id=inpE title="default ' + app.e + '" ' +
					'min=' + app.eMin + ' max=' + app.eMax + ' step=' + app.eStep + ' value=' + app.e + 
					' onmousemove=outE.value=inpE.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outE style=width:30px; onchange=inpE.value=outE.value;ASCO.updateMesh(); value=' + app.e + ' ><br>'; 
			}

			if ( app.f !== undefined  ) { 
				divCon.innerHTML += 'f: <input type=range id=inpF title="default ' + app.f + '" ' +
					'min=' + app.fMin + ' max=' + app.fMax + ' step=' + app.fStep + ' value=' + app.f + 
					' onmousemove=outF.value=inpF.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outF style=width:30px; onchange=inpF.value=outF.value;ASCO.updateMesh(); value=' + app.f + ' ><br>'; 
			}

			if ( app.g !== undefined) { 
				divCon.innerHTML += 'g: <input type=range id=inpG title="default ' + app.g + '" ' +
					'min=' + app.gMin + ' max=' + app.gMax + ' step=' + app.gStep + ' value=' + app.g + 
					' onmousemove=outG.value=inpG.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outG style=width:30px; onchange=inpG.value=outG.value;ASCO.updateMesh(); value=' + app.g + ' ><br>'; 
			}

			if ( app.h !== undefined) { 
				divCon.innerHTML += 'h: <input type=range id=inpH title="default ' + app.h + '" ' +
					'min=' + app.hMin + ' max=' + app.hMax + ' step=' + app.hStep + ' value=' + app.h + 
					' onmousemove=outH.value=inpH.value;ASCO.updateMesh(); style=width:200px; > ' +
					'<input id=outH style=width:30px; onchange=inpH.value=outH.value;ASCO.updateMesh(); value=' + app.h + ' ><br>'; 
			}

			if ( app.R1 !== undefined) { 
				divCon.innerHTML += 'R1: <input type=range id=inpR1 title="default ' + app.R1 + '" ' +
					'min=' + app.R1Min + ' max=' + app.R1Max + ' step=' + app.R1Step + ' value=' + app.R1 + 
					' onmousemove=outR1.value=inpR1.value;ASCO.updateMesh(); style=width:195px; > ' +
					'<input id=outR1 style=width:30px; onchange=inpR1.value=outR1.value;ASCO.updateMesh(); value=' + app.R1 + ' ><br>'; 
			}

			if ( app.R2 !== undefined) { 
				divCon.innerHTML += 'R2: <input type=range id=inpR2 title="default ' + app.R2 + '" ' +
					'min=' + app.R2Min + ' max=' + app.R2Max + ' step=' + app.R2Step + ' value=' + app.R2 + 
					' onmousemove=outR2.value=inpR2.value;ASCO.updateMesh(); style=width:195px; > ' +
					'<input id=outR2 style=width:30px; onchange=inpR2.value=outR2.value;ASCO.updateMesh(); value=' + app.R2 + ' ><br>'; 
			}

			divCon.innerHTML += '<button onclick=ASFR.updateIframe("' + number + '"); >Reset</button>';

*/
		}
		ASFR.ifr.src = '../equation-files/' + file + '/' + file + '.html';	
	}

	ASFR.updateRenderer = function() {
		app.renderer.shadowMapEnabled = true;
		app.renderer.shadowMapSoft = true;
	}

	ASFR.files = [
		['apple-surface','Apple Surface I'],
		['apple-surface-ii','Apple Surface II'],
		['bell','Bell'],
		['bell-polar','Bell Polar'],
		['bell-wave','Bell Wave'],
		['bent-horns','Bent Horns'],
		['bicorn-surface','Bicorn Surface'],
		['bohemian-dome','Bohemian Dome'],
		['bonan-jeener-klein-surface','Bonan Jeener Klein Surface *'],
		['borromean-rings','Borromean Rings'],
		['bow-curve','Bow Curve'],
		['boy-surface','Boy\'s Surface *'],
		['breather-surface','Breather Surface *'],
		['bullet-nose','Bullet Nose'],
		['catalan-surface','Catalan Surface *'],
		['catenoid','Catenoid'],
		['cone','Cone'],
		['cornucopia','Cornucopia'],
		['cosine-surface','Cosine Surface'],
		['cosine-surface-ii','Cosine Surface II'],
		['cosine-wave','Cosine Wave'],
		['costa-surface','Costa Surface'],
		['crescent','Crescent'],
		['cross-cap','Cross Cap'],
		['cross-cup','Cross Cup'],
		['cylinder','Cylinder'],
		['cylinder-cissoid','Cylinder Cissoid'],
		['cylinder-epicycloid','Cylinder Epicycloid'],
		['cylinder-gauss','Cylinder Gauss'],
		['cylinder-hypocycloid','Cylinder Hypocycloid'],
		['cylinder-lemniscate','Cylinder Lemniscate'],
		['cylinder-strophoid','Cylinder Strophoid'],
		['cylinder-witch-of-agnesi','Cylinder Witch of Agnesi'],
		['dini-surface','Dini Surface *'],
		['disc','Disc'],
		['double-cone','Double Cone'],
		['drop-i','Drop I'],
		['drop-ii','Drop II'],
		['dupin-cyclide','Dupin Cyclide'],
		['egg','Egg <br><br><b>\>\><br>From here on only some have coefficients</b><br>'],
		['eight-surface','Eight Surface'],
		['ellipsoid','Ellipsoid'],
		['enneper-surface','Enneper Surface'],
		['enneper-surface-polar','Enneper Surface Polar *'],
		['facing-snail','Facing Snail'],
		['fish-surface','Fish Surface'],
		['folium','Folium'],
		['fresnel-elastic-surface','Fresnel Elastic Surface'],
		['funnel','Funnel'],
		['guimard-surface','Guimard Surface'],
		['handkerchief-surface','Handkerchief Surface'],
		['helicoid','Helicoid'],
		['henneberg-surface','Henneberg Surface'],
		['horn','Horn'],
		['hyperbolic-helicoid','Hyperbolic Helicoid'],
		['hyperbolic-octahedron','Hyperbolic Octahedron *'],
		['hyperbolic-paraboloid','Hyperbolic Paraboloid'],
		['hyperboloid','Hyperboloid'],
		['isolator','Isolator'],
		['jeener-klein-surface','Jeener Klein Surface *'],
		['jet-surface','Jet Surface'],
		['kappa-surface','Kappa Surface'],
		['kidney-surface','Kidney Surface'],
		['klein-bottle','Klein Bottle *'],
		['klein-cycloid','Klein Cycloid *'],
		['kuen-surface','Kuen\s Surface *'],
		['lemniscape','Lemniscape *'],
		['lemon-surface','Lemon Surface'],
		['lochdiscus','Lochdiscus'],
		['lockdisk','Lockdisk'],
		['loop','Loop'],
		['maeder-owl','Maeder\'s Owl *'],
		['menn-surface','Menn\'s Surface'],
		['milk-carton','Milk Carton'],
		['mobius-band','Mobius Band'],
		['monkey-saddle','Monkey Saddle'],
//		['nautilus','Nautilus'],
		['paper-bag','Paper Bag'],
		['paraboloid','Paraboloid'],
		['pillow-shape','Pillow Shape'],
		['piriform-surface','Piriform Surface'],
		['pisot-triaxial','Pisot Triaxial *'],
		['plane','Plane'],
		['plucker-conoid','Plucker Conoid'],
		['pseudo-cross-cap','Pseudo Cross Cap'],
		['pseudosphere','Pseudosphere'],
		['richmond-surface','Richmond Surface'],
		['roman-surface','Roman Surface *'],
		['roundabout','Roundabout'],
		['scherk-surface','Scherk Surface'],
		['seashell','Seashell'],
		['shoe-surface','Shoe Surface'],
		['sievert-surface','Sievert Surface'],
		['sine-cone','Sine cone'],
		['sine-surface','Sine Surface'],
		['sine-wave','Sine Wave'],
		['snail-surface','Snail Surface'],
		['soucoupoid','Soucoupoid'],
		['sphere-double','Spheredouble'],
		['sphere-i','Sphere I'],
		['sphere-ii','Sphere II'],
		['sphere-iii','Sphere III'],
		['sphere-iv','Sphere IV'],
		['spiral-archimedes','Spiral Archimedes'],
		['spiral-fermat','Spiral Fermat'],
		['spiral-hyperbolic','Spiral Hyperbolic'],
		['spiral-logarithmic','Spiral Logarithmic'],
		['spiral-tanh','Spiral Tanh'],
		['spiral-wave','Spiral Wave'],
		['spring-i','Spring I'],
		['spring-ii','Spring II'],
		['steinbach-screw','Steinbach Screw *'],
		['stiletto-surface','Stiletto Surface *'],
		['swallow-surface','Swallow Surface'],
		['torus','Torus'],
		['torus-8','Torus 8'],
		['torus-astroid','Torus Astroid'],
		['torus-asymmetric','Torus Asymmetric'],
		['torus-bicorn-i','Torus Bicorn I'],
		['torus-bicorn-ii','Torus Bicorn II'],
		['torus-braided','Torus Braided *'],
		['torus-cardioid-i','Torus Cardioid I'],
		['torus-cardioid-ii','Torus Cardioid II'],
		['torus-cassinian-oval-i','Torus Cassinian Oval I'],
		['torus-cassinian-oval-ii','Torus Cassinian Oval II'],
		['torus-corrugated-i','Torus Corrugated I'],
		['torus-corrugated-ii','Torus Corrugated II'],
		['torus-elliptic','Torus Elliptic'],
		['torus-epicycloid-i','Torus Epicycloid I'],
		['torus-epicycloid-ii','Torus Epicycloid II'],
		['torus-gear','Torus Gear'],
		['torus-hypocycloid-i','Torus Hypocycloid i'],
		['torus-hypocycloid-ii','Torus Hypocycloid II'],
		['torus-knot','Torus Knot *'],
		['torus-lemniscate-gerono-i','Torus Lemniscate Gerono I'],
		['torus-lemniscate-gerono-ii','Torus Lemniscate Gerono II'],
		['torus-lemniscate-i','Torus Lemniscate I'],
		['torus-lemniscate-ii','Torus Lemniscate II'],
		['torus-limpet','Torus Limpet'],
		['torus-nephroid-i','Torus Nephroid '],
		['torus-nephroid-ii','Torus Nephroid II'],
		['torus-piriform-i','Torus Piriform I'],
		['torus-piriform-ii','Torus Piriform II'],
//		['torus-saddle','Torus Saddle'],
		['torus-spiral','Torus Spiral *'],
		['torus-strangled-i','Torus Strangled I'],
		['torus-strangled-ii','Torus Strangled II'],
		['torus-tricuspoid-i','Torus Tricuspoid iI'],
		['torus-tricuspoid-ii','Torus Tricuspoid II'],
		['torus-twisted-eight','Torus Twisted Eight *'],
		['torus-umbilic','Torus Umbilic'],
		['torus-wave','Torus Wave *'],
		['tractroid','Tractroid'],
		['tranguloid-trefoil','Tranguloid Trefoil *'],
		['trash-can','Trash Can'],
		['trefoil-knot','Trefoil Knot *'],
		['trefoil-knot-ii','Trefoil Knot II *'],
		['triaxial-hexatorus','Triaxial Hexatorus *'],
		['triaxial-teardrop','Triaxial Teardrop'],
		['triaxial-tritorus','Triaxial Tritorus *'],
		['triple-corkscrew-i','Triple Corkscrew I'],
		['triple-corkscrew-ii','Triple Corkscrew II'],
		['triple-corkscrew-iii','Triple Corkscrew III'],
		['triple-point-twist','Triple Point Twist'],
		['twisted-heart','Twisted Heart'],
		['twisted-pipe-surface','Twisted Pipe Surface *'],
		['twisted-sphere','Twisted Sphere'],
		['vase-and-spearhead','Vase and Spearhead'],
		['verrill-surface','Verrill Surface'],
		['wallis-conical-edge','Wallis Conical Edge'],
		['wave','Wave'],
		['wave-sphere','Wave Sphere *'],
		['whitney-umbrella','Whitney Umbrella *'],
		['worm','Worm'],
		['wreath','Wreath *'],
		['zindler-conoid','Zindler\'s Conoid'] 
	];