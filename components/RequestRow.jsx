import { Table, Button } from 'semantic-ui-react'
import web3 from 'ethereum/web3'
import Campaign from 'ethereum/campaign'

function RequestRow({ id, request, address, approversCount }) {
  const { description, value, recipient, approvalsCount, complete } = request
  const { Row, Cell } = Table
  const readyToFinalize = approvalsCount > approvalsCount / 2

  const handleApprove = async () => {
    const campaign = Campaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.approveRequest(id).send({ from: accounts[0] })
  }
  const handleFinalize = async () => {
    const campaign = Campaign(address)
    const accounts = await web3.eth.getAccounts()
    await campaign.methods.finalizeRequest(id).send({ from: accounts[0] })
  }

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalsCount}/{approversCount}
      </Cell>
      <Cell>
        {!complete && (
          <Button color='green' basic onClick={handleApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!complete && (
          <Button color='teal' basic onClick={handleFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  )
}

export default RequestRow
