import React, { useLayoutEffect } from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favorites from "../screens/Favorites";
import { RouteProp } from "@react-navigation/core";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

const RootTab = createBottomTabNavigator<RootTabParamList>();

type Props = {
  navigation: BottomTabNavigationProp<RootTabParamList, "Movie">;
  route: RouteProp<RootTabParamList, "Movie">;
};

const TabNavigator: React.FC<Props> = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? "Movie";
    navigation.setOptions({
      title,
    });
  }, [route]);
  return (
    <RootTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === "ios" ? "ios-" : "md-";
          switch (route.name) {
            case "Movie":
              iconName += "film";
              break;
            case "Tv":
              iconName += "tv";
              break;
            case "Search":
              iconName += "search";
              break;
            case "Favorites":
              iconName += "heart";
              break;
          }
          return (
            <Ionicons
              name={iconName as React.ComponentProps<typeof Ionicons>["name"]}
              color={focused ? "white" : "grey"}
              size={24}
            />
          );
        },
      })}
      initialRouteName="Movie"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
          borderTopColor: "transparent",
        },
        activeTintColor: "white",
        inactiveTintColor: "grey",
        showLabel: false,
      }}
    >
      <RootTab.Screen name="Movie" component={Movie} />
      <RootTab.Screen name="Tv" component={Tv} />
      <RootTab.Screen name="Search" component={Search} />
      <RootTab.Screen name="Favorites" component={Favorites} />
    </RootTab.Navigator>
  );
};

export default TabNavigator;