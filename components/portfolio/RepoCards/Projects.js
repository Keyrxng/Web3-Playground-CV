import React, { useEffect, useState } from 'react'
import ListContainer from './ListContainer'
import ListItem from './ListItem'
import Axios from 'axios'
import emojiRegex from 'emoji-regex'

function Projects() {
  const [projectsPage, setProjects] = useState([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    async function FetchRepos() {
      const response = await fetch(
        'https://api.github.com/users/keyrxng/repos',
        {
          headers: {
            ...Axios(
              process.env.REACT_APP_GITHUB_API && {
                authorization: `token ${process.env.REACT_APP_GITHUB_API}`,
              },
            ),
          },
        },
      )

      if (response.status !== 200) {
        const json = await response.json()
        alert({ error: json })
        return null
      }

      const repos = await response.json()

      const projects = repos.map((repo) => {
        if (!repo.topics.includes('portfolio')) return null
        const trimmedDesc = repo.description.split(' ')
        trimmedDesc.shift()
        const desc = trimmedDesc.join(' ')
        return {
          desc,
          icon: (() => {
            if (!repo.description) return undefined
            const char = repo.description.split(' ')[0]
            return emojiRegex().test(char) ? char : undefined
          })(),
          homepage: repo.homepage ?? undefined,
          name: repo.name,
          template: false,
          url: repo.html_url.toLowerCase(),
        }
      })
      return projects
    }
    async function produceProjects() {
      const projects = await FetchRepos()
      const stringifyed = JSON.stringify(projects)
      const projectsPage = JSON.parse(stringifyed)
      Object.keys(projectsPage).forEach((key) => {
        if (projectsPage[key] === null) {
          delete projectsPage[key]
        }
      })

      return projectsPage
    }
    let proj = await produceProjects()
    setProjects(proj)
  }, [])

  return (
    <>
      <ListContainer>
        {projectsPage.map((projects, index) => (
          <ListItem
            style={{}}
            key={index}
            description={projects.desc}
            icon={<span>{projects.icon}</span>}
            title={projects.name}
            url={projects.url}
          ></ListItem>
        ))}
      </ListContainer>
    </>
  )
}

export default Projects
