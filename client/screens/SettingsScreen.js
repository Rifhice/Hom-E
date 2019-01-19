import React from 'react';
import {
  TouchableHighlight,
  View,
  SectionList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import { Overlay, Button } from 'react-native-elements'
import Text from '../components/StyledText'

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      theme: {
        current: {}
      },
      languageModal: false,
      themeModal: false,
      deviceModal: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.theme.current) !== JSON.stringify(prevState.theme.current) && nextProps.navigation) {
      nextProps.navigation.setParams({
        title: nextProps.t('settings'),
        backgroundColor: nextProps.theme.current['headerBackgroundDefault'],
        headerTintColor: nextProps.theme.current['headerTextBackground']
      })
    }
    return { theme: nextProps.theme }
  }

  render() {
    const { t, i18n, theme, changeTheme } = this.props;
    const availableLanguages = Object.keys(i18n.store.data)
    const sections = [
      { data: [{ value: i18n.language, onPress: () => { this.setState({ languageModal: true }) } }], title: t('Language'), theme: theme },
      { data: [{ value: theme.selected, onPress: () => { this.setState({ themeModal: true }) } }], title: t('Theme'), theme: theme },
      { data: [{ value: "device 1", onPress: () => { this.setState({ deviceModal: true }) } }], title: t('Device'), theme: theme }
    ];
    return <View style={{ flex: 1, backgroundColor: this.props.theme.current['screenBackground'] }}>
      <SectionList
        style={{ flex: 1 }}
        renderItem={this._renderItem}
        renderSectionHeader={this._renderSectionHeader}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={ListHeader}
        sections={sections}
      >
      </SectionList>
      <Button
        buttonStyle={{
          backgroundColor: theme.current['red']
        }}
        title={t("Logout")}
        onPress={() => this.props.removeToken(this.props.userId)} />
      <Overlay
        isVisible={this.state.themeModal}
        height={Dimensions.get('screen').height / 2}
        windowBackgroundColor={theme.current['windowBackgroundColor']}
        overlayBackgroundColor={theme.current['overlayBackgroundColor']}
        transform={[
          { translateY: - Dimensions.get('screen').height * 0.125 },
        ]}
        overlayStyle={{
          borderWidth: .5,
          borderColor: "black"
        }}
        onBackdropPress={() => this.setState({ themeModal: false })}
      >
        <Text h2 style={{ alignSelf: "center", marginBottom: 5 }}>{t('Themes')}</Text>
        <ScrollView>
          {theme.availableTheme.map(current => <Button
            key={current}
            onPress={async () => {
              if (current !== theme.selected) {
                const information = await this.props.updateTheme(current, changeTheme)
                changeTheme(information.theme)
              }
              else {
                this.setState({ themeModal: false })
              }
            }}
            buttonStyle={{
              backgroundColor: current === theme.selected ? theme.current["green"] : theme.current["grey"],
              marginBottom: 5
            }}
            title={current} />)}
        </ScrollView>
      </Overlay>
      <Overlay
        isVisible={this.state.languageModal}
        height={Dimensions.get('screen').height / 2}
        windowBackgroundColor={theme.current['windowBackgroundColor']}
        overlayBackgroundColor={theme.current['overlayBackgroundColor']}
        transform={[
          { translateY: - Dimensions.get('screen').height * 0.125 },
        ]}
        overlayStyle={{
          borderWidth: .5,
          borderColor: "black"
        }}
        onBackdropPress={() => this.setState({ languageModal: false })}
      >
        <Text h2 style={{ alignSelf: "center", marginBottom: 5 }}>{t('Languages')}</Text>
        <ScrollView>
          {availableLanguages.map(current => <Button
            key={current}
            onPress={async () => {
              if (current !== i18n.language) {
                const information = await this.props.updateLanguage(current)
                i18n.changeLanguage(information.language)
              }
              else {
                this.setState({ languageModal: false })
              }
            }}
            buttonStyle={{
              backgroundColor: current === i18n.language ? theme.current["green"] : theme.current["grey"],
              marginBottom: 5
            }}
            title={current} />)}
        </ScrollView>
      </Overlay>
      <Overlay
        isVisible={this.state.deviceModal}
        height={Dimensions.get('screen').height / 2}
        windowBackgroundColor={theme.current['windowBackgroundColor']}
        overlayBackgroundColor={theme.current['overlayBackgroundColor']}
        transform={[
          { translateY: - Dimensions.get('screen').height * 0.125 },
        ]}
        overlayStyle={{
          borderWidth: .5,
          borderColor: "black"
        }}
        onBackdropPress={() => this.setState({ deviceModal: false })}
      >
        <Text h2 style={{ alignSelf: "center", marginBottom: 5 }}>{t('Devices')}</Text>
        <ScrollView>
          {this.props.user.devices.map(current => <Button
            key={current._id}
            onPress={async () => {
              if (current._id !== this.props.user.currentDevice._id) {
                await this.props.updateCurrentDevice(this.props.user.currentDevice._id, current._id)
              }
              else {
                this.setState({ deviceModal: false })
              }
            }}
            buttonStyle={{
              backgroundColor: current._id === this.props.user.currentDevice._id ? theme.current["green"] : theme.current["grey"],
              marginBottom: 5
            }}
            title={current._id} />)}
        </ScrollView>
      </Overlay>
    </View>
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} theme={section.theme} />;
  };

  _renderItem = ({ item }) => {
    if (item.type === 'color') {
      return (
        <SectionContent>
          {item.value && <Color value={item.value} />}
        </SectionContent>
      );
    } else {
      return (
        <SectionContent
          onPress={item.onPress}>
          <Text style={styles.sectionContentText}>
            {item.value}
          </Text>
        </SectionContent>
      );
    }
  };

}
const ListHeader = () => {
  const { manifest } = Constants;

  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleIconContainer}>
        <AppIconPreview iconUrl={manifest.iconUrl} />
      </View>

      <View style={styles.titleTextContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {manifest.name}
        </Text>

        <Text style={styles.slugText} numberOfLines={1}>
          {manifest.slug}
        </Text>

        <Text style={styles.descriptionText}>
          {manifest.description}
        </Text>
      </View>
    </View>
  );
};

