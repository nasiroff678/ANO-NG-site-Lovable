import { useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

export const Analytics = () => {
    const { settings } = useSettings();

    useEffect(() => {
        // Only inject analytics if the user has consented to cookies
        const cookieConsent = localStorage.getItem("cookieConsent");
        if (cookieConsent !== "true") return;

        // Helper to find a setting value by key
        const getSetting = (key: string) => {
            const setting = settings?.find((s) => s.key === key);
            return setting?.value;
        };

        const ymId = getSetting('yandex_metrika_id');
        const gaId = getSetting('google_analytics_id');

        // Inject Yandex Metrika
        if (ymId && !document.getElementById('yandex-metrika-script')) {
            const script = document.createElement('script');
            script.id = 'yandex-metrika-script';
            script.type = 'text/javascript';
            script.async = true;
            script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${ymId}, "init", {
             clickmap:true,
             trackLinks:true,
             accurateTrackBounce:true
        });
      `;
            document.head.appendChild(script);

            const noscript = document.createElement('noscript');
            noscript.id = 'yandex-metrika-noscript';
            noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${ymId}" style="position:absolute; left:-9999px;" alt="" /></div>`;
            document.body.appendChild(noscript);
        }

        // Inject Google Analytics
        if (gaId && !document.getElementById('google-analytics-script')) {
            const gtmScript = document.createElement('script');
            gtmScript.id = 'google-analytics-script';
            gtmScript.async = true;
            gtmScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(gtmScript);

            const inlineScript = document.createElement('script');
            inlineScript.id = 'google-analytics-inline';
            inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
            document.head.appendChild(inlineScript);
        }

        // Cleanup function if necessary (rarely needed for analytics but good practice if component unmounts and consent changes)
        return () => {
            // Typically don't remove analytics scripts once injected unless explicitly requested, 
            // as they rely on window objects that might already be initialized.
        };

    }, [settings]);

    return null; // This component doesn't render anything
};
