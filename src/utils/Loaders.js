import {OvalSvgLoader} from "../components/svgs";

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

export {Loader}