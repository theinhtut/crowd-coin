import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

import Layout from '../../components/Layout'

function NewCampaign() {
  const router = useRouter()

  const [minContribution, setMinContribution] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const handleCreateCampaign = async (e) => {
    e.preventDefault()

    setErrorMsg('')
    setIsLoading(true)
    try {
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      })
      router.push('/')
    } catch (err) {
      setErrorMsg(err.message)
    }
    setIsLoading(false)
  }
  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={handleCreateCampaign} error={!!errorMsg}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header='Oops!' content={errorMsg} />
        <Button primary loading={isLoading}>
          Submit
        </Button>
      </Form>
    </Layout>
  )
}

export default NewCampaign
