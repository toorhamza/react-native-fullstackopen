import React, { useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useHistory } from "react-router-native";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const sortBy = this.props.sortBy;
    const setSortBy = this.props.setSortBy;
    const searchValue = this.props.searchValue;
    const onChangeSearch = this.props.onChangeSearch;    
    // ...
  
    return (
<View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchValue}
      />
      <RNPickerSelect
        onValueChange={(value) => setSortBy(value)}
        items={[
          { label: "Highest Rated", value: "highestRated" },
          { label: "Lowest Rated", value: "lowestRated" },
          { label: "Latest Review", value: "latestReview" },
        ]}
        value={sortBy}
      />
    </View>      );
  };

  render() {
    const repositoryNodes = this.props.repositories
    ? this.props.repositories.edges.map((edge) => edge.node)
    : [];
    return (
      <FlatList
      ListHeaderComponent={this.renderHeader}
      data={repositoryNodes}
      ItemSeparatorComponent={this.props.ItemSeparator}
      renderItem={(item) => (
        <TouchableOpacity
          onPress={() => this.props.history.push(`/repository/${item.item.id}`)}
        >
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState("latestReview");
  const [searchValue, setSearchValue] = useState("");
  const [searchKeyword] = useDebounce(searchValue, 500);
  const { repositories } = useRepositories({ sortBy, searchKeyword });
  const history = useHistory();


  const onChangeSearch = (query) => setSearchValue(query);
  const ItemSeparator = () => <View style={styles.separator} />;


  return (
    <RepositoryListContainer
      repositories={repositories}
      setSortBy={setSortBy}
      sortBy={sortBy}
      onChangeSearch={onChangeSearch}
      searchValue={searchValue}
      history={history}
      ItemSeparator={ItemSeparator}
    />
  );
};

export default RepositoryList;
