import {OvalSvgLoader} from "../components/svgs";
import {BiError} from "react-icons/bi";

function Loader({
    iconOnly=false,
    inline=false,
    textOnly=false,
    text="Loading",
    icon="oval"}) {

    const icons = {
        oval:<OvalSvgLoader />
    }

    if (iconOnly) return icons[icon]
    if (textOnly) return <div className={"text-center"}>{text}</div>
    if (inline && text !== "") return <div className={"text-center"}>{icons[icon]} {text}</div>
    if (!inline && text !== "") return <div className={"text-center"}><div>{icons[icon]}</div> <div>{text}</div></div>
}

function ErrorLoading({
    iconOnly=false,
    inline=false,
    textOnly=false,
    allowReload=true,
    text="Error",
    icon="error",
    tryAgainCallback=null}) {

    const handleTryAgain = () => {
        if (allowReload && !tryAgainCallback) window.location.reload(false)
        else if (tryAgainCallback) tryAgainCallback();
    }

    const icons = {
        error: <BiError onClick={handleTryAgain} className={"pointer"}/>
    }

    let reload;
    if (tryAgainCallback) {
        reload = <div className={"text-center"}><small className={"pointer"} onClick={handleTryAgain}>Try again</small></div>
    }
    if (iconOnly) return icons[icon]
    if (textOnly) return <div className={"text-center"}>{text}{reload}</div>
    if (inline && text !== "") return <div className={"text-center"}>{icons[icon]} {text} {reload}</div>
    if (!inline && text !== "") return <div className={"text-center"}><div>{icons[icon]}</div> <div>{text}</div> {reload}</div>

}

export {Loader, ErrorLoading}