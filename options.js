function save_options() {
    var contacts = document.getElementById('contacts').value;
    var status = document.getElementById('status');
    var test = false;
    try {
        test = JSON.parse(contacts.replace(/^\s+\/\/.*\n/gm, ''));
    } catch (e) {
        status.textContent = 'JSON error. Not saved. ' + e.message;
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    }
    if (test) {
        chrome.storage.sync.set({
            contacts: contacts
        }, function() {
            // Update status to let user know options were saved.
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 1000);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get({
        contacts: '{\n\t"GADDRESS" : "Name"\n}\n'
    }, function(items) {
        document.getElementById('contacts').value = items.contacts;
    });
});

document.getElementById('save').addEventListener('click', save_options);
