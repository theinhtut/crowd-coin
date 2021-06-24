import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Campaign from 'ethereum/campaign'
import web3 from 'ethereum/web3'

// Components
import Layout from 'components/Layout'

function NewRequest({ address }) {
  const router = useRouter()

  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [recipient, setRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleCreateRequest = async (e) => {
    e.preventDefault()

    setErrorMsg('')
    setIsLoading(true)
    const campaign = Campaign(address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
        .send({
          from: accounts[0],
        })
      router.replace(`/campaigns/${address}/requests`)
    } catch (err) {
      setErrorMsg(err.message)
    }
    setIsLoading(false)
  }
  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleCreateRequest} error={!!errorMsg}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Amount in Ether</label>
          <Input
            label='ether'
            labelPosition='right'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient Address</label>
          <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        </Form.Field>
        <Message error header='Oops!' content={errorMsg} />
        <Button primary loading={isLoading}>
          Create
        </Button>
      </Form>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  return {
    props: {
      address: params.address,
    },
  }
}

export default NewRequest
