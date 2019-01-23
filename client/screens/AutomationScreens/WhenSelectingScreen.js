import React from 'react';
import { Picker, ScrollView, View, Dimensions } from 'react-native';
import Text from '../../components/StyledText';
import MySlider from '../../components/Slider';
import Icons from '../../constants/Icons'
import { Button, Divider, Overlay, Icon } from 'react-native-elements';
import { evaluableToSentence, commandToSentence } from "../../helper/BehaviorHelper"

export default class WhenSelectingScreen extends React.Component {

    constructor(props) {
        super(props)
        this.operatorToString = [
            { operator: ">=", name: this.props.t("superiorOrEqual") },
            { operator: "<=", name: this.props.t("inferiorOrEqual") },
            { operator: ">", name: this.props.t("superior") },
            { operator: "<", name: this.props.t("inferior") },
            { operator: "==", name: this.props.t("equal") },
            { operator: "!=", name: this.props.t("notEqual") }
        ]
        this.environmentVariables = this.props.navigation.state.params.environment_variables
        console.log(this.environmentVariables)
        this.order = this.props.navigation.state.params.order
        this.state = {
            theme: {
                current: {}
            },
            isAdvanced: false,
            evaluable: undefined,
            blockEdition: false,
            editingCase: {
                type: "block",
                valueType: this.environmentVariables[0].value.value_type,
                variable: this.environmentVariables[0],
                operator: this.environmentVariables[0].value.value_type === "Number" ? this.operatorToString[0].operator : "==",
                value: this.environmentVariables[0].value.value_type === "Number" ? Math.floor((this.environmentVariables[0].value.max + this.environmentVariables[0].value.min) / 2) : true
            },
            cases: [{ conditions: [] }]
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
            nextProps.navigation.setParams({
                title: nextProps.t('whenSelecting'),
                backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
                headerTintColor: nextProps.theme.current['headerTextBackground'],
            })
        }
        return { theme: nextProps.theme }
    }

