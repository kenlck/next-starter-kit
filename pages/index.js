import React from 'react';
import dynamic from 'next/dynamic';
import {
  Row,
  Col,
} from 'reactstrap';

import IntentStats from '../components/IntentStats';
// import MonthlyInbound from '../components/MonthlyInbound';
// import YearPerformanceGraph from '../components/YearPerformanceGraph';

// const RewardList = dynamic(() => import('../components/RewardList2'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

const YearPerformanceGraph = dynamic(() => import('../components/YearPerformanceGraph'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ActiveLeads = dynamic(() => import('../components/ActiveLeads'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MonthlyInbound = dynamic(() => import('../components/MonthlyInbound'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MonthlyOutbound = dynamic(() => import('../components/MonthlyOutbound'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});


const Index = () => (
  <div className="content">
    <Row>
      <Col xs="12">
        <YearPerformanceGraph />
      </Col>
    </Row>
    <Row>
      <Col lg="4">
        <ActiveLeads />
      </Col>
      <Col lg="4">
        <MonthlyInbound />
      </Col>
      <Col lg="4">
        <MonthlyOutbound />
      </Col>
    </Row>
    <Row>
      <Col xs="12">
        <IntentStats />
      </Col>
    </Row>
    {/* <Row>
      <HourlyPerformanceStat />
    </Row>
    <Row>
      <Col lg="4">
        <DailyStoreSalesPerformance />
      </Col>
      <Col lg="4">
        <DailyStoreIssuePerformance />
      </Col>
      <Col lg="4">
        <DailyStoreRedeemPerformance />
      </Col>
    </Row>
    <Row>
      <Col lg="6" md="12">
        <RewardList />
      </Col>
      <Col lg="6" md="12">
        <MonthlyStorePerformance />
      </Col>
    </Row> */}

  </div>
);

export default Index;
