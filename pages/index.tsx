import type { NextPage } from 'next';
import styled from 'styled-components';

const Home: NextPage = () => (
  <div>
    <Container color="blue" />
  </div>
);

export default Home;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props) => (props.color ? props.color : 'black')}
`;
