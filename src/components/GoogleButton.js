import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { View } from "react-native";
import { googleLogin } from "../redux/reducers/user/api";
import { useDispatch } from "react-redux";
import WEB_API_CLIENT from "@env";
GoogleSignin.configure({
    webClientId: WEB_API_CLIENT,
    scopes: [
        'https://www.googleapis.com/auth/user.addresses.read',
        'https://www.googleapis.com/auth/user.gender.read',
        'https://www.googleapis.com/auth/drive'
    ],
    offlineAccess: true,
});

export default function GoogleButton() {
    const dispatch = useDispatch();
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        let signInResult;
        try {
            signInResult = await GoogleSignin.signIn();
        } catch (error) {
            console.error("roor ",error);
        }
        // Try the new style of google-sign in result, from v13+ of that module
        let idToken = signInResult.data?.idToken;
        if (!idToken) {
            // if you are using older versions of google-signin, try old style result
            idToken = signInResult.idToken;
        }
        if (!idToken) {
            throw new Error('No ID token found');
        }
        console.log("masuk sini nih 1")
        dispatch(googleLogin({idToken}))
        console.log("masuk sini nih 2")
    }

    return (
        <View>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={onGoogleButtonPress}
                // disabled={isInProgress}
            />
        </View>
    )
}