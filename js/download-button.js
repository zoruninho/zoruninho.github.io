(function ($) {
	'use strict';

	var $downloadButton = $('#app-download-button');
	var $downloadOther = $('#app-download-otherlink');

	var parser = new UAParser();
	var userBrowser = parser.getBrowser();
	userBrowser.version = +userBrowser.version.split('.')[0];

	switch(userBrowser.name.toLowerCase()) {
		case 'yandex':
		case 'chrome':
			if(chrome.app.isInstalled) {
				$downloadButton.html('<i class="fa fa-check"></i><p class="mb-0">Extension déjà installée !</p>');
			} else {
				$downloadButton.html('<i class="fa fa-chrome"></i><p class="mb-0"><span>Télécharger pour </span> Google Chrome</p>');
				$downloadButton.click(function() {
					chrome.webstore.install(null, function() {
						$downloadButton.html('<i class="fa fa-check"></i>&nbsp;&nbsp;&nbsp;Extension installée !');
						$('#chrome-modal').modal('hide');
					});
					$('#chrome-modal').modal('show');
				});
				$downloadOther.html('<i class="fa fa-firefox" style="margin-right:10px"></i>Aussi disponible sur Mozilla Firefox');
				$downloadOther.attr('href', 'https://addons.mozilla.org/fr/firefox/addon/zoru/');
			}
			break;
		case 'iceweasel':
		case 'firefox':
			$downloadButton.html('<i class="fa fa-firefox"></i><p class="mb-0"><span>Télécharger pour </span> Mozilla Firefox</p>');
			$downloadButton.click(function() {
				document.location.href = "https://addons.mozilla.org/fr/firefox/addon/zoru/";
			});
			$downloadOther.html('<i class="fa fa-chrome" style="margin-right:10px"></i>Aussi disponible sur Google Chrome');
			$downloadOther.attr('href','https://chrome.google.com/webstore/detail/zoru/mikfeamnecigfmgjpbeedlaakhgmnief');
			break;
		default:
			$downloadButton.html('<i class="fa fa-exclamation-triangle"></i><p class="mb-0"><span>Extension indisponible sur </span> ' + userBrowser.name + ' ' + userBrowser.version +'</p>');
			$downloadOther.text('Mais elle est disponible sur Chrome !');
			$downloadOther.attr('href', "https://chrome.google.com/webstore/detail/zoru/mikfeamnecigfmgjpbeedlaakhgmnief");
			break;
	}	
})(jQuery);