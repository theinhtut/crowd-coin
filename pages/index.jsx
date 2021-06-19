import { useState, useEffect } from 'react'
import factory from '../ethereum/factory'

function CampaignIndex() {
  const [web, setWeb] = useState('')
  useEffect(async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    console.log(campaigns)
  }, [])

  return (
    <div onClick={() => setWeb('hahahah')}>
      <p>This is home page</p>
    </div>
  )
}

export default CampaignIndex
