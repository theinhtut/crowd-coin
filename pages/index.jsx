import { useState } from 'react'
import Link from 'next/link'
import factory from '../ethereum/factory'

// Components
import { Button } from 'semantic-ui-react'
import CampaignsList from '../components/CampaignsList'
import Layout from '../components/Layout'

function CampaignIndex({ campaigns }) {
  const [web, setWeb] = useState('')

  return (
    <Layout>
      <div onClick={() => setWeb('hahahah')}>
        <h2>Open Campaigns</h2>
        <Link href='/campaigns/new'>
          <a>
            <Button floated='right' content='Create campaign' icon='add circle' primary />
          </a>
        </Link>
        <CampaignsList campaigns={campaigns} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call()
  return {
    props: {
      campaigns,
    },
  }
}

export default CampaignIndex
