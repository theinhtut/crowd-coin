import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { DEPLOYED_CAMPAIGN_ADDRESS } = publicRuntimeConfig

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  DEPLOYED_CAMPAIGN_ADDRESS
)

export default instance
