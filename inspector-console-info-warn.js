$(document).ready(function() {
    var displayMessage = function(message, type) {
            var newMessage, consoleText,
                consoleOutputElm = $('#consoleOutputContentElm'),
                messageType = (type === 'INFO') ? 'console-info' : 'console-warn';
            consoleText = consoleOutputElm.html();
            newMessage = $('<p class="messages ' + messageType + '"><span class="messageText">' +
                message + '</span></p>');
            newMessage.append($('<span class="timestamp">' + new Date().toISOString() + '</span>'));
            consoleOutputElm.prepend(newMessage);
        };

    function init() {
        var consoleElm = '<div class="consoleArea">' +
                         '<button class="tooltip" id="clearConsole" type="button" title="Clear">×</button>' +
                         '<pre id="consoleOutputContentElm"></pre>' +
                         '</div>',
        _consoleInfoSpy = window.console.info,
        _consoleWarnSpy = window.console.warn;

        window.console.info = function(infoMessage) {
            displayMessage(infoMessage, 'INFO');
            _consoleInfoSpy.apply(console, arguments);
        };
        window.console.warn = function(warnMessage) {
            displayMessage(warnMessage, 'WARN');
            _consoleWarnSpy.apply(console, arguments);
        };
        // Add console Elm to end of container;
        $('#container').append(consoleElm);
    }

    init();
    /*
     * On click of clear button, clear the console output element content
     *
     * no @return
     */
    $('#clearConsole').on('click', function() {
        var consoleEl = $('#consoleOutputContentElm');
        consoleEl.html('');
    });

});
