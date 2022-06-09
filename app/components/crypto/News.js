import { StyleSheet, FlatList, Linking} from 'react-native'
import React from 'react'
import NewsItem from './NewsItem'; 
const News = ({newsItems}) => {
  const renderItem = ({item}) => (
    <NewsItem 
      news_url={item.news_url}
      image_url={item.image_url}
      title={item.title}
      text={item.text}
      source_name={item.source_name}
      date={item.date}
      sentiment= {item.sentiment}
      onPress={() => Linking.canOpenURL(item.news_url).then(() => {
        Linking.openURL(item.news_url);
      })}
    />
  );
  console.log(newsItems)
  return (
    <FlatList 
      keyExtractor={(item) => item.title}
      data = {newsItems}
      renderItem = {renderItem}
      //onRefresh={onRefresh}
      //refreshing={isFetching}
      initialNumToRender={7}
      //onEndReached={onEndReached}
    />
  )
}

export default News

const styles = StyleSheet.create({})