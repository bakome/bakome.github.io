window.addEventListener('load', function () {
    const switcher = document.querySelectorAll('.uk-switcher');

    for (let index = 0; index < switcher.length; index++) {
        let switcherTabs = switcher[index].querySelectorAll('li');

        if (switcherTabs) {
            switcherTabs[0].className = "uk-active";
        }
    }
});
