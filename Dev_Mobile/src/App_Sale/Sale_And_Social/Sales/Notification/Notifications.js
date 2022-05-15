import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
const str = "Ở SEA Games 30 tại Philippines, kickboxing Việt Nam về nhất toàn đoàn với 4 HC vàng. Nhưng khi kickboxing có cơ hội trở thành môn thể thao Olympic, các đại diện Đông Nam Á bắt đầu tập trung xây dựng đội tuyển để thi quốc tế, và SEA Games 31 tại Việt Nam chính là bàn đạp đầu tiên. Thực tế cho thấy, cuộc đua số một ở bộ môn này đang là cuộc cạnh tranh gắt gao. Trong ngày thi đấu cuối, Thái Lan, Philippines cùng góp mặt ở sáu trận chung kết, nhiều hơn một trận so với chủ nhà Việt NamỞ SEA Games 30 tại Philippines, kickboxing Việt Nam về nhất toàn đoàn với 4 HC vàng. Nhưng khi kickboxing có cơ hội trở thành môn thể thao Olympic, các đại diện Đông Nam Á bắt đầu tập trung xây dựng đội tuyển để thi quốc tế, và SEA Games 31 tại Việt Nam chính là bàn đạp đầu tiên. Thực tế cho thấy, cuộc đua số một ở bộ môn này đang là cuộc cạnh tranh gắt gao. Trong ngày thi đấu cuối, Thái Lan, Philippines cùng góp mặt ở sáu trận chung kết, nhiều hơn một trận so với chủ nhà Việt NamỞ SEA Games 30 tại Philippines, kickboxing Việt Nam về nhất toàn đoàn với 4 HC vàng. Nhưng khi kickboxing có cơ hội trở thành môn thể thao Olympic, các đại diện Đông Nam Á bắt đầu tập trung xây dựng đội tuyển để thi quốc tế, và SEA Games 31 tại Việt Nam chính là bàn đạp đầu tiên. Thực tế cho thấy, cuộc đua số một ở bộ môn này đang là cuộc cạnh tranh gắt gao. Trong ngày thi đấu cuối, Thái Lan, Philippines cùng góp mặt ở sáu trận chung kết, nhiều hơn một trận so với chủ nhà Việt NamỞ SEA Games 30 tại Philippines, kickboxing Việt Nam về nhất toàn đoàn với 4 HC vàng. Nhưng khi kickboxing có cơ hội trở thành môn thể thao Olympic, các đại diện Đông Nam Á bắt đầu tập trung xây dựng đội tuyển để thi quốc tế, và SEA Games 31 tại Việt Nam chính là bàn đạp đầu tiên. Thực tế cho thấy, cuộc đua số một ở bộ môn này đang là cuộc cạnh tranh gắt gao. Trong ngày thi đấu cuối, Thái Lan, Philippines cùng góp mặt ở sáu trận chung kết, nhiều hơn một trận so với chủ nhà Việt NamỞ SEA Games 30 tại Philippines, kickboxing Việt Nam về nhất toàn đoàn với 4 HC vàng. Nhưng khi kickboxing có cơ hội trở thành môn thể thao Olympic, các đại diện Đông Nam Á bắt đầu tập trung xây dựng đội tuyển để thi quốc tế, và SEA Games 31 tại Việt Nam chính là bàn đạp đầu tiên. Thực tế cho thấy, cuộc đua số một ở bộ môn này đang là cuộc cạnh tranh gắt gao. Trong ngày thi đấu cuối, Thái Lan, Philippines cùng góp mặt ở sáu trận chung kết, nhiều hơn một trận so với chủ nhà Việt Nam 1111 oooooooooooooooooooooooooooooooooooooooooooooooooooo";

const HEADER_EXPANDED_HEIGHT = 250;
const HEADER_COLLAPSED_HEIGHT = 60;
const scrollY = new Animated.Value(0);
const scrollX = new Animated.Value(1);

const { width: SCREEN_WIDTH } = Dimensions.get("screen")

const App = () => {
  

    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    });
    const headerTitleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    const heroTitleOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const headerTitle = 'HEADER'

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Text style={{textAlign: 'center', fontSize: 18, color: 'black', marginTop: 28, opacity: headerTitleOpacity}}>{headerTitle}</Animated.Text>
        <ScrollView>
          <Animated.Text style={{textAlign: 'center', fontSize: 26, color: 'black', marginTop: 100, opacity: heroTitleOpacity}}>{headerTitle}</Animated.Text>
        </ScrollView>
        </Animated.View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  y: scrollY,
                  x: scrollX
                }
              }
            }])
          }
          >
          <Text style={styles.title}>This is Title</Text>
          <Text style={styles.content}>{str}</Text>
        </ScrollView>
      </View>
    );
  
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: HEADER_EXPANDED_HEIGHT
  },
  header: {
    backgroundColor: 'lightblue',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999
  },
  title: {
    marginVertical: 16,
    color: "black",
    fontWeight: "bold",
    fontSize: 24
  },
  content:{
    fontSize :25
  }
});