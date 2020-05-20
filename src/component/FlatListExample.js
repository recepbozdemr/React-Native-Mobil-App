import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList,ActivityIndicator, Image, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import ActivityIndicatorViewNativeComponent
    from 'react-native/Libraries/Components/ActivityIndicator/ActivityIndicatorViewNativeComponent';

export default class FlatListExample extends Component {
    state = {
        text: '',
        contacts: [],
page:1,
        all: [],
        loading:true,
        refreshing:false
    };

    componentDidMount() {
        this.getContacts();
    }

    getContacts = async () => {

        const {data: {Countries}}  = await axios.get('https://api.covid19api.com/summary');
       this.setState({

           contacts: Countries,
           all: Countries,
            loading:false
       });


    };
    onRefresh = ()  => {
        this.setState({

          page:1,
        },
            () => {
            this.getContacts();

            } );

};
    renderContactsItem = ({item, index}) => {
        return (
            <TouchableOpacity style={[styles.itemContainer, {backgroundColor: index % 2 === 1 ? '#fafafa' : ''}]}>

                <View style={styles.textContainer}>

                    <Text style={styles.name}><Text style={styles.baslik}>Country:</Text>{item.Country}</Text>
                    <Text style={styles.name}>Daily Deaths:{item.NewDeaths}</Text>
                    <Text style={styles.name}>Total Deaths:{item.TotalDeaths}</Text>
                    <Text style={styles.name}>Total  Recovered:{item.TotalRecovered}</Text>

                </View>
            </TouchableOpacity>
        )
    };

    searchFilter = text => {
        const newData = this.state.all.filter(item => {
            const listItem = `${item.Country.toLowerCase()}`;

            return listItem.indexOf(text.toLowerCase()) > -1;
        });

        this.setState({
            contacts: newData,
        });
    };

    renderHeader = () => {
        const {text} = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={text => {
                        this.setState({
                            text,
                        });

                        this.searchFilter(text);
                    }}
                    value={text}
                    placeholder="Search..."
                    style={styles.searchInput}/>
            </View>
        )
    };
renderFooter  = ()  => {
    if (!this.state.loading) return null;
  return(
      <View>
          <ActivityIndicator size="large" />

      </View>

  )


};
    render() {
        return (
            <FlatList
                ListFooterComponent={this.renderFooter}
                ListHeaderComponent={this.renderHeader()}
                renderItem={this.renderContactsItem}
                onEndReachedThreshold={0}
                data={this.state.contacts}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}/>
        );
    }
}


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    textContainer: {
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 16
    },
    baslik: {
        fontSize: 18,
        fontWeight:'bold'
    },
    searchContainer: {
        padding: 10
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        padding: 10
    }
});
