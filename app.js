function stellarContactsGo() {
    const reg = /G[A-Z2-7]{55}/;

    let contacts;
    chrome.storage.sync.get({
        contacts: '{}'
    }, function(items) {
        contacts = JSON.parse(items.contacts.replace(/^\s+\/\/.*\n/gm, ''));
    });

    if (location.host === "stellar.expert") {
        jQuery('.account-address').each(function () {
            const $element = jQuery(this);
            const key = $element.attr('title');
            if (contacts[key]) {
                $element.find('.account-pubkey').text(contacts[key]);
            }
            // console.log($element.text());
        });
    } else if (location.host === "mtl.ergvein.net") {
        jQuery('.signer-key').each(function () {
            const $element = jQuery(this);
            const key = $element.attr('href');
            const match = reg.exec(key);
            if (match[0] && contacts[match[0]]) {
                $element.text(contacts[match[0]]);
            }
        });
    } else if (location.host === "ncrashed.github.io") {
        jQuery('a').each(function () {
            const $element = jQuery(this);
            const match = reg.exec($element.attr('href'));
            if (match && match[0] && contacts[match[0]]) {
                $element.text(contacts[match[0]]);
            }
        });
    } else if (location.toString().indexOf("https://github.com/montelibero-org/") === 0) {
        jQuery('.type-json .blob-code span').each(function () {
            const $element = jQuery(this);
            $element.html($element.html().replace(reg, function (match) {
                console.log(match);
                if (match && contacts[match]) {
                    return contacts[match];
                } else return match;
            }))
        });
    } else if (location.host === "laboratory.stellar.org") {
        jQuery('.EasySelect code').each(function () {
            const $element = jQuery(this);
            $element.text($element.text().replace(reg, function (match) {
                console.log(match);
                if (match && contacts[match]) {
                    return contacts[match];
                } else return match;
            }))
        });
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    stellarContactsGo();
});
