import Link from 'next/link'
import { Card } from 'semantic-ui-react'

function CampaignsList({ campaigns = [] }) {
  if (!campaigns.length) {
    return null
  }
  const items = campaigns.map((address) => ({
    header: address,
    description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
    fluid: true,
  }))

  return <Card.Group items={items} />
}

export default CampaignsList
