import { Platform } from "react-native"

export default {
    text:{
        fontSize:17,
        fontFamily:Platform.OS==="android" ? "Roboto" : "Avenir",
    },
    colors:{
        primary:"#1877F2",
        primaryLight:"#62a2f5",
        lightGrey:"#6e6e6e"
    },
    image:{
        noProfilePicture:"https://res.cloudinary.com/wings05/image/upload/v1625411692/44884218_345707102882519_2446069589734326272_n_u82kmh.jpg"
    }
}