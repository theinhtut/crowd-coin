import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'

function ContributeForm({ address }) {
  const router = useRouter()

  const [ctbAmount, setCtbAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const handleContribute = async (e) => {
    e.preventDefault()

    setErrorMsg('')
    setIsLoading(true)
    const campaign = Campaign(address)
    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(ctbAmount, 'ether'),
      })
      router.replace(`/campaigns/${address}`)
    } catch (err) {
      setErrorMsg(err.message)
    }
    setIsLoading(false)
    setCtbAmount('')
  }
  return (
    <Form onSubmit={handleContribute} error={!!errorMsg}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label='ether'
          labelPosition='right'
          value={ctbAmount}
          onChange={(e) => setCtbAmount(e.target.value)}
        />
      </Form.Field>
      <Message error header='Oops!' content={errorMsg} />
      <Button primary loading={isLoading}>
        Contribute
      </Button>
    </Form>
  )
}

export default ContributeForm
