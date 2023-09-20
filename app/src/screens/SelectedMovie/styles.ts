import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.medium}px;
`;
