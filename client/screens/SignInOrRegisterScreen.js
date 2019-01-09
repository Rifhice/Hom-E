import React from 'react';
import { View, KeyboardAvoidingView, Image, TextInput, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'

export default class SignInScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isRegistering: false,
            loginUsernameOrMail: "",
            loginPassword: "",
            registrationEmail: "",
            registrationUsername: "",
            registrationPassword: "",
            registrationConfirmPassword: "",
            registrationEmailError: "",
            registrationUsernameError: "",
            registrationPasswordError: "",
            registrationRequestFailed: "",
            invalid: false
        }
    }

    signInScreen() {
        return <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                <Image
                    style={{ width: 90, height: 90, marginBottom: 25 }}
                    source={require('../assets/images/logo.png')}
                />
                <View style={{ marginBottom: 5 }}>
                    <TextInput
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 5, borderColor: this.state.invalid ? "red" : "black" }}
                        onFocus={() => this.setState({ invalid: false })}
                        placeholder="Username"
                        onChangeText={(text) => this.setState({ usernameOrMail: text })}
                        value={this.state.usernameOrMail}
                    />
                    <TextInput
                        secureTextEntry
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderColor: this.state.invalid ? "red" : "black" }}
                        onFocus={() => this.setState({ invalid: false })}
                        placeholder="Password"
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                </View>
                <Button
                    title="Log in!"
                    buttonStyle={{
                        backgroundColor: "green"
                    }}
                    onPress={async () => {
                        const token = await this.props.login({ 'usernameOrMail': this.state.usernameOrMail, 'password': this.state.password })
                        if (!token) {
                            this.setState({ invalid: true })
                        }
                    }} />
            </KeyboardAvoidingView>
            <Button
                title="Create an account!"
                buttonStyle={{
                    backgroundColor: "green"
                }}
                onPress={() => {
                    this.setState({ isRegistering: true })
                }} />
        </View>
    }

    checkRegistration() {
        const errors = []
        /*if (!this.state.registrationEmail.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/))
            errors.push(this.setState({ registrationEmailError: "Email malformed!" }))*/
        if (this.state.registrationUsername.length < 6)
            errors.push(this.setState({ registrationUsernameError: "Username too short!" }))
        /*if (!this.state.registrationPassword.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/))
            errors.push(this.setState({ registrationPasswordError: "Password malformed!" }))
        else */if (this.state.registrationPassword !== this.state.registrationConfirmPassword)
            errors.push(this.setState({ registrationPasswordError: "Password mismatch!" }))
        return errors.length !== 0
    }

    registrationScreen() {
        return <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center", alignItems: "center" }} behavior="padding" enabled>
                <Image
                    style={{ width: 90, height: 90, marginBottom: 25 }}
                    source={require('../assets/images/logo.png')}
                />
                <Text style={{ color: "red" }} >{this.state.registrationRequestFailed}</Text>
                <View style={{ marginBottom: 5 }}>
                    <TextInput
                        onFocus={() => this.setState({ registrationEmailError: "" })}
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderColor: this.state.registrationEmailError ? "red" : "black" }}
                        placeholder="Email"
                        onChangeText={(text) => this.setState({ registrationEmail: text })}
                        value={this.state.registrationEmail}
                    />
                    <Text style={{ color: "red" }} >{this.state.registrationEmailError}</Text>
                    <TextInput
                        onFocus={() => this.setState({ registrationUsernameError: "" })}
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderColor: this.state.registrationUsernameError ? "red" : "black" }}
                        placeholder="Username"
                        onChangeText={(text) => this.setState({ registrationUsername: text })}
                        value={this.state.registrationUsername}
                    />
                    <Text style={{ color: "red" }} >{this.state.registrationUsernameError}</Text>
                    <TextInput
                        onFocus={() => this.setState({ registrationPasswordError: "" })}
                        secureTextEntry
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderColor: this.state.registrationPasswordError ? "red" : "black" }}
                        placeholder="Password"
                        onChangeText={(text) => this.setState({ registrationPassword: text })}
                        value={this.state.registrationPassword}
                    />
                    <TextInput
                        onFocus={() => this.setState({ registrationPasswordError: "" })}
                        secureTextEntry
                        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, borderColor: this.state.registrationPasswordError ? "red" : "black" }}
                        placeholder="Confirm password"
                        onChangeText={(text) => this.setState({ registrationConfirmPassword: text })}
                        value={this.state.registrationConfirmPassword}
                    />
                    <Text style={{ color: "red" }} >{this.state.registrationPasswordError}</Text>
                </View>
                <Button
                    title="Register!"
                    buttonStyle={{
                        backgroundColor: "green"
                    }}
                    onPress={async () => {
                        const hasErrors = await this.checkRegistration()
                        if (!hasErrors) {
                            const hasFailed = await this.props.register({
                                email: this.state.registrationEmail,
                                username: this.state.registrationUsername,
                                password: this.state.registrationPassword,
                                language: "fr"
                            })
                            if (hasFailed) {
                                this.setState({ registrationRequestFailed: hasFailed })
                            }
                        }
                    }} />
            </KeyboardAvoidingView>
            <Button
                title="Sign in!"
                buttonStyle={{
                    backgroundColor: "green"
                }}
                onPress={() => {
                    this.setState({ isRegistering: false })
                }} />
        </View>
    }

    render() {
        const { i18n, changeTheme } = this.props;
        return <ImageBackground source={require('../assets/images/home-screen.png')} blurRadius={3} style={{ width: '100%', height: '100%', alignSelf: "center" }}>
            {this.state.isRegistering
                ? this.registrationScreen()
                : this.signInScreen()}
        </ImageBackground>
    }
}