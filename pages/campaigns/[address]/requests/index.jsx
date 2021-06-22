import Link from 'next/link'
import { Button, Table } from 'semantic-ui-react'
import Campaign from 'ethereum/campaign'
import Layout from 'components/Layout'
import RequestRow from 'components/RequestRow'

function ViewRequest({ address, requestsCount, requests, approversCount }) {
  const { Header, Row, HeaderCell, Body } = Table
  return (
    <Layout>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated='right' style={{ marginBottom: `1em` }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Counts</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((req, i) => (
            <RequestRow
              id={i}
              key={i}
              request={req}
              address={address}
              approversCount={approversCount}
            />
          ))}
        </Body>
      </Table>
      <div>Found {requestsCount} requests</div>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  const campaign = Campaign(params.address)
  const requestsCount = await campaign.methods.getRequestsCount().call()
  const approversCount = await campaign.methods.approversCount().call()
  let requests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call()
      })
  )
  requests = JSON.parse(JSON.stringify(requests))
  return {
    props: {
      address: params.address,
      requestsCount,
      requests,
      approversCount,
    },
  }
}

export default ViewRequest
