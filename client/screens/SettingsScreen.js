import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  SectionList,
  StyleSheet,
  Image
} from 'react-native';
import { Constants } from 'expo';
import Dialog, { DialogContent, DialogButton, DialogTitle } from 'react-native-popup-dialog';

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
      { data: [{ value: "en", onPress: () => { this.setState({ languageModal: true }) } }], title: 'Language' },
      { data: [{ value: "regular", onPress: () => { this.setState({ themeModal: true }) } }], title: 'Theme' },
      { data: [{ value: "device 1", onPress: () => { this.setState({ deviceModal: true }) } }], title: 'Devices' }
    ];
    return <View style={styles.container}>
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
      <Text>Logout</Text>
      <Dialog
        visible={this.state.themeModal}
        dialogTitle={<DialogTitle title="Dialog Title" />}
        onTouchOutside={() => {
          this.setState({ themeModal: false });
        }}
        actions={[
          <DialogButton
            text="CANCEL"
            onPress={() => { this.setState({ themeModal: false }) }}
          />,
          <DialogButton
            text="OK"
            onPress={() => { }}
          />,
        ]}
      >
        <DialogContent>
          {theme.availableTheme.map(current => <Text style={{ backgroundColor: current === theme.selected ? "green" : "" }}>{current}</Text>)}
        </DialogContent>
      </Dialog>
      <Dialog
        visible={this.state.languageModal}
        dialogTitle={<DialogTitle title="Dialog Title" />}
        onTouchOutside={() => {
          this.setState({ languageModal: false });
        }}
        actions={[
          <DialogButton
            text="CANCEL"
            onPress={() => { this.setState({ languageModal: false }) }}
          />,
          <DialogButton
            text="OK"
            onPress={() => { }}
          />,
        ]}
      >
        <DialogContent>
          {availableLanguages.map(current => <Text style={{ backgroundColor: current === i18n.language ? "green" : "" }}>{current}</Text>)}
        </DialogContent>
      </Dialog>
      <Dialog
        visible={this.state.deviceModal}
        dialogTitle={<DialogTitle title="Dialog Title" />}
        onTouchOutside={() => {
          this.setState({ deviceModal: false });
        }}
        actions={[
          <DialogButton
            text="CANCEL"
            onPress={() => { this.setState({ deviceModal: false }) }}
          />,
          <DialogButton
            text="OK"
            onPress={() => { }}
          />,
        ]}
      >
        <DialogContent>
          {theme.availableTheme.map(current => <Text style={{ backgroundColor: current === theme.selected ? "green" : "" }}>{current}</Text>)}
        </DialogContent>
      </Dialog>
    </View>
    /* 
    <View>
      <TouchableHighlight
        onPress={() => {
          this.props.showNotification({
            title: 'You pressed it!',
            message: 'The notification has been triggered',
            onPress: () => console.log("che")
          })
          i18n.changeLanguage('fr')
        }}
      >
        <Text>{'yo'}</Text>
      </TouchableHighlight>
      <ExpoConfigView />
    </View>)*/
  }

  _renderSectionHeader = ({ section }) => {
    return <SectionHeader title={section.title} />;
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

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.sectionHeaderContainer}>
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
