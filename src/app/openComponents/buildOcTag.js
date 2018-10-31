import qs from 'query-string'

export const buildOcTag = ({name, baseUrl, version, parameters, lang}) => {
    if (process.env.IS_BROWSER) {
        return window.oc.build({name, baseUrl, version, parameters})
    } else {
        const href = `${baseUrl}/${name}/${version}?${qs.stringify({
            ...parameters,
            __ocAcceptLanguage: lang
        })}`;
        return `<oc-component href="${href.replace('"', '&quot;')}"></oc-component>`
    }
}