    blockSelection(t, theme) {
        return (<View style={{ flex: 1 }}>
            <Picker
                selectedValue={this.state.editingCase.variable._id}
                itemStyle={{ height: 75 }}
                onValueChange={(itemValue, itemIndex) => {
                    const envVar = this.environmentVariables.find(envVar => envVar._id === itemValue)
                    this.setState({
                        editingCase: {
                            type: "block",
                            valueType: envVar.value.value_type,
                            variable: envVar,
                            operator: envVar.value.value_type === "Number" ? this.operatorToString[0].operator : "==",
                            value: envVar.value.value_type === "Number" ? Math.floor((envVar.value.max + envVar.value.min) / 2) : true
                        }
                    })
                }}>
                {this.environmentVariables.map(envVar =>
                    <Picker.Item key={envVar._id} label={envVar.name} value={envVar._id} />)}
            </Picker>
            <View style={{ flex: 1 }}>
                {
                    this.state.editingCase.variable
                        ? (() => {
                            const envVar = this.environmentVariables.find(envVar => envVar._id === this.state.editingCase.variable._id)
                            if (envVar.value.value_type === "Boolean") {
                                return <Button
                                    title={this.state.editingCase.value == true ? t('isdetected') : t('isnotdetected')}
                                    onPress={() => this.setState({
                                        editingCase: { ...this.state.editingCase, value: !this.state.editingCase.value }
                                    })}
                                />
                            }
                            else if (envVar.value.value_type === "Number") {
                                return <View>
                                    <Picker
                                        selectedValue={this.state.editingCase.operator}
                                        itemStyle={{ height: 75 }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.setState({ editingCase: { ...this.state.editingCase, operator: itemValue } })
                                        }}>
                                        {this.operatorToString.map(current =>
                                            <Picker.Item key={current.operator} label={current.name} value={current.operator} />)}
                                    </Picker>
                                    <MySlider
                                        originalValue={this.state.editingCase.value}
                                        minimumValue={envVar.value.min}
                                        maximumValue={envVar.value.max}
                                        step={envVar.value.step}
                                        onChange={val => this.setState({
                                            editingCase: { ...this.state.editingCase, value: Math.floor(val) }
                                        })}
                                    />
                                </View>
                            }
                        })()
                        : null
                }
            </View>
            <Button
                title={t("Validate")}
                onPress={() => this.state.isModifying
                    ? this.setState({ blockEdition: false, isModifying: false, cases: this.state.cases.map((current, i) => i === this.state.currentCase ? { ...current, conditions: current.conditions.map((condition, i2) => i2 === this.state.currentCondition ? this.state.editingCase : condition) } : current) })
                    : this.setState({ blockEdition: false, cases: this.state.cases.map((current, i) => i === this.state.currentCase ? { ...current, conditions: [...current.conditions, this.state.editingCase] } : current) })}
            />
        </View>)
    }

    createEvaluable(block1, block2, operator) {
        return {
            type: "expression",
            evaluable: [block1, block2],
            operator
        }
    }

    conditionToEvaluable(conditions) {
        if (conditions.length === 0) {
            return undefined
        }
        else if (conditions.length === 1) {
            return current.conditions[0]
        }
        else {
            return
        }
    }

    createFinalEvaluable() {
        this.state.cases.map(current => {
            if (current.conditions.length === 0) {
                return undefined
            }
            else if (current.conditions.length === 1) {
                return current.conditions[0]
            }
            else {

            }
        })
    }

    render() {
        const { t, theme } = this.props
        return <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }} >
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Button
                        title={t("Basic")}
                        buttonStyle={{ backgroundColor: 'transparent', borderColor: "black", borderRightWidth: .5, borderBottomWidth: .5, borderRadius: 0 }}
                        titleStyle={{ color: !this.state.isAdvanced ? this.props.theme.current["headerBackgroundDefault"] : this.props.theme.current["textColor"] }}
                        onPress={() => this.setState({ isAdvanced: false })}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        title={t("Advanced")}
                        buttonStyle={{ backgroundColor: 'transparent', borderColor: "black", borderBottomWidth: .5, borderRadius: 0 }}
                        titleStyle={{ color: this.state.isAdvanced ? this.props.theme.current["headerBackgroundDefault"] : this.props.theme.current["textColor"] }}
                        onPress={() => this.setState({ isAdvanced: true })}
                    />
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <ScrollView>
                    {
                        this.state.isAdvanced
                            ?
                            <View>
                                <Text h3 style={{ textAlign: "center" }}>Advanced</Text>
                            </View>
                            :
                            <View>
                                <Text h4 style={{ textAlign: "center", marginBottom: 5 }}>Add all the cases in which you want the order to be executed</Text>
                                {this.state.cases.map((current, i) =>
                                    <View key={"case" + i} style={{ flex: 1, alignItems: "stretch" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5, }}>
                                            <Text style={{ marginRight: 5, marginLeft: 10 }}>{i + 1}</Text>
                                            <View style={{ flex: 1 }}>
                                                {
                                                    current.conditions.map((condition, i2) =>
                                                        <View key={"condition" + i2} style={{ marginBottom: 5 }} >
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                                                                <Button
                                                                    containerStyle={{ flex: 4 }}
                                                                    buttonStyle={{
                                                                        backgroundColor: this.props.theme.current["grey"]
                                                                    }}
                                                                    title={evaluableToSentence(condition, t)}
                                                                    onPress={() => this.setState({
                                                                        blockEdition: true,
                                                                        isModifying: true,
                                                                        currentCase: i,
                                                                        currentCondition: i2,
                                                                        editingCase: condition
                                                                    })}
                                                                />
                                                                <Icon
                                                                    containerStyle={{ alignSelf: "center", flex: 1 }}
                                                                    name={Icons.removeUser.name}
                                                                    type={Icons.removeUser.type}
                                                                    size={50}
                                                                    color={this.props.theme.current["red"]}
                                                                    onPress={() =>
                                                                        this.setState({ cases: this.state.cases.map((current, i3) => i3 === i ? { ...current, conditions: current.conditions.filter((condition, i4) => i2 !== i4) } : current) })
                                                                    } />
                                                            </View>
                                                            {i2 !== current.conditions.length - 1 ?
                                                                <Text h4 style={{ alignSelf: "center" }}>{t("and")}</Text>
                                                                : null}
                                                        </View>
                                                    )
                                                }
                                                <Button
                                                    containerStyle={{
                                                        width: "90%",
                                                        alignSelf: "center"
                                                    }}
                                                    title="Add a condition"
                                                    onPress={() => this.setState({
                                                        blockEdition: true, currentCase: i, editingCase: {
                                                            type: "block",
                                                            valueType: this.environmentVariables[0].value.value_type,
                                                            variable: this.environmentVariables[0],
                                                            operator: this.environmentVariables[0].value.value_type === "Number" ? this.operatorToString[0].operator : "==",
                                                            value: this.environmentVariables[0].value.value_type === "Number" ? Math.floor((this.environmentVariables[0].value.max + this.environmentVariables[0].value.min) / 2) : true
                                                        }
                                                    })}
                                                />
                                            </View>
                                        </View>
                                        <Divider style={{ backgroundColor: 'lightgrey', width: "95%", alignSelf: "center", marginBottom: 5 }} />
                                        {i !== this.state.cases.length - 1 ?
                                            <Text h4 style={{ alignSelf: "center", marginBottom: 5 }}>{t("or")}</Text>
                                            : null}
                                    </View>
                                )}
                            </View>
                    }
                </ScrollView>
                <Button
                    containerStyle={{
                        width: "90%",
                        alignSelf: "center"
                    }}
                    title="Add a case"
                    onPress={() => this.setState({ cases: [...this.state.cases, { conditions: [] }] })}
                />
                <View style={{ marginTop: 5 }}>
                    <Divider style={{ backgroundColor: 'lightgrey', width: "95%", alignSelf: "center", marginBottom: 5 }} />
                    <View>
                        <Text h4 style={{ textAlign: "center" }}>{t('When')}</Text>
                        <Text style={{ textAlign: "center" }}>{(this.state.evaluable && evaluableToSentence(this.createFinalEvaluable(), t)) || "..."}</Text>
                        <Text h4 style={{ textAlign: "center" }}>{t('Then')}</Text>
                        <Text style={{ textAlign: "center" }}>{commandToSentence(this.order, t)}</Text>
                    </View>
                    <Button
                        title={t("Validate")}
                        onPress={() => this.props.navigation.navigate('WhenSelecting', { environment_variables: this.environment_variables, order: this.state.finalOrder })}
                    /></View>
            </View>
            <Overlay
                isVisible={this.state.blockEdition}
                height={Dimensions.get('screen').height / 2}
                windowBackgroundColor={theme.current['windowBackgroundColor']}
                overlayBackgroundColor={theme.current['overlayBackgroundColor']}
                transform={[
                    { translateY: - Dimensions.get('screen').height * 0.125 },
                ]}
                overlayStyle={{
                    borderWidth: .5,
                    borderColor: "black",
                    alignItems: "stretch"
                }}
                onBackdropPress={() => this.setState({ blockEdition: false })}
            >
                {this.blockSelection(t, theme)}
            </Overlay>
        </View>
    }
}