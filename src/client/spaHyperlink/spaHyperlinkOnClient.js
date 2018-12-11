import { softReload } from "../../client.start";

export function spaHyperlinkOnClient(e, url) {
    e.preventDefault();
    history.pushState(null, null, url);
    softReload();
}