import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Queue, Star } from 'phosphor-react-native';

import { useTheme } from 'styled-components/native';

import { Favorites } from '@screens/Favorites';
import { Movies } from '@screens/Movies';
import { SelectedMovie } from '@screens/SelectedMovie';

import Route from './enums';

type AppRoutes = {
  Movies: undefined;
  Favorites: undefined;
  SelectedMovie: {
    selectedMovieId: number;
  };
};

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.gray[700] }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name={Route.MOVIES}
          component={Movies}
          options={{
            tabBarIcon: ({ color }) => (
              <Queue color={color} weight="fill" size={theme.sizes.large} />
            ),
            tabBarInactiveTintColor: theme.colors.gray[200],
            tabBarActiveTintColor: theme.colors.red[400],
          }}
        />
        <Tab.Screen
          name={Route.FAVORITES}
          component={Favorites}
          options={{
            tabBarIcon: ({ color }) => (
              <Star color={color} weight="fill" size={theme.sizes.large} />
            ),
            tabBarInactiveTintColor: theme.colors.gray[200],
            tabBarActiveTintColor: theme.colors.red[400],
          }}
        />
        <Tab.Screen
          name={Route.SELECTED_MOVIE}
          component={SelectedMovie}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </View>
  );
}
