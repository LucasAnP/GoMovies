import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Favorites } from '@screens/Favorites';
import { Movies } from '@screens/Movies';
import { SelectedMovie } from '@screens/SelectedMovie';

import Route from './enums';

type AppRoutes = {
  movies: undefined;
  favorites: undefined;
  selectedMovie: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Route.MOVIES} component={Movies} />
      <Tab.Screen name={Route.FAVORITES} component={Favorites} />
      <Tab.Screen name={Route.SELECTED_MOVIE} component={SelectedMovie} />
    </Tab.Navigator>
  );
}