const SectionHeader = ({ title, theme }) => {
  return (
    <View style={{ ...styles.sectionHeaderContainer, backgroundColor: theme.current["secondaryScreenBackground"] }}>
      <Text style={styles.sectionHeaderText}>
        {title}
      </Text>
    </View>
  );
};

const SectionContent = props => {
  return (
    <TouchableHighlight
      onPress={props.onPress}>
      <View style={styles.sectionContentContainer}>
        {props.children}
      </View>
    </TouchableHighlight>
  );
};

const AppIconPreview = ({ iconUrl }) => {
  if (!iconUrl) {
    iconUrl =
      'https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png';
  }

  return (
    <Image
      source={{ uri: iconUrl }}
      style={{ width: 64, height: 64 }}
      resizeMode="cover"
    />
  );
};

const Color = ({ value }) => {
  if (!value) {
    return <View />;
  } else {
    return (
      <View style={styles.colorContainer}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <View style={styles.colorTextContainer}>
          <Text style={styles.sectionContentText}>
            {value}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  titleIconContainer: {
    marginRight: 15,
    paddingTop: 2,
  },
  sectionHeaderContainer: {
    backgroundColor: '#fbfbfb',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ededed',
  },
  sectionHeaderText: {
    fontSize: 14,
  },
  sectionContentContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  sectionContentText: {
    color: '#808080',
    fontSize: 14,
  },
  nameText: {
    fontWeight: '600',
    fontSize: 18,
  },
  slugText: {
    color: '#a39f9f',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 6,
    color: '#4d4d4d',
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 17,
    height: 17,
    borderRadius: 2,
    marginRight: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  colorTextContainer: {
    flex: 1,
  },
});
