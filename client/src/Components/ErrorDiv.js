import ErrGuider from "../assets/guider/err_guider.png";

export default function ErrorDiv({ isBck, wid, hei }) {
    return(
    <div
        style={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isBck ? "rgb(230, 230, 230)" : "rgba(230, 230, 230, 0)",
                width: wid,
                height: hei,
            }
        }
    >
        <img src={ErrGuider} />
    </div>
    )

}