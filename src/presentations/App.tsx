import { Tabs } from 'antd';
import './App.less';
import { AppContainer, Container, ExpRange, ExpTable } from './components';

function App(): JSX.Element {
  return (
    <AppContainer>
      <Container>
        <Tabs defaultActiveKey="2" type="card" size="large">
          <Tabs.TabPane tab="EXP Table" key="1">
            <ExpTable />
          </Tabs.TabPane>
          <Tabs.TabPane tab="EXP Range" key="2">
            <ExpRange />
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </AppContainer>
  );
}

export default App;
