import Github from './Github'
import RenderUserInfo from './RenderUserInfo'
import RenderReposInfo from './RenderReposInfo'

const app = new Github('oieduardorabelo')

app
  .loadUserInfo(RenderUserInfo)
  .loadReposInfo(RenderReposInfo)
