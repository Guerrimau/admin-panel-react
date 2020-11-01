import { makeStyles } from "@material-ui/core/styles";
import { Height } from "@material-ui/icons";

export const useStyles = makeStyles((theme) => ({
    table: {
        margin: "0 15vw",
        marginBottom: "40px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    fab: {
        position: "fixed",
        bottom: "4%",
        right: "2%",
    },
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "5px",
        outline: "none",
        display: "flex",
        flexDirection: "column",
    },
    buttonProgress: {
        color: theme.palette.primary.main,
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
    inputMaterial: {
        width: "100%",
        marginBottom: "20px"
    },
    paperLogin: {
        width: "500px",
        height: "300px",
        padding: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    buttonLogin: {
        width: "100%",
        height: "50px"
    }
}));