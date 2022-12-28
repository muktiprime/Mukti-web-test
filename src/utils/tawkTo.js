export const  tawkToLoadScripts=async ()=> {
    // var Tawk_API = Tawk_API || {};

    // var Tawk_LoadStart = new Date();

    await (function () {
        var s1 = document.createElement('script'),
            s0 = document.getElementsByTagName('script')[0];
        s1.async = true;
        s1.src = `https://embed.tawk.to/626909a0b0d10b6f3e6f9460/1g1l4r7nq`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}

