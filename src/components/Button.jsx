import '../components/css/Button.css'

export default function Button({children, variant, size, ...props}){


    return(
        <button {...props} className={`button ${variant === "outline" ? "outline" : ""} ${
            size === "small" ? "small" : ""}`}>
            {children}
        </button>
    )
}