import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Favorites } from '@screens/Favorites';
import { Movies } from '@screens/Movies';
import { SelectedMovie } from '@screens/SelectedMovie';
import { Queue, Star } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';

import Route from './enums';

type AppRoutes = {
  Movies: undefined;
  Favorites: undefined;
  SelectedMovie: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();

  return (
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
          tabBarIcon: () => (
            <Queue color={theme.colors.red[400]} weight="fill" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name={Route.FAVORITES}
        component={Favorites}
        options={{
          tabBarIcon: () => <Star color="#ff5757" weight="fill" size={32} />,
        }}
      />
      <Tab.Screen
        name={Route.SELECTED_MOVIE}
        component={SelectedMovie}
        options={{ tabBarButton: () => null }}
      />
    </Tab.Navigator>
  );
}
